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
  
  // 位置のアニメーション用の値
  const galleryScale = useTransform(scrollYProgress, [0.1, 0.4], [0.6, 1])

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
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-3 gap-12 p-20">
            {Array.from({ length: 15 }).map((_, index) => {
              // 中央からの相対位置を計算
              const rowOffset = Math.floor(index / 5) - 1 // -1, 0, 1
              const colOffset = (index % 5) - 2 // -2, -1, 0, 1, 2
              
              // 外側の移動距離を調整
              const distance = Math.max(Math.abs(rowOffset), Math.abs(colOffset))
              const moveScale = distance === 2 ? 0.8 : 1 // 外側の移動距離を抑制

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
                      src="/gallery/8.jpg"
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
