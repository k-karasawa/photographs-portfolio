import { useState, useEffect } from 'react'
import Image from 'next/image'
import { GiArrowhead } from 'react-icons/gi'
import { FiShoppingCart, FiMail, FiInstagram } from 'react-icons/fi'
import { RiTwitterXLine } from 'react-icons/ri'

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

export const Footer = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    if (!isMounted) return
    
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      })
    }
  }

  return (
    <footer className="bg-gray-200 pt-12 pb-6 relative z-20">
      <div className="container mx-auto px-4">
        {/* ロゴを最上部に中央揃えで配置 */}
        <div className="flex justify-center mb-10">
          <div className="relative h-14 w-14">
            <Image
              src="/sakuya-logo.svg"
              alt="咲矢弓道具"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex justify-center md:justify-start w-full mb-6">
              <p className="text-sm text-gray-600 text-center md:text-left">
                咲矢弓道具では、あなただけのオーダーメイド矢を<br className="hidden md:block" />
                心を込めて丁寧に製作します。<br className="hidden md:block" />
                世界に一つだけの矢で弓道をお楽しみください。
              </p>
            </div>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://www.instagram.com/sakuyakyudogu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#C84C38] transition-colors duration-200"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/sakuyakyudogu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#C84C38] transition-colors duration-200"
              >
                <RiTwitterXLine className="w-5 h-5" />
              </a>
            </div>
            <div className="flex justify-center md:justify-start w-full mb-6">
              <a
                href="https://sakuya-kyudogu.jp/order_made"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#C84C38] text-white rounded-lg text-sm font-medium hover:bg-[#C84C38]/90 transition-colors duration-200 flex items-center justify-center"
              >
                <FiShoppingCart className="w-4 h-4 mr-2" />
                オーダーする
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-base font-bold text-gray-800 mb-4">サイトマップ</h3>
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="text-sm text-gray-600 hover:text-[#C84C38] transition-colors duration-200 text-center md:text-left"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* 外部リンク */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-base font-bold text-gray-800 mb-4">外部リンク</h3>
            <nav className="flex flex-col space-y-3">
              <a
                href="https://sakuya-kyudogu.jp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-[#C84C38] transition-colors duration-200 flex items-center justify-center md:justify-start"
              >
                咲矢弓道具 公式サイト
              </a>
              <a
                href="https://sakuya-kyudogu.jp/order_made"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-[#C84C38] transition-colors duration-200 flex items-center justify-center md:justify-start "
              >
                矢のオーダーメイドシステム
              </a>
              <a
                href="https://sakuya-kyudogu.jp/select_guide"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-[#C84C38] transition-colors duration-200 flex items-center justify-center md:justify-start"
              >
                <GiArrowhead className="w-4 h-4 mr-2" />
                矢の選び方
              </a>
              <a
                href="https://sakuya-kyudogu.jp/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-[#C84C38] transition-colors duration-200 flex items-center justify-center md:justify-start"
              >
                <FiMail className="w-4 h-4 mr-2" />
                お問い合わせ
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            &copy; {new Date().getFullYear()} 咲矢弓道具 All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
