import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export const Gallery = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const centerScale = useTransform(scrollYProgress, [0.1, 0.4], [4, 1])
  const galleryOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const galleryScale = useTransform(scrollYProgress, [0.1, 0.4], [0.6, 1])
  
  // テキストのアニメーション用の値
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="h-[200vh] bg-[#B5D8D6] relative z-40"
    >
      <div className="sticky top-0 w-full h-screen p-2 md:p-4 flex items-center">
        <div className="relative w-full h-[95vh]">
          {/* テキストオーバーレイ */}
          <motion.div 
            className="absolute inset-0 z-20 flex flex-col items-center justify-center"
            style={{ opacity: textOpacity, y: textY }}
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4 text-3xl md:text-4xl lg:text-6xl font-bold text-[#333333]"
            >
              Arrow Gallery
            </motion.h2>

            {/* スクロールを促すアニメーション */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.p 
                className="text-lg text-[#333333] mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.8 }}
              >
                Scroll to explore
              </motion.p>
              <motion.div
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
          </motion.div>

          <div className="absolute inset-0 grid grid-cols-5 grid-rows-3 gap-12 p-20">
            {Array.from({ length: 15 }).map((_, index) => {
              const rowOffset = Math.floor(index / 5) - 1
              const colOffset = (index % 5) - 2
              const distance = Math.max(Math.abs(rowOffset), Math.abs(colOffset))
              const moveScale = distance === 2 ? 0.8 : 1

              return (
                <motion.div 
                  key={index}
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    scale: index === 7 ? centerScale : galleryScale,
                    opacity: index === 7 ? 1 : galleryOpacity,
                    zIndex: index === 7 ? 10 : 1,
                    transformOrigin: 'center center',
                    ...(index !== 7 && {
                      x: useTransform(scrollYProgress, 
                        [0.1, 0.4], 
                        ['0%', `${colOffset * 10 * moveScale}%`]
                      ),
                      y: useTransform(scrollYProgress, 
                        [0.1, 0.4], 
                        ['0%', `${rowOffset * 10 * moveScale}%`]
                      )
                    })
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={index === 7 ? "/gallery/gallery-1.jpg" : "/gallery/8.jpg"}
                      alt="Traditional Japanese arrow with detailed craftsmanship"
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
