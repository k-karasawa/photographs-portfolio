import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiChevronRight } from 'react-icons/hi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useNewsPopupState } from '@/hooks/useNewsPopupState';

type NewsPopupProps = {
  title: string;
  content: string;
  link?: string;
  targetSection?: string; // スクロール先のセクションID
  delay?: number; // 使用しなくなったが、APIの互換性のために残す
  thumbnailSrc?: string; // サムネイル画像のパス
};

export const NewsPopup: React.FC<NewsPopupProps> = ({
  title,
  content,
  link,
  targetSection = 'new-arrival', // デフォルトはnew-arrivalセクション
  thumbnailSrc = '/arrival/arrival1.jpg',
}) => {
  const { isPopupVisible, closePopup } = useNewsPopupState();
  const router = useRouter();

  // ターゲットセクションへスクロールする関数
  const scrollToSection = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // ポップアップを閉じる
    closePopup(); // setIsPopupVisibleではなくclosePopupを使用
    
    // 現在のページにセクションが存在する場合は直接スクロール
    const targetElement = document.getElementById(targetSection);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else if (link) {
      // セクションがない場合は指定されたURLに遷移
      router.push(link);
    }
  };

  // 非表示状態の場合は何も表示しない
  if (!isPopupVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isPopupVisible && (
        <motion.div
          className="fixed z-50 bottom-5 md:right-5 left-0 md:left-auto w-full md:w-[420px] px-4 md:px-0"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div 
            className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 flex h-[110px] md:h-[160px] cursor-pointer"
            onClick={scrollToSection}
          >
            {/* サムネイル画像 */}
            <div className="relative w-32 md:w-40 shrink-0">
              <Image
                src={thumbnailSrc}
                alt={title}
                fill
                sizes="(max-width: 768px) 128px, 160px"
                className="object-cover object-center"
              />
            </div>
            
            {/* コンテンツ部分 */}
            <div className="flex-1 py-3 px-4 md:py-4 md:px-5 relative flex flex-col h-full">
              <div>
                {/* タイトル */}
                <h3 className="text-[#C84C38] font-medium text-sm md:text-base mb-1.5 md:mb-2 pr-5 md:pr-6">
                  {title}
                </h3>
                
                {/* 本文 */}
                <p className="text-gray-700 text-xs md:text-sm leading-relaxed line-clamp-3 mb-1.5 md:mb-2.5">
                  {content}
                </p>
              </div>
              
              <div className="mt-auto pb-0 md:pb-4">
                {/* リンク */}
                <div className="inline-flex items-center text-[#C84C38] font-medium text-xs md:text-sm hover:underline">
                  詳細を見る
                  <HiChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 ml-0.5 md:ml-1" />
                </div>
              </div>
              
              {/* 閉じるボタン */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // イベントの伝播を止める
                  closePopup();
                }}
                className="absolute top-1.5 right-1.5 md:top-2 md:right-2 text-gray-400 hover:text-gray-600 rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center transition-colors"
                aria-label="閉じる"
              >
                <HiX className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 