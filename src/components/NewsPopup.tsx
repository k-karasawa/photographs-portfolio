import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiChevronRight } from 'react-icons/hi';
import Link from 'next/link';
import Image from 'next/image';

type NewsPopupProps = {
  title: string;
  content: string;
  link?: string;
  delay?: number;
  thumbnailSrc?: string; // サムネイル画像のパス
};

export const NewsPopup: React.FC<NewsPopupProps> = ({
  title,
  content,
  link,
  delay = 2000,
  thumbnailSrc = '/arrival/arrival1.jpg', // デフォルトのサムネイル画像
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    // ローカルストレージから閉じた状態と時間を確認
    const closedState = localStorage.getItem('newsPopupClosed');
    const closedTime = localStorage.getItem('newsPopupClosedAt');
    
    // ポップアップを閉じたことがある場合
    if (closedState === 'true' && closedTime) {
      const now = Date.now();
      const elapsedMs = now - parseInt(closedTime);
      const dayInMs = 24 * 60 * 60 * 1000; // 1日のミリ秒
      
      // 1日経過していたら再表示
      if (elapsedMs > dayInMs) {
        // リセット
        localStorage.removeItem('newsPopupClosed');
        localStorage.removeItem('newsPopupClosedAt');
      } else {
        // 1日経過していなければ閉じた状態を維持
        setIsClosed(true);
        return;
      }
    }
    
    // 表示までの遅延
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  const handleClose = () => {
    setIsVisible(false);
    
    // 閉じた状態と現在の時間をローカルストレージに保存
    localStorage.setItem('newsPopupClosed', 'true');
    localStorage.setItem('newsPopupClosedAt', Date.now().toString());
    
    setIsClosed(true);
  };

  // 閉じた状態または非表示状態の場合は何も表示しない
  if (isClosed || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed z-50 bottom-5 md:right-5 left-0 md:left-auto w-full md:w-[320px] px-4 md:px-0"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 flex">
            {/* サムネイル画像 */}
            <div className="relative w-24 h-auto shrink-0">
              <Image
                src={thumbnailSrc}
                alt={title}
                width={96}
                height={96}
                className="h-full object-cover"
              />
            </div>
            
            {/* コンテンツ部分 */}
            <div className="flex-1 py-3 px-4 relative">
              {/* タイトル */}
              <h3 className="text-[#C84C38] font-medium text-base mb-1.5 pr-6">
                {title}
              </h3>
              
              {/* 本文 */}
              <p className="text-gray-700 text-sm leading-snug mb-2.5">
                {content}
              </p>
              
              {/* リンク */}
              {link && (
                <Link 
                  href={link}
                  className="inline-flex items-center text-[#C84C38] font-medium text-sm hover:underline"
                >
                  詳細を見る
                  <HiChevronRight className="w-4 h-4 ml-0.5" />
                </Link>
              )}
              
              {/* 閉じるボタン */}
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                aria-label="閉じる"
              >
                <HiX className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 