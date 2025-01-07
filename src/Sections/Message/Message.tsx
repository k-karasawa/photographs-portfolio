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

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 relative z-50 flex items-center" ref={containerRef}>
      <div className="relative overflow-hidden rounded-3xl bg-white w-full max-h-[80vh] mx-auto">
        <div className="relative w-full h-[80vh]">
          <Image
            src="/images/hero.webp"
            alt="Traditional Japanese dojo with a view to a serene garden through wooden doorway"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
        </div>

        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 flex items-end"
        >
          <div className="mx-8 md:mx-16 max-w-3xl mb-20 md:mb-40">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut"
              }}
              className="-translate-y-[-4rem]"
            >
              <div className="overflow-hidden">
                <motion.h2 
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-8 text-2xl md:text-2xl lg:text-4xl font-bold text-white"
                >
                  自分だけのオリジナル
                </motion.h2>
              </div>

              <div className="overflow-hidden">
                <motion.p 
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12 text-xl md:text-2xl lg:text-4xl text-gray-200 leading-relaxed"
                >
                  手から離れていくものが、心を高揚させる。
                  <br />
                  中るのは、ただの結果だとしても。
                  <br />
                  その一瞬の解放が、新たな伝統を生む。
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.6,
                  ease: "easeOut"
                }}
              >
                <Link
                  href="/explore"
                  className="inline-flex items-center justify-center rounded-md bg-white/90 backdrop-blur-sm px-8 py-4 text-lg font-medium text-gray-900 transition-all hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  Explore
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}