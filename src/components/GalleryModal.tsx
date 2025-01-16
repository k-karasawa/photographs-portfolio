import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  title: string
  description: string
}

export const GalleryModal = ({ isOpen, onClose, imageSrc, title, description }: GalleryModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
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
          >
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>

              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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