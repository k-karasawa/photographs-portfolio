import Image from 'next/image'
import { AnimatedTargetButton } from '@/components/AnimatedTargetButton'
import { motion } from 'framer-motion'

export const NewArrival = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#FFF8F3] to-[#FFF] min-h-screen px-4 md:px-0 pt-8 pb-12">
      <motion.h2
        className="text-3xl md:text-5xl lg:text-6xl font-normal text-[#C84C38] tracking-widest text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        New Arrival
      </motion.h2>
      <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-8 p-4 md:p-12">
        {/* 画像2枚縦並び */}
        <div className="w-full md:w-1/2 flex flex-col gap-2 justify-center">
          <div className="relative w-full aspect-video max-h-[28vh] rounded-xl overflow-hidden shadow-md">
            <Image
              src="/new-arrival.jpg"
              alt="新商品画像1"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative w-full aspect-video max-h-[28vh] rounded-xl overflow-hidden shadow-md">
            <Image
              src="/new-arrival2.jpg"
              alt="新商品画像2"
              fill
              className="object-cover"
            />
          </div>
        </div>
        {/* 商品情報 */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-[#C84C38] mb-2 tracking-tight">New Arrival</h2>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">2024年新作「煌（きらめき）」</h3>
          <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed">
            伝統と革新が融合した新しい矢「煌（きらめき）」が登場。<br className="hidden md:block" />
            洗練されたデザインと最高級素材で、あなたの射をより美しく、力強くサポートします。
          </p>
          <AnimatedTargetButton
            href="https://sakuya-kyudogu.jp/order_made/new_arrival"
            target="_blank"
            className="mt-2"
          >
            この新商品を詳しく見る
          </AnimatedTargetButton>
        </div>
      </div>
    </section>
  )
}
