import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export const Message = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="min-h-screen bg-white p-2 md:p-4 relative z-50 flex items-center"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white w-full max-h-[95vh] mx-auto">
        <motion.div 
          style={{ scale: imageScale }}
          className="relative w-full h-[95vh]"
        >
          <motion.div style={{ opacity: imageOpacity }}>
            <Image
              src="/images/hero-2.jpg"
              alt="Traditional Japanese dojo with a view to a serene garden through wooden doorway"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            />
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 flex items-end">
          <div className="mx-8 md:mx-16 max-w-3xl mb-16 md:mb-32">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8 text-3xl md:text-2xl lg:text-6xl font-bold text-white"
              >
                自分だけの矢
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-12 text-xl md:text-2xl lg:text-4xl text-gray-200 leading-relaxed"
              >
                手から離れていくものが、心を高揚させる。
                <br />
                中るのは、ただの結果だとしても。
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link
                  href="/explore"
                  className="inline-flex items-center justify-center rounded-full bg-[#C84C38] text-white px-8 py-3 text-lg font-medium transition-all hover:bg-opacity-90 hover:shadow-xl shadow-lg"
                >
                  矢の選び方を学ぶ
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}