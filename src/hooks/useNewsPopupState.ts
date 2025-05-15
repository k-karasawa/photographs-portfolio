import { useState, useEffect } from 'react';

// NewsPopupの表示状態を管理するカスタムフック
export const useNewsPopupState = (delay: number = 500) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window === 'undefined') return;

    // ローカルストレージから閉じた状態と時間を確認
    const closedState = localStorage.getItem('newsPopupClosed');
    const closedTime = localStorage.getItem('newsPopupClosedAt');
    
    let shouldShowPopup = true;
    
    // ポップアップを閉じたことがある場合
    if (closedState === 'true' && closedTime) {
      const now = Date.now();
      const elapsedMs = now - parseInt(closedTime);
      const dayInMs = 24 * 60 * 60 * 1000; // 1日のミリ秒
      
      // 1日経過していない場合は表示しない
      if (elapsedMs <= dayInMs) {
        shouldShowPopup = false;
      }
    }
    
    // 表示フラグが立っている場合は遅延表示
    if (shouldShowPopup) {
      const timer = setTimeout(() => {
        setIsPopupVisible(true);
        setIsInitialized(true);
      }, delay);
      
      return () => clearTimeout(timer);
    } else {
      // 表示しない場合は初期化完了フラグのみセット
      setIsInitialized(true);
    }
  }, [delay]);

  // ポップアップを閉じる関数
  const closePopup = () => {
    setIsPopupVisible(false);
    
    // ローカルストレージに保存
    if (typeof window !== 'undefined') {
      localStorage.setItem('newsPopupClosed', 'true');
      localStorage.setItem('newsPopupClosedAt', Date.now().toString());
    }
  };

  return { 
    isPopupVisible, 
    setIsPopupVisible, 
    closePopup,
    isInitialized 
  };
}; 