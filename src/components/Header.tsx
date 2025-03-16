import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { GiArrowhead } from 'react-icons/gi'
import { FiShoppingCart, FiMail, FiInstagram, FiMenu, FiX } from 'react-icons/fi'
import { RiTwitterXLine } from 'react-icons/ri'
import { createPortal } from 'react-dom'

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
  const [isMounted, setIsMounted] = useState(false)
  const [titleOpacity, setTitleOpacity] = useState(1)
  const [logoOpacity, setLogoOpacity] = useState(0)
  const lastScrollY = useRef(0)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY.current) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setIsScrolled(currentScrollY > 50)
      
      const newTitleOpacity = Math.max(0, 1 - currentScrollY / 100)
      setTitleOpacity(newTitleOpacity)
      
      const newLogoOpacity = Math.max(0, Math.min(1, (currentScrollY - 100) / 50))
      setLogoOpacity(newLogoOpacity)
      
      lastScrollY.current = currentScrollY

      detectActiveSection()
    }

    const detectActiveSection = () => {
      const sections = menuItems.map(item => document.getElementById(item.sectionId))
      const viewportHeight = window.innerHeight
      const triggerPoint = viewportHeight * 0.3
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
            setActiveSection(menuItems[i].sectionId)
            return
          }
        }
      }
      
      setActiveSection("")
    }

    window.addEventListener('scroll', handleScroll)
    detectActiveSection()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsMenuOpen(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      {/* 統合されたヘッダー */}
      <header className="fixed top-0 left-0 right-0 z-[999] bg-transparent">
        <div className="w-full px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-20 max-w-[1920px] mx-auto">
            {/* サイトタイトルとロゴ */}
            <div className="flex-none relative">
              <Link href="/" className="group flex items-center">
                {/* サイトタイトル - スクロールに応じてフェードアウト */}
                <motion.span
                  initial={false}
                  animate={{ 
                    opacity: titleOpacity,
                  }}
                  transition={{ 
                    opacity: { duration: 0.3, ease: "easeInOut" },
                  }}
                  className="text-xl font-bold text-[#333333] transition-colors duration-300 whitespace-nowrap"
                >
                  咲矢弓道具　オーダー矢のすゝめ
                </motion.span>
                
                {/* ロゴ画像 - スクロールに応じてフェードイン */}
                <motion.div
                  initial={false}
                  animate={{ 
                    opacity: logoOpacity,
                  }}
                  transition={{ 
                    opacity: { duration: 0.3, ease: "easeInOut" },
                  }}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 md:translate-y-0 lg:top-[calc(50%-14px)]"
                  style={{ 
                    pointerEvents: logoOpacity > 0.5 ? 'auto' : 'none' 
                  }}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      clipPath: logoOpacity > 0.1 
                        ? 'inset(0% 0% 0% 0%)' 
                        : 'inset(0% 0% 100% 0%)'
                    }}
                    transition={{
                      clipPath: { duration: 0.5, ease: "easeOut" }
                    }}
                  >
                    <Image 
                      src="/sakuya-logo.svg" 
                      alt="咲矢弓道具" 
                      width={40} 
                      height={40}
                      onClick={scrollToTop}
                      className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 transition-transform duration-300 cursor-pointer"
                    />
                  </motion.div>
                </motion.div>
              </Link>
            </div>

            {/* 右側のメニュー */}
            <div className="flex items-center">
              {/* メインメニュー - 上方向スクロール時のみ表示 */}
              <motion.div
                initial={false}
                animate={{ 
                  opacity: isVisible ? 1 : 0,
                  x: isVisible ? 0 : 20,
                  pointerEvents: isVisible ? 'auto' : 'none'
                }}
                transition={{ 
                  opacity: { duration: 0.6, ease: "easeInOut" },
                  x: { duration: 0.6, ease: "easeInOut" }
                }}
                className="flex items-center"
              >
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
              </motion.div>

              {/* ハンバーガーメニューボタン - 常に表示 */}
              <button 
                onClick={toggleMenu}
                className={`p-2 -mt-1 transition-colors duration-200
                  ${isScrolled 
                    ? 'text-[#333333] hover:text-[#C84C38]' 
                    : 'text-[#333333]/90 hover:text-[#333333]'
                  }
                `}
                aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
              >
                {isMenuOpen ? (
                  <FiX className="h-7 w-7" />
                ) : (
                  <FiMenu className="h-7 w-7" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* モバイルメニュー */}
      {isMounted && isMenuOpen && createPortal(
        <div className="menu-portal" style={{ position: 'relative', zIndex: 9999 }}>
          <div 
            className="fixed inset-0 bg-black opacity-70" 
            style={{ zIndex: 9998 }}
            onClick={closeMenu}
          />
          
          <div 
            className="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-xl"
            style={{ 
              zIndex: 9999,
              animation: 'slideIn 0.3s ease-in-out forwards'
            }}
          >
            <div className="flex justify-end p-4 border-b border-gray-100">
              <button 
                onClick={closeMenu}
                className="text-[#333333] p-2 rounded-full hover:bg-gray-100/50 transition-colors duration-200"
                aria-label="メニューを閉じる"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="flex flex-col px-4 py-2">
              {menuItems.map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className={`relative px-3 py-4 text-base font-medium transition-colors duration-200 text-left border-b border-gray-100
                    ${activeSection === item.sectionId 
                      ? 'text-[#C84C38] font-bold' 
                      : 'text-[#333333] hover:text-[#C84C38]'
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <style jsx global>{`
            @keyframes slideIn {
              from {
                transform: translateX(100%);
              }
              to {
                transform: translateX(0);
              }
            }
            
            body.menu-open {
              overflow: hidden;
            }
          `}</style>
        </div>,
        document.body
      )}
    </>
  )
}
