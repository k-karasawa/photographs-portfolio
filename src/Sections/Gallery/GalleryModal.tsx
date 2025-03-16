import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { GalleryImage } from './galleryData'
import { AnimatedTargetButton } from '@/components/AnimatedTargetButton'
import { useEffect, useState, useRef } from 'react'

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
  image: GalleryImage | null
}

export const GalleryModal = ({ isOpen, onClose, image }: GalleryModalProps) => {
  const [isSafari, setIsSafari] = useState(false)
  const [modalTop, setModalTop] = useState('10%')
  const [modalMaxHeight, setModalMaxHeight] = useState('90vh')
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // iOS と Safari の検出
    const ua = window.navigator.userAgent
    const iOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    const safari = /^((?!chrome|android).)*safari/i.test(ua)
    
    setIsSafari(safari && iOS)

    // 画面サイズに応じた調整
    const adjustModalPosition = () => {
      if (safari && iOS) {
        // iOSのSafariの場合、ヘッダーの高さを考慮して調整
        const headerHeight = 80 // ヘッダーの高さ（ピクセル）
        const viewportHeight = window.innerHeight
        const topPercentage = Math.min(20, (headerHeight / viewportHeight) * 100 + 5)
        
        setModalTop(`${topPercentage}%`)
        setModalMaxHeight(`${100 - topPercentage - 5}vh`) // 下部にも少し余白を残す
      } else {
        // その他のブラウザの場合
        setModalTop('2%')
        setModalMaxHeight('98vh')
      }
    }

    adjustModalPosition()
    window.addEventListener('resize', adjustModalPosition)
    window.addEventListener('orientationchange', adjustModalPosition)

    return () => {
      window.removeEventListener('resize', adjustModalPosition)
      window.removeEventListener('orientationchange', adjustModalPosition)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      // モーダルが開いたときに位置を再調整
      if (isSafari) {
        const adjustAfterOpen = () => {
          const viewportHeight = window.innerHeight
          const headerHeight = 80
          const topPercentage = Math.min(20, (headerHeight / viewportHeight) * 100 + 5)
          
          setModalTop(`${topPercentage}%`)
          setModalMaxHeight(`${100 - topPercentage - 5}vh`)
        }
        
        // 少し遅延させて実行（アドレスバーの状態が安定した後）
        setTimeout(adjustAfterOpen, 100)
      } else {
        // その他のブラウザの場合は少し余白を小さく
        setModalTop('2%')
        setModalMaxHeight('98vh')
      }
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, isSafari])

  return (
    <AnimatePresence>
      {isOpen && image && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onTap={onClose}
            className="fixed inset-0 bg-black/70 z-50"
          />
          
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ 
              type: "spring", 
              damping: 30,
              stiffness: 200,
              mass: 0.8,
              duration: 0.5
            }}
            className="fixed inset-x-0 bottom-0 z-50 flex items-end justify-center md:inset-0 md:items-center"
            style={{ 
              top: modalTop,
            }}
            onTap={onClose}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white w-full max-w-3xl overflow-y-auto md:overflow-visible flex flex-col md:flex-row gap-4 p-4 md:p-6 rounded-t-2xl md:rounded-lg md:my-0"
              style={{ maxHeight: modalMaxHeight }}
              onClick={e => e.stopPropagation()}
            >
              <div className="sticky top-0 right-0 z-50 flex items-center justify-center w-full md:absolute md:w-auto md:-top-3 md:-right-3">
                <div className="h-1 w-16 bg-gray-300 rounded-full md:hidden mx-auto mb-3" />
                <motion.button
                  onTap={onClose}
                  className="absolute right-2 top-0 md:static bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              <div className="w-full md:w-[55%] pt-8 md:pt-0">
                <div className="relative aspect-[4/3] md:aspect-[3/4] w-full rounded-lg overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-[45%]">
                <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800">{image.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{image.description}</p>
                
                <div className="space-y-2 md:space-y-3 mb-4">
                  <div>
                    <h4 className="font-bold text-sm text-gray-800 mb-1">種目</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium">近的</span>
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-sm text-gray-800 mb-1">構成内容</h4>
                    <div className="space-y-1 text-sm">
                      <div className="text-gray-600 flex">
                        <span className="font-medium w-24">ジュラシャフト</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.shaft}</span>
                      </div>
                      <div className="text-gray-600 flex">
                        <span className="font-medium w-24">羽根</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.fletching}</span>
                      </div>
                      <div className="text-gray-600 flex">
                        <span className="font-medium w-24">和紙</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.paper}</span>
                      </div>
                      <div className="text-gray-600 flex">
                        <span className="font-medium w-24">毛引</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.furubiki}</span>
                      </div>
                      <div className="text-gray-600 flex">
                        <span className="font-medium w-24">羽中加工</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.featherProcess}</span>
                      </div>
                      <div className="text-gray-600 flex">
                        <span className="font-medium w-24">プチデコ</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.decoration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-3 border-t border-gray-200">
                  <AnimatedTargetButton
                    href="https://sakuya-kyudogu.jp/order_made"
                    target="_blank"
                    onClick={() => {
                      onClose()
                    }}
                    className="scale-75"
                  >
                    この矢を作ってみる
                  </AnimatedTargetButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}