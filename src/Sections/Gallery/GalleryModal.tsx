import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { GalleryImage } from './galleryData'
import { AnimatedTargetButton } from '@/components/AnimatedTargetButton'
import { useEffect } from 'react'

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
  image: GalleryImage | null
}

export const GalleryModal = ({ isOpen, onClose, image }: GalleryModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleBackgroundClick = () => {
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && image && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackgroundClick}
            className="fixed inset-0 bg-black/70 z-50 cursor-pointer"
          />
          
          <motion.div
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
            onClick={handleBackgroundClick}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white w-full max-w-3xl overflow-y-auto md:overflow-visible flex flex-col md:flex-row gap-4 p-4 md:p-6 rounded-t-2xl md:rounded-lg md:my-0"
              style={{ maxHeight: '85vh', marginTop: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 right-0 z-50 flex items-center justify-center w-full md:absolute md:w-auto md:-top-4 md:-right-4">
                <div className="h-1 w-16 bg-gray-300 rounded-full md:hidden mx-auto mb-3" />
                <button
                  onClick={onClose}
                  className="absolute right-2 top-0 md:static bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                  aria-label="閉じる"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
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
                        <span className="font-medium w-24">シャフト</span>
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
                  <div className="transform translate-y-[50px]">
                    <AnimatedTargetButton
                      href="https://sakuya-kyudogu.jp/order_made/kinteki/full/parts"
                      target="_blank"
                      onClick={onClose}
                      className="scale-75"
                      triggerOnScroll={true}
                    >
                      この矢を作ってみる
                    </AnimatedTargetButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}