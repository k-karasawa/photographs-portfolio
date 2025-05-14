import Image from 'next/image'
import { AnimatedTargetButton } from '@/components/AnimatedTargetButton'

export const NewArrival = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#FFF8F3] to-[#FFF] min-h-screen flex justify-center items-center py-16 md:py-24 px-4 md:px-0">
      {/* 左上タイトル */}
      <h1 className="absolute left-1/2 top-8 -translate-x-1/2 text-3xl md:text-5xl lg:text-6xl font-normal text-[#C84C38] tracking-widest z-20 select-none pointer-events-none text-center">
        New Arrival
      </h1>
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-8 p-6 md:p-12">
        {/* 商品画像 */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="relative w-60 h-60 md:w-80 md:h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/new-arrival.jpg"
              alt="新商品画像"
              fill
              className="object-cover"
              priority
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
