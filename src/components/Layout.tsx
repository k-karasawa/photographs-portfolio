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
  title = '咲矢弓道具 | 矢羽根のオーダーメイド専門店' 
}) => {
  // 設定から遅延時間を取得
  const popupDelay = appConfig.newsPopup.delay;
  const { isPopupVisible, isInitialized } = useNewsPopupState(popupDelay);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="弓道具のオーダーメイド専門店。オリジナルの矢羽根デザインをお作りします。" />
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
        title="羽根の新デザイン登場"
        content="11種類の新柄が登場しました。お好みの色とパターンで、あなただけのオリジナル矢を🎯"
        targetSection="new-arrival"
        delay={popupDelay}
        thumbnailSrc="/arrival/arrival1.jpg"
      />
    </>
  );
}; 