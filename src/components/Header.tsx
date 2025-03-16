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
  { label: "TOP", sectionId: "top" },
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
  const [menuSpacing, setMenuSpacing] = useState('space-y-2')
  const lastScrollY = useRef(0)

  useEffect(() => {
    setIsMounted(true)
    
    // 画面の高さに応じてメニュー間隔を調整する関数
    const adjustMenuSpacing = () => {
      const viewportHeight = window.innerHeight
      // 小さい画面では間隔を狭く、大きい画面では間隔を広くする
      if (viewportHeight < 600) {
        setMenuSpacing('space-y-1')
      } else if (viewportHeight < 700) {
        setMenuSpacing('space-y-1.5')
      } else if (viewportHeight < 800) {
        setMenuSpacing('space-y-2')
      } else {
        setMenuSpacing('space-y-3')
      }
    }
    
    // 初期調整
    adjustMenuSpacing()
    
    // リサイズイベントでも調整
    window.addEventListener('resize', adjustMenuSpacing)
    
    return () => {
      setIsMounted(false)
      document.body.style.overflow = ''
      window.removeEventListener('resize', adjustMenuSpacing)
    }
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

      // メニューが開いている時はアクティブセクションを更新しない
      if (!isMenuOpen) {
        detectActiveSection()
      }
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
  }, [isMenuOpen])

  const scrollToSection = (sectionId: string) => {
    // メニューを先に閉じる
    setIsMenuOpen(false)
    document.body.style.overflow = ''
    document.body.classList.remove('menu-open')
    
    // 少し遅延させてからスクロール
    setTimeout(() => {
      if (sectionId === 'top') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        setActiveSection('top') // TOPセクションをアクティブに設定
      } else {
        const section = document.getElementById(sectionId)
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' })
          setActiveSection(sectionId)
        }
      }
    }, 50)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const toggleMenu = () => {
    const newMenuState = !isMenuOpen
    setIsMenuOpen(newMenuState)
    
    if (newMenuState) {
      // メニューを開く
      document.body.style.overflow = 'hidden'
      document.body.classList.add('menu-open')
    } else {
      // メニューを閉じる
      document.body.style.overflow = ''
      document.body.classList.remove('menu-open')
    }
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.style.overflow = ''
    document.body.classList.remove('menu-open')
  }

  return (
    <>
      {/* 統合されたヘッダー */}
      <header className="fixed top-0 left-0 right-0 z-[999] bg-transparent">
        <div className="w-full px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-20 max-w-[1920px] mx-auto">
            {/* サイトタイトルとロゴ */}
            <div className="flex-none relative">
              <Link 
                href="/" 
                className="group flex items-center"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
              >
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
                  href="https://sakuya-kyudogu.jp/select_guide"
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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleMenu();
                }}
                onTouchStart={(e) => {
                  // タッチ開始時にアクティブ状態を視覚的に示す
                  e.currentTarget.classList.add('active-touch');
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // アクティブ状態を解除
                  e.currentTarget.classList.remove('active-touch');
                  toggleMenu();
                }}
                className={`p-2 -mt-1 transition-colors duration-200 cursor-pointer touch-manipulation tap-highlight-none
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
        <div className="menu-portal" style={{ position: 'fixed', zIndex: 9999, inset: 0 }}>
          <div 
            className="fixed inset-0 bg-black opacity-50 tap-highlight-none backdrop-blur-sm" 
            style={{ zIndex: 9998 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              closeMenu();
            }}
            onTouchStart={(e) => {
              // タッチ開始時の処理
              e.preventDefault();
              e.stopPropagation();
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              closeMenu();
            }}
          />
          
          <div 
            className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-xl rounded-l-2xl flex flex-col"
            style={{ 
              zIndex: 9999,
              animation: 'slideIn 0.3s ease-in-out forwards',
              WebkitOverflowScrolling: 'touch',
              height: '100%',
              maxHeight: '100vh'
            }}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-center">
                  <Image 
                    src="/sakuya-logo.svg" 
                    alt="咲矢弓道具" 
                    width={32} 
                    height={32}
                    className="w-7 h-7 mr-2"
                  />
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    closeMenu();
                  }}
                  onTouchStart={(e) => {
                    // タッチ開始時にアクティブ状態を視覚的に示す
                    e.currentTarget.classList.add('active-touch');
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // アクティブ状態を解除
                    e.currentTarget.classList.remove('active-touch');
                    closeMenu();
                  }}
                  className="text-[#333333] p-2 rounded-full hover:bg-gray-100/50 transition-colors duration-200 cursor-pointer touch-manipulation tap-highlight-none"
                  aria-label="メニューを閉じる"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>
              
              <div className="px-4 py-3 flex-grow overflow-hidden">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">セクション移動</h3>
                    <nav className={`flex flex-col ${menuSpacing} mb-5`}>
                      {menuItems.map((item) => (
                        <button
                          key={item.sectionId}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            scrollToSection(item.sectionId);
                          }}
                          onTouchStart={(e) => {
                            // タッチ開始時にアクティブ状態を視覚的に示す
                            e.currentTarget.classList.add('active-touch');
                          }}
                          onTouchEnd={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // アクティブ状態を解除
                            e.currentTarget.classList.remove('active-touch');
                            scrollToSection(item.sectionId);
                          }}
                          className={`relative px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left cursor-pointer touch-manipulation tap-highlight-none flex items-center
                            ${activeSection === item.sectionId 
                              ? 'bg-[#C84C38]/10 text-[#C84C38] font-bold' 
                              : 'text-[#333333] hover:bg-gray-100'
                            }
                          `}
                        >
                          <span className={`w-2 h-2 rounded-full mr-3 transition-all duration-200
                            ${activeSection === item.sectionId 
                              ? 'bg-[#C84C38] scale-110' 
                              : 'bg-gray-300'
                            }
                          `}></span>
                          {item.label}
                        </button>
                      ))}
                    </nav>

                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">外部サイトへ</h3>
                    <nav className={`flex flex-col ${menuSpacing}`}>
                      <a
                        href="https://sakuya-kyudogu.jp/select_guide"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left cursor-pointer touch-manipulation tap-highlight-none flex items-center text-[#333333] hover:bg-gray-100"
                        onClick={() => {
                          // リンクをクリックした時の処理
                          closeMenu();
                        }}
                        onTouchStart={(e) => {
                          // タッチ開始時にアクティブ状態を視覚的に示す
                          e.currentTarget.classList.add('active-touch');
                        }}
                        onTouchEnd={(e) => {
                          // タッチ終了時にアクティブ状態を解除
                          e.currentTarget.classList.remove('active-touch');
                          // メニューを閉じる
                          closeMenu();
                        }}
                      >
                        <GiArrowhead className="w-4 h-4 mr-3 text-gray-500" />
                        矢の選び方
                      </a>
                      <a
                        href="https://sakuya-kyudogu.jp/order_made"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left cursor-pointer touch-manipulation tap-highlight-none flex items-center text-[#333333] hover:bg-gray-100"
                        onClick={() => {
                          // リンクをクリックした時の処理
                          closeMenu();
                        }}
                        onTouchStart={(e) => {
                          // タッチ開始時にアクティブ状態を視覚的に示す
                          e.currentTarget.classList.add('active-touch');
                        }}
                        onTouchEnd={(e) => {
                          // タッチ終了時にアクティブ状態を解除
                          e.currentTarget.classList.remove('active-touch');
                          // メニューを閉じる
                          closeMenu();
                        }}
                      >
                        <FiShoppingCart className="w-4 h-4 mr-3 text-gray-500" />
                        オーダーする
                      </a>
                      <a
                        href="https://sakuya-kyudogu.jp/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left cursor-pointer touch-manipulation tap-highlight-none flex items-center text-[#333333] hover:bg-gray-100"
                        onClick={() => {
                          // リンクをクリックした時の処理
                          closeMenu();
                        }}
                        onTouchStart={(e) => {
                          // タッチ開始時にアクティブ状態を視覚的に示す
                          e.currentTarget.classList.add('active-touch');
                        }}
                        onTouchEnd={(e) => {
                          // タッチ終了時にアクティブ状態を解除
                          e.currentTarget.classList.remove('active-touch');
                          // メニューを閉じる
                          closeMenu();
                        }}
                      >
                        <FiMail className="w-4 h-4 mr-3 text-gray-500" />
                        お問い合わせ
                      </a>
                    </nav>
                  </div>
                  
                  <div className="mt-auto pt-3 border-t border-gray-100">
                    <div className="flex space-x-4 justify-center">
                      <a
                        href="https://www.instagram.com/sakuyakyudogu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-100 text-[#333333] hover:bg-[#C84C38]/10 hover:text-[#C84C38] transition-colors duration-200"
                        aria-label="Instagram"
                      >
                        <FiInstagram className="w-4 h-4" />
                      </a>
                      <a
                        href="https://x.com/Sakuya_Kyudogu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-100 text-[#333333] hover:bg-[#C84C38]/10 hover:text-[#C84C38] transition-colors duration-200"
                        aria-label="X (Twitter)"
                      >
                        <RiTwitterXLine className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
            
            /* タップハイライトを無効化 */
            .tap-highlight-none {
              -webkit-tap-highlight-color: transparent;
              -webkit-touch-callout: none;
              -webkit-user-select: none;
              user-select: none;
            }
            
            /* タッチ時のアクティブ状態 */
            .active-touch {
              opacity: 0.7;
            }
          `}</style>
        </div>,
        document.body
      )}
    </>
  )
}
