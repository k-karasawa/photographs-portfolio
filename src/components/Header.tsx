import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { GiArrowhead } from 'react-icons/gi'
import { FiShoppingCart, FiMail, FiInstagram, FiMenu, FiX } from 'react-icons/fi'
import { RiTwitterXLine } from 'react-icons/ri'

interface MenuItem {
  label: string
  sectionId: string
}

const menuItems: MenuItem[] = [
  { label: "オーダーメイドの楽しさ", sectionId: "custom" },
  { label: "ギャラリー", sectionId: "gallery" },
  { label: "その他のカスタマイズ", sectionId: "other" },
  { label: "ランキング", sectionId: "ranking" },
]

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // 前回のスクロール位置を useRef で保持（値が変わっても再レンダーは発生しない）
  const lastScrollY = useRef(0)
  // タイムアウトのIDを管理するためのRef
  const scrollTimeout = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // 下方向へのスクロールの場合はヘッダーを隠す
      if (currentScrollY > lastScrollY.current) {
        setIsVisible(false)
      } else {
        // 上方向の場合はすぐにヘッダーを表示
        setIsVisible(true)
      }

      setIsScrolled(currentScrollY > 50)
      lastScrollY.current = currentScrollY

      // 既存のタイムアウトがあればキャンセル
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      // スクロールが停止したら1秒後にヘッダーを表示する
      scrollTimeout.current = window.setTimeout(() => {
        setIsVisible(true)
      }, 1000)

      // 現在表示されているセクションを検出
      detectActiveSection()
    }

    // 現在表示されているセクションを検出する関数
    const detectActiveSection = () => {
      const sections = menuItems.map(item => document.getElementById(item.sectionId))
      const viewportHeight = window.innerHeight
      const triggerPoint = viewportHeight * 0.3 // 画面の上から30%の位置をトリガーポイントとする

      // 各セクションの位置を確認
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        if (section) {
          const rect = section.getBoundingClientRect()
          // セクションの上端がトリガーポイントより上にあり、下端がトリガーポイントより下にある場合
          if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
            setActiveSection(menuItems[i].sectionId)
            return
          }
        }
      }
      
      // どのセクションも表示されていない場合
      setActiveSection("")
    }

    window.addEventListener('scroll', handleScroll)
    // 初期ロード時にもアクティブセクションを検出
    detectActiveSection()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsMenuOpen(false) // メニュー項目クリック時にメニューを閉じる
    }
  }

  // メニューの開閉を切り替える関数
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ 
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1],
          type: "tween"
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="w-full px-3 sm:px-4 lg:px-6">
          <div className="flex items-center h-20 max-w-[1920px] mx-auto">
            <div className="flex-none w-auto mr-4">
              <Link 
                href="/" 
                className="group flex items-center"
              >
                <span className="text-xl font-bold text-[#333333] group-hover:text-[#C84C38] transition-colors duration-300 whitespace-nowrap">
                  咲矢弓道具
                </span>
              </Link>
            </div>

            {/* 中央寄せのリンクを削除 */}
            <div className="flex-1"></div>

            <div className="flex-none flex justify-end items-center">
              {/* SNSアイコン */}
              <div className="hidden md:flex items-center mr-8 space-x-6">
                <a
                  href="https://www.instagram.com/sakuyakyudogu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-1.5 rounded-full transition-colors duration-200
                    ${isScrolled 
                      ? 'text-[#333333] hover:text-[#C84C38]' 
                      : 'text-[#333333]/90 hover:text-[#333333]'
                    }
                  `}
                  aria-label="Instagram"
                >
                  <FiInstagram className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/Sakuya_Kyudogu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-1.5 rounded-full transition-colors duration-200
                    ${isScrolled 
                      ? 'text-[#333333] hover:text-[#C84C38]' 
                      : 'text-[#333333]/90 hover:text-[#333333]'
                    }
                  `}
                  aria-label="X (Twitter)"
                >
                  <RiTwitterXLine className="w-5 h-5" />
                </a>
              </div>

              <a
                href="https://sakuya-kyudogu.jp/guide"
                target="_blank"
                rel="noopener noreferrer"
                className={`relative py-2 mr-8 text-xs lg:text-sm font-medium transition-colors duration-200 hidden md:flex items-center whitespace-nowrap
                  ${isScrolled 
                    ? 'text-[#333333] hover:text-[#C84C38]' 
                    : 'text-[#333333]/90 hover:text-[#333333]'
                  }
                `}
              >
                <GiArrowhead className="w-4 h-4 mr-1" />
                矢の選び方
              </a>

              <a
                href="https://sakuya-kyudogu.jp/order_made"
                target="_blank"
                rel="noopener noreferrer"
                className={`relative py-2 mr-8 text-xs lg:text-sm font-medium transition-colors duration-200 hidden md:flex items-center whitespace-nowrap
                  ${isScrolled 
                    ? 'text-[#333333] hover:text-[#C84C38]' 
                    : 'text-[#333333]/90 hover:text-[#333333]'
                  }
                `}
              >
                <FiShoppingCart className="w-4 h-4 mr-1" />
                オーダーする
              </a>

              <a
                href="https://sakuya-kyudogu.jp/contact"
                target="_blank"
                rel="noopener noreferrer"
                className={`relative py-2 mr-6 text-xs lg:text-sm font-medium transition-colors duration-200 hidden md:flex items-center whitespace-nowrap
                  ${isScrolled 
                    ? 'text-[#333333] hover:text-[#C84C38]' 
                    : 'text-[#333333]/90 hover:text-[#333333]'
                  }
                `}
              >
                <FiMail className="w-4 h-4 mr-1" />
                お問い合わせ
              </a>

              {/* ハンバーガーメニューボタン */}
              <button 
                onClick={toggleMenu}
                className="text-[#333333] p-2 rounded-full hover:bg-gray-100/50 transition-colors duration-200"
                aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
              >
                {isMenuOpen ? (
                  <FiX className="h-6 w-6" />
                ) : (
                  <FiMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* モバイルメニュー - 右側からスライドイン */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* オーバーレイ背景 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setIsMenuOpen(false)}
              />
              
              {/* メニューパネル */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed top-0 right-0 bottom-0 w-64 bg-white/95 backdrop-blur-md shadow-xl z-50"
              >
                <div className="flex justify-end p-4">
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[#333333] p-2 rounded-full hover:bg-gray-100/50 transition-colors duration-200"
                    aria-label="メニューを閉じる"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>
                
                <nav className="flex flex-col px-4">
                  {menuItems.map((item) => (
                    <button
                      key={item.sectionId}
                      onClick={() => scrollToSection(item.sectionId)}
                      className={`relative px-3 py-4 text-base font-medium transition-colors duration-200 text-left border-b border-gray-100
                        ${activeSection === item.sectionId 
                          ? 'text-[#C84C38]' 
                          : 'text-[#333333] hover:text-[#C84C38]'
                        }
                      `}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </AnimatePresence>
  )
}
