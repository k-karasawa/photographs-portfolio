import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { PrimaryButton } from '@/components/PrimaryButton'
import { HiOutlineAcademicCap } from 'react-icons/hi2'

export const Message = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1.0, 0.3])

  return (
    <motion.section 
      ref={containerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="min-h-screen bg-white p-4 md:p-8 relative z-50 flex items-center"
      aria-label="メッセージセクション"
    >
      <div className="relative w-full h-[95vh] max-h-[95vh] mx-auto bg-white">
        <div className="absolute right-0 w-3/5 h-full overflow-hidden rounded-3xl">
          <motion.div 
            style={{ scale: imageScale }}
            className="relative w-full h-full"
          >
            <motion.div 
              style={{ opacity: imageOpacity }}
              className="w-full h-full"
            >
              <Image
                src="/images/hero-2.jpg"
                alt="Traditional Japanese dojo with a view to a serene garden through wooden doorway"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 40vw, 40vw"
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="mx-8 md:mx-16 max-w-2xl">
            <motion.div 
              className="mb-24"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl md:text-5xl lg:text-6xl font-normal text-[#333333] leading-tight font-sans mb-4"
              >
                自分だけの矢
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-[#666666] leading-relaxed font-sans mb-12"
              >
                手から離れていくものが、心を高揚させる。
                <br />
                中るのは、ただの結果だとしても。
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <PrimaryButton 
                  href="/explore"
                  icon={<HiOutlineAcademicCap className="w-6 h-6" />}
                >
                  矢の選び方を学ぶ　
                </PrimaryButton>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}