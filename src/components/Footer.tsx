import { useState, useEffect, useRef, useCallback } from 'react'
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
  // タッチデバイスかどうかのフラグ
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  // 重複実行を防ぐためのフラグ
  const isProcessingRef = useRef(false)

  useEffect(() => {
    setIsMounted(true)
    // クライアントサイドでのみタッチデバイス検出を行う
    setIsTouchDevice(
      typeof window !== 'undefined' && 
      ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    )
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    if (!isMounted) return
    
    // 既に処理中なら何もしない
    if (isProcessingRef.current) return
    
    // 処理中フラグを立てる
    isProcessingRef.current = true
    
    if (sectionId === "top") {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      
      // 少し遅延してフラグをリセット（次のタップのため）
      setTimeout(() => {
        isProcessingRef.current = false
      }, 300)
      
      return
    }
    
    const section = document.getElementById(sectionId)
    if (section) {
      // ギャラリーセクションの特別処理
      if (sectionId === 'gallery') {
        // モバイル端末かどうかを確認
        const isMobile = window.innerWidth < 768
        
        if (isMobile) {
          // モバイル端末の場合の特別処理
          const customSection = document.getElementById('custom')
          if (customSection) {
            const customRect = customSection.getBoundingClientRect()
            const customHeight = customRect.height
            const customTop = window.pageYOffset + customRect.top
            
            // カスタムセクションの下にスクロール
            window.scrollTo({
              top: customTop + customHeight,
              behavior: 'smooth'
            })
          }
        } else {
          // 通常のスクロール処理
          section.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // 他のセクションは通常通りスクロール
        section.scrollIntoView({ behavior: 'smooth' })
      }
      
      // 少し遅延してフラグをリセット（次のタップのため）
      setTimeout(() => {
        isProcessingRef.current = false
      }, 300)
    }
  }, [isMounted])

  // リンクに対するイベントハンドラー
  const handleLinkClick = useCallback((e: React.MouseEvent | React.TouchEvent, url?: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    // 既に処理中なら何もしない
    if (isProcessingRef.current) return
    
    // 処理中フラグを立てる
    isProcessingRef.current = true
    
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
      
      // 少し遅延してフラグをリセット（次のタップのため）
      setTimeout(() => {
        isProcessingRef.current = false
      }, 300)
    }
  }, [])

  // タッチデバイスの場合はonClickを無効化し、onTouchEndのみを使用
  const getSectionClickHandler = useCallback((sectionId: string) => {
    return isTouchDevice 
      ? undefined 
      : (e: React.MouseEvent) => {
          e.preventDefault()
          e.stopPropagation()
          scrollToSection(sectionId)
        }
  }, [isTouchDevice, scrollToSection])
  
  const getSectionTouchHandler = useCallback((sectionId: string) => {
    return isTouchDevice 
      ? (e: React.TouchEvent) => {
          e.preventDefault()
          e.stopPropagation()
          scrollToSection(sectionId)
        } 
      : undefined
  }, [isTouchDevice, scrollToSection])
  
  const getLinkClickHandler = useCallback((url?: string) => {
    return isTouchDevice 
      ? undefined 
      : (e: React.MouseEvent) => handleLinkClick(e, url)
  }, [isTouchDevice, handleLinkClick])
  
  const getLinkTouchHandler = useCallback((url?: string) => {
    return isTouchDevice 
      ? (e: React.TouchEvent) => handleLinkClick(e, url) 
      : undefined
  }, [isTouchDevice, handleLinkClick])

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
                onClick={getLinkClickHandler("https://www.instagram.com/sakuyakyudogu/")}
                onTouchEnd={getLinkTouchHandler("https://www.instagram.com/sakuyakyudogu/")}
                className="text-gray-600 hover:text-[#C84C38] transition-colors duration-200"
                style={{ touchAction: 'manipulation' }}
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/sakuyakyudogu"
                target="_blank"
                rel="noopener noreferrer"
                onClick={getLinkClickHandler("https://twitter.com/sakuyakyudogu")}
                onTouchEnd={getLinkTouchHandler("https://twitter.com/sakuyakyudogu")}
                className="text-gray-600 hover:text-[#C84C38] transition-colors duration-200"
                style={{ touchAction: 'manipulation' }}
              >
                <RiTwitterXLine className="w-5 h-5" />
              </a>
            </div>
            <div className="flex justify-center md:justify-start w-full mb-6">
              <a
                href="https://sakuya-kyudogu.jp/order_made"
                target="_blank"
                rel="noopener noreferrer"
                onClick={getLinkClickHandler("https://sakuya-kyudogu.jp/order_made")}
                onTouchEnd={getLinkTouchHandler("https://sakuya-kyudogu.jp/order_made")}
                className="px-6 py-3 bg-[#C84C38] text-white rounded-lg text-sm font-medium hover:bg-[#C84C38]/90 transition-colors duration-200 flex items-center justify-center"
                style={{ touchAction: 'manipulation' }}
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
                  onClick={getSectionClickHandler(item.sectionId)}
                  onTouchEnd={getSectionTouchHandler(item.sectionId)}
                  className="text-sm text-gray-600 hover:text-[#C84C38] transition-colors duration-200 text-center md:text-left"
                  style={{ touchAction: 'manipulation' }}
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
                onClick={getLinkClickHandler("https://sakuya-kyudogu.jp")}
                onTouchEnd={getLinkTouchHandler("https://sakuya-kyudogu.jp")}
                className="text-sm text-gray-600 hover:text-[#C84C38] transition-colors duration-200 flex items-center justify-center md:justify-start"
                style={{ touchAction: 'manipulation' }}
              >
                咲矢弓道具 公式サイト
              </a>
              <a
                href="https://sakuya-kyudogu.jp/order_made"
                target="_blank"
                rel="noopener noreferrer"
                onClick={getLinkClickHandler("https://sakuya-kyudogu.jp/order_made")}
                onTouchEnd={getLinkTouchHandler("https://sakuya-kyudogu.jp/order_made")}
                className="text-sm text-gray-600 hover:text-[#C84C38] transition-colors duration-200 flex items-center justify-center md:justify-start "
                style={{ touchAction: 'manipulation' }}
              >
                矢のオーダーメイドシステム
              </a>
              <a
                href="https://sakuya-kyudogu.jp/select_guide"
                target="_blank"
                rel="noopener noreferrer"
                onClick={getLinkClickHandler("https://sakuya-kyudogu.jp/select_guide")}
                onTouchEnd={getLinkTouchHandler("https://sakuya-kyudogu.jp/select_guide")}
                className="text-sm text-gray-600 hover:text-[#C84C38] transition-colors duration-200 flex items-center justify-center md:justify-start"
                style={{ touchAction: 'manipulation' }}
              >
                <GiArrowhead className="w-4 h-4 mr-2" />
                矢の選び方
              </a>
              <a
                href="https://sakuya-kyudogu.jp/contact"
                target="_blank"
                rel="noopener noreferrer"
                onClick={getLinkClickHandler("https://sakuya-kyudogu.jp/contact")}
                onTouchEnd={getLinkTouchHandler("https://sakuya-kyudogu.jp/contact")}
                className="text-sm text-gray-600 hover:text-[#C84C38] transition-colors duration-200 flex items-center justify-center md:justify-start"
                style={{ touchAction: 'manipulation' }}
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
