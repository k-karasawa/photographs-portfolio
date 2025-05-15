import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiChevronRight } from 'react-icons/hi';
import Link from 'next/link';

type NewsPopupProps = {
  title: string;
  content: string;
  link?: string;
  delay?: number;
};

export const NewsPopup: React.FC<NewsPopupProps> = ({
  title,
  content,
  link,
  delay = 2000,
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
          className="fixed z-50 bottom-4 md:right-4 left-0 md:left-auto w-full md:w-80 px-4 md:px-0"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-[#C84C38]/10">
            {/* ヘッダー部分 */}
            <div className="bg-gradient-to-r from-[#E8A598] to-[#C84C38] px-4 py-2 flex justify-between items-center">
              <h3 className="text-white font-medium text-sm">
                {title}
              </h3>
              <button
                onClick={handleClose}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                aria-label="閉じる"
              >
                <HiX className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4 text-gray-700 text-sm">
              <p>{content}</p>
              
              {link && (
                <Link 
                  href={link}
                  className="mt-3 inline-flex items-center text-[#C84C38] font-medium text-sm hover:underline"
                >
                  詳細を見る
                  <HiChevronRight className="w-4 h-4 ml-1" />
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 