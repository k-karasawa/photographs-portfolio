import { motion, useAnimationControls } from 'framer-motion'
import Image from 'next/image'
import { ReactNode, useCallback } from 'react'

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

  // リンクを開く処理を明示的に定義
  const openLink = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    // デフォルトの動作を防止
    e.preventDefault();
    
    // イベントの伝播を停止
    e.stopPropagation();
    
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
  }, [href, onClick, target]);

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
          controls.start("initial")
        }
      }}
    >
      <motion.button
        onClick={openLink}
        onTouchEnd={openLink}
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
            controls.start({
              scale: [1, 0.97, 1.01, 0.99, 1],
              x: [0, -1.5, 0.5, -0.5, 0],
              rotate: [0, -0.3, 0.3, -0.1, 0],
              transition: {
                duration: 0.25,
                times: [0, 0.15, 0.3, 0.5, 1],
                ease: [0.19, 1, 0.22, 1]
              }
            })
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