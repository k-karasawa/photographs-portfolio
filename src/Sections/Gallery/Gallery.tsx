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
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -50])
  const galleryTitleOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1])
  const galleryTitleY = useTransform(scrollYProgress, [0.3, 0.4], [20, 0])

  // すべての可能な変換を事前に計算
  const transforms = {
    x: {
      outer: useTransform(scrollYProgress, [0.1, 0.4], ['0%', '20%']),
      inner: useTransform(scrollYProgress, [0.1, 0.4], ['0%', '10%']),
      outerNeg: useTransform(scrollYProgress, [0.1, 0.4], ['0%', '-20%']),
      innerNeg: useTransform(scrollYProgress, [0.1, 0.4], ['0%', '-10%'])
    },
    y: {
      outer: useTransform(scrollYProgress, [0.1, 0.4], ['0%', '20%']),
      inner: useTransform(scrollYProgress, [0.1, 0.4], ['0%', '10%']),
      outerNeg: useTransform(scrollYProgress, [0.1, 0.4], ['0%', '-20%']),
      innerNeg: useTransform(scrollYProgress, [0.1, 0.4], ['0%', '-10%'])
    }
  }

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="h-[200vh] bg-[#B5D8D6] relative z-40"
    >
      <div className="sticky top-0 w-full h-screen flex items-center">
        <motion.div 
          className="absolute inset-0 z-10 bg-black/20"
          style={{ opacity: textOpacity }}
        />

        <div className="relative w-full h-[95vh] p-2 md:p-4">
          <motion.div 
            className="absolute top-8 left-0 w-full z-30 px-20"
            style={{ 
              opacity: galleryTitleOpacity,
              y: galleryTitleY
            }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#333333] mb-4">
              Arrow Gallery
            </h2>
            <div className="w-full h-[1px] bg-[#333333] opacity-20"></div>
          </motion.div>

          <motion.div 
            className="absolute inset-0 z-20 flex flex-col items-center justify-center"
            style={{ opacity: textOpacity, y: textY }}
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4 text-3xl md:text-4xl lg:text-6xl font-bold text-[#333333] drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
            >
              Arrow
            </motion.h2>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12 text-3xl md:text-4xl lg:text-6xl font-bold text-[#333333] drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
            >
              Gallery
            </motion.h2>

            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.p 
                className="text-lg text-[#333333] mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.8 }}
              >
                Scroll to explore
              </motion.p>
              <motion.div
                className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
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

          <div className="absolute inset-0 grid grid-cols-5 grid-rows-3 gap-12 p-20 pt-32">
            {Array.from({ length: 15 }).map((_, index) => {
              const row = Math.floor(index / 5)
              const col = index % 5
              const rowOffset = row - 1 // -1, 0, 1
              const colOffset = col - 2 // -2, -1, 0, 1, 2

              // 位置に基づいて適切な変換を選択
              const xTransform = index !== 7 ? (
                Math.abs(colOffset) === 2 ? (colOffset > 0 ? transforms.x.outer : transforms.x.outerNeg) :
                Math.abs(colOffset) === 1 ? (colOffset > 0 ? transforms.x.inner : transforms.x.innerNeg) :
                undefined
              ) : undefined

              const yTransform = index !== 7 ? (
                Math.abs(rowOffset) === 1 ? (rowOffset > 0 ? transforms.y.inner : transforms.y.innerNeg) :
                undefined
              ) : undefined

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
                      x: xTransform,
                      y: yTransform
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
