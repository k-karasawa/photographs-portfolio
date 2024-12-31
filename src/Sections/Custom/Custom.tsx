import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

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
      {/* Diagonal white section */}
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
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-[#7B4B94] mb-6 font-japanese">
              オーダーメイドの楽しさ
            </h2>
            <p className="text-xl text-[#5B6B7C] max-w-2xl mx-auto">
              あなただけの矢を、こだわりの素材と職人の技で。
              伝統と現代の技術が織りなす、世界にひとつの弓道具。
            </p>
          </motion.div>
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mt-16 text-center"
        >
          <motion.div 
            className="relative inline-block"
            initial="initial"
            animate="initial"
            whileHover="hover"
          >
            <motion.button
              className="relative px-8 py-4 bg-gradient-to-r from-[#7B4B94] to-[#9A6BA5] text-white rounded-full text-lg font-bold hover:from-[#6A3A83] hover:to-[#895A94] transition-all duration-300 shadow-lg hover:shadow-[#7B4B94]/25"
            >
              <span className="inline-flex items-center gap-6 -translate-y-0.5">
                <span>
                  カスタムオーダーを始める
                </span>

                <Image
                  src="/icons/target.png"
                  alt="Target"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                  style={{ width: "auto", height: "auto" }}
                />
              </span>
            </motion.button>

            {/* 矢のアニメーション */}
            <motion.div
              variants={{
                initial: { 
                  opacity: 0,
                  x: 100,
                  y: -50,
                  scale: 0
                },
                hover: { 
                  opacity: 1,
                  x: -15,
                  y: -5,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    mass: 0.5,
                    delay: 0.1
                  }
                }
              }}
              className="absolute top-2 -right-2 -translate-y-1/2 pointer-events-none"
              style={{ rotate: '-45deg' }}
            >
              <Image
                src="/icons/arrow.png"
                alt="Arrow"
                width={60}
                height={12}
                className="w-16"
                style={{ width: "auto", height: "auto" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

const features = [
  {
    title: "素材選びから",
    description: "竹の種類や矢羽の色まで、細部にわたってカスタマイズが可能です。",
    icon: ({ className }: { className?: string }) => (
      <svg 
        className={className} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" 
        />
      </svg>
    )
  },
  {
    title: "職人の技術",
    description: "熟練の職人が、一本一本丁寧に仕上げます。伝統の技と現代の精度が調和した逸品を。",
    icon: ({ className }: { className?: string }) => (
      <svg 
        className={className} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
        />
      </svg>
    )
  },
  {
    title: "世界にひとつ",
    description: "あなたの体格や射法八節に合わせた、世界でたった一つの矢をお作りします。",
    icon: ({ className }: { className?: string }) => (
      <svg 
        className={className} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" 
        />
      </svg>
    )
  }
]