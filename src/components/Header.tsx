import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { PrimaryButton } from './PrimaryButton';

export const Header = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-[#333333]">咲矢弓道具</span>
          </Link>

          {/* ナビゲーション */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/gallery" className="text-[#666666] hover:text-[#333333]">
              ギャラリー
            </Link>
            <Link href="/ranking" className="text-[#666666] hover:text-[#333333]">
              人気ランキング
            </Link>
            <PrimaryButton 
              href="/customize"
              icon={<HiOutlineChevronRight className="w-5 h-5" />}
              className="ml-4"
            >
              オーダーメイド　
            </PrimaryButton>
          </nav>

          {/* モバイルメニューボタン */}
          <button className="md:hidden p-2">
            <span className="sr-only">メニューを開く</span>
            <div className="w-6 h-0.5 bg-[#333333] mb-1.5" />
            <div className="w-6 h-0.5 bg-[#333333] mb-1.5" />
            <div className="w-6 h-0.5 bg-[#333333]" />
          </button>
        </div>
      </div>
    </motion.header>
  );
};
