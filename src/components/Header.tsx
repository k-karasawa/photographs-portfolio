import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface MenuItem {
  label: string
  sectionId: string
}

const menuItems: MenuItem[] = [
  { label: "オーダーメイドの楽しさ", sectionId: "custom" },
  { label: "ギャラリー", sectionId: "gallery" },
  { label: "カスタマイズ", sectionId: "other" },
  { label: "ランキング", sectionId: "ranking" },
]

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

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
    }

    window.addEventListener('scroll', handleScroll)
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
    }
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
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-[#333333]">
              咲矢弓道具
            </Link>

            <nav className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className={`text-sm font-medium transition-colors duration-200
                    ${isScrolled 
                      ? 'text-[#333333] hover:text-[#C84C38]' 
                      : 'text-[#333333]/80 hover:text-[#333333]'
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <button className="md:hidden text-[#333333]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  )
}
