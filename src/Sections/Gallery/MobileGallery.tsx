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
  const patternOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1])

  return (
    <motion.div
      ref={containerRef}
      className="h-[200vh] relative z-40 bg-white"
    >
      <div className="sticky top-0 w-full h-screen flex items-center bg-white overflow-hidden">
        <div className="relative w-full h-[95vh]">
          <motion.div 
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at center, rgba(51, 51, 51, 0.08) 1.5px, transparent 1.5px) 0 0 / 16px 16px,
                #ffffff
              `,
              opacity: patternOpacity,
              backgroundAttachment: 'fixed'
            }}
          />

          <motion.div 
            className="absolute inset-0 z-10 bg-black/15 pointer-events-none"
            style={{ opacity: textOpacity }}
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center z-[1]"
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

          <motion.div 
            className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
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
            <motion.div
              className="mt-4 drop-shadow-[0_2px_2px_rgba(255,255,255,0.5)]"
              initial={{ opacity: 0.5, y: -5 }}
              animate={{ opacity: 1, y: 5 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1,
                ease: "easeInOut"
              }}
            >
              <svg 
                className="w-6 h-6 text-[#333333]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </motion.div>
          </motion.div>

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

          <motion.div 
            className="absolute inset-0 grid grid-cols-3 gap-2 p-2 pt-32 z-[2]"
            style={{
              opacity: galleryOpacity,
              scale: galleryScale
            }}
          >
            {galleryImages.map((image, index) => (
              <motion.div 
                key={index}
                className="relative rounded-lg overflow-hidden cursor-pointer"
                onTap={() => setSelectedImage(image)}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
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