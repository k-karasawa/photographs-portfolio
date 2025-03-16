import { motion, useAnimationControls, TargetAndTransition } from 'framer-motion'
import Image from 'next/image'
import { ReactNode, useCallback, useRef, useState, useEffect } from 'react'

type AnimatedTargetButtonProps = {
  children: ReactNode
  onClick?: () => void
  href?: string
  target?: string
  className?: string
  triggerOnScroll?: boolean
}

export const AnimatedTargetButton = ({ 
  children, 
  onClick,
  href,
  target = "_blank",
  className = "",
  triggerOnScroll = false
}: AnimatedTargetButtonProps) => {
  const controls = useAnimationControls()
  const scale = className.includes('scale-75') ? 0.75 : 1
  
  // 重複実行を防ぐためのフラグ
  const isProcessingRef = useRef(false);
  // タッチデバイスかどうかのフラグ
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  // コンポーネントがマウントされているかどうかを追跡
  const isMountedRef = useRef(false);
  
  // クライアントサイドでのみタッチデバイス検出を行う
  useEffect(() => {
    setIsTouchDevice(
      typeof window !== 'undefined' && 
      ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    );
    
    // コンポーネントがマウントされたことを記録
    isMountedRef.current = true;
    
    // クリーンアップ関数
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  // アニメーションを安全に実行するヘルパー関数
  const safelyRunAnimation = useCallback((animation: string | TargetAndTransition) => {
    if (isMountedRef.current) {
      controls.start(animation);
    }
  }, [controls]);

  // リンクを開く処理を明示的に定義
  const openLink = useCallback((e: React.MouseEvent | React.TouchEvent) => {
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
  const clickHandler = isTouchDevice ? undefined : openLink;
  const touchEndHandler = isTouchDevice ? openLink : undefined;

  return (
    <motion.div 
      className="relative inline-block"
      initial="initial"
      animate="initial"
      whileHover="hover"
      style={{ scale }}
      whileInView={triggerOnScroll ? "hover" : undefined}
      viewport={{ once: false, margin: "-100px" }}
      onViewportLeave={() => {
        if (triggerOnScroll) {
          safelyRunAnimation("initial");
        }
      }}
    >
      <motion.button
        onClick={clickHandler}
        onTouchEnd={touchEndHandler}
        variants={{
          initial: {
            scale: 1,
            x: 0
          },
          hover: {
            scale: 1,
            x: 0
          }
        }}
        animate={controls}
        className={`
          relative px-8 py-4 
          bg-gradient-to-r from-[#C84C38] to-[#D85F4D] 
          text-white rounded-full text-lg font-bold 
          hover:from-[#B73D2D] hover:to-[#C74E3C] 
          transition-colors duration-300 
          shadow-lg hover:shadow-[#C84C38]/25
          ${href ? 'cursor-pointer' : ''}
          touch-action: manipulation;
        `}
      >
        <span className="inline-flex items-center gap-6 -translate-y-0.5 whitespace-nowrap">
          <span>
            {children}
          </span>
          <Image
            src="/icons/target.png"
            alt="Target"
            width={24}
            height={24}
            className="w-6 h-6"
            style={{ width: "auto", height: "auto" }}
          />
        </span>
      </motion.button>

      {/* 矢のアニメーション */}
      <motion.div
        variants={{
          initial: { 
            opacity: 0,
            x: 250,
            y: -300,
            scale: 0.5,
            rotate: -45,
            transition: {
              opacity: {
                duration: 0
              }
            }
          },
          hover: { 
            opacity: 1,
            x: -11,
            y: -27,
            scale: 1,
            rotate: -45,
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 20,
              mass: 0.4,
              delay: 0.1,
              opacity: {
                duration: 0.15,
                ease: "easeOut"
              }
            }
          }
        }}
        onAnimationComplete={(definition) => {
          if (definition === "hover") {
            safelyRunAnimation({
              scale: [1, 0.97, 1.01, 0.99, 1],
              x: [0, -1.5, 0.5, -0.5, 0],
              rotate: [0, -0.3, 0.3, -0.1, 0],
              transition: {
                duration: 0.25,
                times: [0, 0.15, 0.3, 0.5, 1],
                ease: [0.19, 1, 0.22, 1]
              }
            });
          }
        }}
        className="absolute top-0 -right-2 -translate-y-[10%] pointer-events-none"
      >
        <Image
          src="/icons/arrow.png"
          alt="Arrow"
          width={45}
          height={12}
          className="w-16"
          style={{ width: "auto", height: "auto" }}
        />
      </motion.div>
    </motion.div>
  )
} 