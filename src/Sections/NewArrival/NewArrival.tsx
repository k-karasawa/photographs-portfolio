import Image from 'next/image'
import { motion } from 'framer-motion'
import { HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2'
import { NewArrivalContent } from './NewArrivalContent'
import { HiArrowDown } from 'react-icons/hi'

export const NewArrival = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#FFF8F3] to-[#FFF] h-screen px-4 md:px-0 pt-6 pb-8 flex flex-col justify-between">
      <motion.h2
        className="text-3xl md:text-5xl lg:text-6xl font-normal text-[#C84C38] tracking-widest text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        New Arrival
      </motion.h2>
      <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-6 p-3 md:p-8">
        {/* 画像2枚横並び */}
        <div className="w-full md:w-1/2 flex flex-row gap-2 h-full">
          <div className="w-1/2 relative aspect-[3/4] rounded-xl overflow-hidden shadow-md group">
            <Image
              src="/arrival/arrival1.jpg"
              alt="新商品画像1"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <a
              href="https://sakuya-kyudogu.jp/order_made/new_arrival"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-x-0 bottom-0 flex items-center justify-center p-3"
            >
              <div className="bg-white/90 text-[#C84C38] px-4 py-1.5 text-sm md:text-base md:px-5 md:py-2 rounded-full font-medium flex items-center gap-2 transform group-hover:scale-105 transition-all duration-300 shadow-lg border border-[#C84C38]/10">
                カスタマイズ
                <HiOutlineArrowTopRightOnSquare className="w-3 h-3 md:w-4 md:h-4 group-hover:animate-pulse" />
              </div>
            </a>
          </div>
          <div className="w-1/2 relative aspect-[3/4] rounded-xl overflow-hidden shadow-md group">
            <Image
              src="/arrival/arrival2.jpg"
              alt="新商品画像2"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <a
              href="https://sakuya-kyudogu.jp/order_made/new_arrival"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-x-0 bottom-0 flex items-center justify-center p-3"
            >
              <div className="bg-white/90 text-[#C84C38] px-4 py-1.5 text-sm md:text-base md:px-5 md:py-2 rounded-full font-medium flex items-center gap-2 transform group-hover:scale-105 transition-all duration-300 shadow-lg border border-[#C84C38]/10">
                カスタマイズ
                <HiOutlineArrowTopRightOnSquare className="w-3 h-3 md:w-4 md:h-4 group-hover:animate-pulse" />
              </div>
            </a>
          </div>
        </div>
        {/* 商品情報 */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <NewArrivalContent />
        </div>
      </div>

      {/* ギャラリーへの誘導 */}
      <motion.div
        className="mt-4 mb-2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="bg-gradient-to-r from-[#E8A598] to-[#C84C38] px-8 py-3 rounded-full shadow-lg text-white font-medium flex items-center gap-3 transform hover:scale-105 transition-all duration-300">
          <span className="text-lg">その他のデザインは次のギャラリーページでチェック</span>
          <HiArrowDown className="w-5 h-5 animate-bounce" />
        </div>
        <div className="w-1 h-12 bg-gradient-to-b from-[#C84C38] to-transparent mt-3"></div>
      </motion.div>
    </section>
  )
}

