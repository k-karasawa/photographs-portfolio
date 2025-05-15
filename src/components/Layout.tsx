import React, { ReactNode } from 'react';
import Head from 'next/head';
import { NewsPopup } from './NewsPopup';

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = '咲矢弓道具 | 矢羽根のオーダーメイド専門店' 
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="弓道具のオーダーメイド専門店。オリジナルの矢羽根デザインをお作りします。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        {children}
      </main>
      
      {/* 新着情報ポップアップ */}
      <NewsPopup 
        title="新デザイン登場！"
        content="11種類の新柄が登場しました。お好みの色とパターンで、あなただけのオリジナル矢羽根を作りませんか？"
        link="/gallery"
        delay={3000}
      />
    </>
  );
}; 