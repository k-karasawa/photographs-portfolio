import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AnimatedTargetButton } from '@/components/AnimatedTargetButton'
import { features } from './featuresData'

export const CustomOrderSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#B5D8D6] to-[#9CC7C5]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute w-[200%] h-[100%] bg-white/80 -rotate-12 translate-x-[-25%] translate-y-[50%]"
        />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-24">
          <div className="mb-8">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#7B4B94] mb-6 font-japanese">
              オーダーメイドの楽しさ
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg relative overflow-hidden group"
            >
              {/* 光のエフェクト用のオーバーレイ - トランジションを個別に設定 */}
              <div 
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full pointer-events-none
                bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12
                transition-transform duration-[400ms] group-hover:duration-[1000ms] ease-in-out"
              />

              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.2 + 0.3
                }}
                className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#7B4B94] to-[#5B6B7C]/20 flex items-center justify-center mb-6"
              >
                <feature.icon className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-[#7B4B94] mb-3 font-japanese">
                {feature.title}
              </h3>
              <p className="text-[#5B6B7C] text-lg">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mt-24 text-center"
        >
          <AnimatedTargetButton triggerOnScroll={true}>
            カスタムオーダーを始める
          </AnimatedTargetButton>
        </motion.div>
      </motion.div>
    </section>
  )
}