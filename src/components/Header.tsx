import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
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
  const lastScrollY = useRef(0)
  const scrollTimeout = useRef<number | null>(null)

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
      lastScrollY.current = currentScrollY

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      scrollTimeout.current = window.setTimeout(() => {
        setIsVisible(true)
      }, 1000)

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
      setIsMenuOpen(false)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // メニューを開いたときに背景スクロールを防止
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }

  // メニューが閉じられたときに背景スクロールを再開
  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.style.overflow = ''
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
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${
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
                  咲矢弓道具　オーダー矢のすゝめ
                </span>
              </Link>
            </div>

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
                className={`p-2 -mt-1 transition-colors duration-200
                  ${isScrolled 
                    ? 'text-[#333333] hover:text-[#C84C38]' 
                    : 'text-[#333333]/90 hover:text-[#333333]'
                  }
                `}
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

        {/* モバイルメニュー - ポータルを使用してbody直下に配置 */}
        {isMounted && isMenuOpen && createPortal(
          <div className="menu-portal" style={{ position: 'relative', zIndex: 9999 }}>
            {/* オーバーレイ背景 */}
            <div 
              className="fixed inset-0 bg-black opacity-70" 
              style={{ zIndex: 9998 }}
              onClick={closeMenu}
            />
            
            {/* メニューパネル */}
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
      </motion.header>
    </AnimatePresence>
  )
}
