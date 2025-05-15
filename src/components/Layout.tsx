import React, { ReactNode, createContext } from 'react';
import Head from 'next/head';
import { NewsPopup } from './NewsPopup';
import { useNewsPopupState } from '@/hooks/useNewsPopupState';

// NewsPopupの表示状態を管理するコンテキスト
export const NewsPopupContext = createContext<{ isPopupVisible: boolean }>({ isPopupVisible: false });

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = '咲矢弓道具 | 矢羽根のオーダーメイド専門店' 
}) => {
  // NewsPopupと同じ遅延を指定
  const popupDelay = 500;
  const { isPopupVisible } = useNewsPopupState(popupDelay);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="弓道具のオーダーメイド専門店。オリジナルの矢羽根デザインをお作りします。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <NewsPopupContext.Provider value={{ isPopupVisible }}>
        <main>
          {children}
        </main>
      </NewsPopupContext.Provider>
      
      {/* 新着情報ポップアップ */}
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