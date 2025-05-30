import Image from 'next/image'
import { motion } from 'framer-motion'
import { HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2'
import { NewArrivalContent } from './NewArrivalContent'
import { HiArrowDown } from 'react-icons/hi'

export const NewArrival = () => {
  return (
    <section id="new-arrival" className="relative bg-gradient-to-br from-[#FFF8F3] to-[#FFF] min-h-[110vh] md:h-screen px-4 md:px-0 pt-6 pb-12 md:pb-8 md:flex md:flex-col md:justify-between">
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
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent"></div>
            <a
              href="https://sakuya-kyudogu.jp/order_made?rid=67"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-x-0 bottom-0 flex items-center justify-center p-3"
            >
              <div className="bg-white/90 text-[#C84C38] px-3 py-1 text-xs sm:text-sm md:text-base md:px-5 md:py-2 rounded-full font-medium flex items-center gap-1 md:gap-2 transform group-hover:scale-105 transition-all duration-300 shadow-lg border border-[#C84C38]/10 whitespace-nowrap">
                <span className="hidden md:inline">カスタマイズしてみる</span>
                <span className="inline md:hidden">カスタマイズ</span>
                <HiOutlineArrowTopRightOnSquare className="w-2.5 h-2.5 md:w-4 md:h-4 group-hover:animate-pulse" />
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
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent"></div>
            <a
              href="https://sakuya-kyudogu.jp/order_made?rid=68"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-x-0 bottom-0 flex items-center justify-center p-3"
            >
              <div className="bg-white/90 text-[#C84C38] px-3 py-1 text-xs sm:text-sm md:text-base md:px-5 md:py-2 rounded-full font-medium flex items-center gap-1 md:gap-2 transform group-hover:scale-105 transition-all duration-300 shadow-lg border border-[#C84C38]/10 whitespace-nowrap">
                <span className="hidden md:inline">カスタマイズしてみる</span>
                <span className="inline md:hidden">カスタマイズ</span>
                <HiOutlineArrowTopRightOnSquare className="w-2.5 h-2.5 md:w-4 md:h-4 group-hover:animate-pulse" />
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
        className="mt-8 md:mt-4 mb-2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="bg-gradient-to-r from-[#E8A598] to-[#C84C38] px-6 md:px-8 py-2 md:py-3 rounded-full shadow-lg text-white font-medium flex items-center gap-2 md:gap-3 transform hover:scale-105 transition-all duration-300">
          <span className="text-base md:text-lg">
            <span className="hidden md:inline">その他のデザインはギャラリーページでチェック</span>
            <span className="inline md:hidden">その他のデザインはギャラリーで</span>
          </span>
          <HiArrowDown className="w-4 h-4 md:w-5 md:h-5 animate-bounce" />
        </div>
        <div className="w-1 h-10 md:h-12 bg-gradient-to-b from-[#C84C38] to-transparent mt-3"></div>
      </motion.div>
    </section>
  )
}

