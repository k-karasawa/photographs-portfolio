import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { GalleryImage } from './galleryData'
import { useRef } from 'react'

interface MobileGalleryProps {
  setSelectedImage: (image: GalleryImage) => void
  galleryImages: GalleryImage[]
}

export const MobileGallery = ({ setSelectedImage, galleryImages }: MobileGalleryProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const mainImageScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  const mainImageOpacity = useTransform(scrollYProgress, [0.2, 0.3], [1, 0])
  const galleryOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const galleryScale = useTransform(scrollYProgress, [0.2, 0.4], [0.8, 1])
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -50])
  const galleryTitleOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1])
  const galleryTitleY = useTransform(scrollYProgress, [0.3, 0.4], [20, 0])

  return (
    <motion.div
      ref={containerRef}
      className="h-[200vh] relative z-40 bg-white"
    >
      <div className="sticky top-0 w-full h-screen flex items-center bg-white overflow-hidden">
        <div className="relative w-full h-[95vh]">
          {/* メイン画像 */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{
              opacity: mainImageOpacity,
              scale: mainImageScale
            }}
          >
            <div className="relative w-full h-full px-8 pt-20 pb-8">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src={galleryImages[0].src}
                  alt="Featured arrow"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* タイトルテキスト */}
          <motion.div 
            className="absolute inset-0 z-20 flex flex-col items-center justify-center"
            style={{ opacity: textOpacity, y: textY }}
          >
            <motion.h2 
              className="text-3xl font-bold text-[#333333] mb-4 drop-shadow-[0_2px_2px_rgba(255,255,255,0.5)]"
            >
              Arrow Gallery
            </motion.h2>
            <motion.p 
              className="text-lg text-[#333333] opacity-80 drop-shadow-[0_2px_2px_rgba(255,255,255,0.5)]"
            >
              Scroll to explore
            </motion.p>
          </motion.div>

          {/* ギャラリータイトル */}
          <motion.div 
            className="absolute top-8 left-0 w-full z-30 px-4"
            style={{ 
              opacity: galleryTitleOpacity,
              y: galleryTitleY
            }}
          >
            <h2 className="text-2xl font-bold text-[#333333] mb-4">
              Arrow Gallery
            </h2>
            <div className="w-full h-[1px] bg-[#333333] opacity-20"></div>
          </motion.div>

          {/* ギャラリーグリッド */}
          <motion.div 
            className="absolute inset-0 grid grid-cols-3 gap-2 p-2 pt-32"
            style={{
              opacity: galleryOpacity,
              scale: galleryScale
            }}
          >
            {galleryImages.map((image, index) => (
              <motion.div 
                key={index}
                className="relative rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={image.src}
                    alt={`Traditional Japanese arrow ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
} 