import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { GalleryImage } from './galleryData'
import { AnimatedTargetButton } from '@/components/AnimatedTargetButton'

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
  image: GalleryImage | null
}

export const GalleryModal = ({ isOpen, onClose, image }: GalleryModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && image && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-50"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div 
              className="relative bg-white rounded-lg w-full max-w-3xl flex flex-col md:flex-row gap-4 p-4 md:p-6" 
              onClick={e => e.stopPropagation()}
            >
              <div className="w-full md:w-[55%] relative">
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
                      <div className="text-gray-600 flex flex-wrap md:flex-nowrap">
                        <span className="font-medium w-20 md:w-24">ジュラシャフト</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.shaft}</span>
                      </div>
                      <div className="text-gray-600 flex flex-wrap md:flex-nowrap">
                        <span className="font-medium w-20 md:w-24">羽根</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.fletching}</span>
                      </div>
                      <div className="text-gray-600 flex flex-wrap md:flex-nowrap">
                        <span className="font-medium w-20 md:w-24">和紙</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.paper}</span>
                      </div>
                      <div className="text-gray-600 flex flex-wrap md:flex-nowrap">
                        <span className="font-medium w-20 md:w-24">毛引</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.furubiki}</span>
                      </div>
                      <div className="text-gray-600 flex flex-wrap md:flex-nowrap">
                        <span className="font-medium w-20 md:w-24">羽中加工</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.featherProcess}</span>
                      </div>
                      <div className="text-gray-600 flex flex-wrap md:flex-nowrap">
                        <span className="font-medium w-20 md:w-24">プチデコ</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.decoration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-3 border-t border-gray-200">
                  <AnimatedTargetButton
                    onClick={() => {
                      onClose()
                      // ここに注文フォームへの遷移などを追加
                    }}
                    className="scale-[0.65] md:scale-75"
                  >
                    この矢を作ってみる
                  </AnimatedTargetButton>
                </div>
              </div>

              <button
                onClick={onClose}
                className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-white rounded-full p-1.5 md:p-2 shadow-md hover:bg-gray-100 transition-colors"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}