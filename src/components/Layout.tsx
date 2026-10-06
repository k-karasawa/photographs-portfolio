import React, { ReactNode, createContext } from 'react';
import Head from 'next/head';
import { NewsPopup } from './NewsPopup';
import { useNewsPopupState } from '@/hooks/useNewsPopupState';
import { appConfig } from '@/config/appConfig';

// NewsPopupの表示状態を管理するコンテキスト
export const NewsPopupContext = createContext<{ 
  isPopupVisible: boolean;
  isInitialized: boolean;
}>({ 
  isPopupVisible: false,
  isInitialized: false
});

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = '弓道の矢 柄・色の組み合わせ作例集 | 咲矢弓道具 オーダー矢ギャラリー'
}) => {
  // 設定から遅延時間を取得
  const popupDelay = appConfig.newsPopup.delay;
  const { isPopupVisible, isInitialized } = useNewsPopupState(popupDelay);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="弓道の矢を見た目で選ぶ作例ギャラリー。羽根の柄と糸・和紙の色の組み合わせ作例を写真で紹介します。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <NewsPopupContext.Provider value={{ isPopupVisible, isInitialized }}>
        <main>
          {children}
        </main>
      </NewsPopupContext.Provider>
      
      {/* 新着情報ポップアップ - appConfig.newsPopup.enabledがfalseの場合は表示されない */}
      <NewsPopup 
        title="グースの近的矢が新登場✨"
        content="人気の羽根柄をグースでもご用意！しなやかで矢飛び安定、ステップアップにおすすめです🎯"
        targetSection="new-arrival"
        delay={popupDelay}
        thumbnailSrc="/arrival/kasuo2.jpg"
      />
    </>
  );
}; 