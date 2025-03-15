import { motion } from 'framer-motion'
import { useCallback, useRef, useState, useEffect } from 'react'

interface PrimaryButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
  triggerOnScroll?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  target?: string
}

export const PrimaryButton = ({ 
  children, 
  onClick, 
  href,
  className = "",
  triggerOnScroll = false,
  icon,
  iconPosition = 'right',
  target
}: PrimaryButtonProps) => {
  const buttonClasses = `
    inline-flex items-center justify-center gap-2
    bg-[#C84C38] text-white 
    px-8 py-3 
    rounded-full 
    text-lg font-bold
    shadow-lg hover:shadow-xl
    hover:bg-opacity-90 
    transition-all
    ${className}
  `
  
  // 重複実行を防ぐためのフラグ
  const isProcessingRef = useRef(false);
  // タッチデバイスかどうかのフラグ
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // クライアントサイドでのみタッチデバイス検出を行う
  useEffect(() => {
    setIsTouchDevice(
      typeof window !== 'undefined' && 
      ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    );
  }, []);

  const content = (
    <>
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </>
  )

  // リンクを開く処理を明示的に定義
  const handleClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    // デフォルトの動作を防止
    e.preventDefault();
    
    // イベントの伝播を停止
    e.stopPropagation();
    
    // 既に処理中なら何もしない
    if (isProcessingRef.current) return;
    
    // 処理中フラグを立てる
    isProcessingRef.current = true;
    
    // カスタムのクリックハンドラがあれば実行
    if (onClick) {
      onClick();
    }
    
    // リンクがあれば開く
    if (href) {
      if (target === '_blank') {
        window.open(href, target, 'noopener,noreferrer');
      } else {
        window.location.href = href;
      }
    }
    
    // 少し遅延してフラグをリセット（次のタップのため）
    setTimeout(() => {
      isProcessingRef.current = false;
    }, 300);
  }, [href, onClick, target]);
  
  // タッチデバイスの場合はonClickを無効化し、onTouchEndのみを使用
  const clickHandler = isTouchDevice ? undefined : handleClick;
  const touchEndHandler = isTouchDevice ? handleClick : undefined;

  if (href) {
    return (
      <button 
        onClick={clickHandler}
        onTouchEnd={touchEndHandler}
        className={buttonClasses}
        style={{ touchAction: 'manipulation' }}
      >
        {content}
      </button>
    )
  }

  if (triggerOnScroll) {
    return (
      <motion.button
        onClick={clickHandler}
        onTouchEnd={touchEndHandler}
        className={buttonClasses}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{ touchAction: 'manipulation' }}
      >
        {content}
      </motion.button>
    )
  }

  return (
    <button 
      onClick={clickHandler}
      onTouchEnd={touchEndHandler}
      className={buttonClasses}
      style={{ touchAction: 'manipulation' }}
    >
      {content}
    </button>
  )
}
