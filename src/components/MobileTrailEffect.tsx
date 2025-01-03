import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface ArrowImage {
  id: number
  x: number
  y: number
  initialX: number
  initialY: number
  progress: number
  rotation: number
  rotationDirection: number
}

const MIN_DISTANCE_FOR_NEW_IMAGE = 40  // モバイルでは少し短めに
const MAX_MOVE_SPEED = 50
const ROTATION_RANGE = 45

export const MobileTrailEffect = () => {
  const [images, setImages] = useState<ArrowImage[]>([])
  const [lastTouchPos, setLastTouchPos] = useState({ x: 0, y: 0 })
  const [accumulatedDistance, setAccumulatedDistance] = useState(0)

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]
    if (!touch) return

    const currentTouchPos = { x: touch.clientX, y: touch.clientY }

    const moveDistance = Math.sqrt(
      Math.pow(currentTouchPos.x - lastTouchPos.x, 2) +
      Math.pow(currentTouchPos.y - lastTouchPos.y, 2)
    )

    const normalizedDistance = Math.min(moveDistance, MAX_MOVE_SPEED)

    setImages(prev => prev.map(image => ({
      ...image,
      progress: Math.min(1, image.progress + (normalizedDistance / 400))
    })))

    const newAccumulatedDistance = accumulatedDistance + moveDistance

    if (newAccumulatedDistance >= MIN_DISTANCE_FOR_NEW_IMAGE) {
      const newImage: ArrowImage = {
        id: Date.now(),
        x: touch.clientX,
        y: touch.clientY,
        initialX: touch.clientX,
        initialY: touch.clientY,
        progress: 0,
        rotation: (Math.random() - 0.5) * ROTATION_RANGE,
        rotationDirection: Math.random() > 0.5 ? 1 : -1
      }

      setImages(prev => [...prev.filter(img => img.progress < 1), newImage].slice(-10))
      setAccumulatedDistance(0)
    } else {
      setAccumulatedDistance(newAccumulatedDistance)
    }

    setLastTouchPos(currentTouchPos)
  }, [lastTouchPos, accumulatedDistance])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]
    if (touch) {
      setLastTouchPos({ x: touch.clientX, y: touch.clientY })
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    setAccumulatedDistance(0)
  }, [])

  useEffect(() => {
    // モバイルデバイスの場合のみイベントリスナーを追加
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
      document.addEventListener('touchmove', handleTouchMove)
      document.addEventListener('touchstart', handleTouchStart)
      document.addEventListener('touchend', handleTouchEnd)

      return () => {
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchstart', handleTouchStart)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [handleTouchMove, handleTouchStart, handleTouchEnd])

  return (
    <div className="fixed inset-0 pointer-events-none md:hidden">
      <AnimatePresence>
        {images.map((image) => (
          <motion.div
            key={image.id}
            initial={{
              scale: 0.5,
              opacity: 0,
              x: image.initialX - 60,
              y: image.initialY - 60,
              rotate: image.rotation,
              filter: 'blur(1px)'
            }}
            animate={{
              scale: 0.8 - (image.progress * 0.2),
              opacity: 1 - Math.pow(image.progress, 2),
              x: image.initialX - 60,
              y: image.initialY - 60,
              rotate: image.rotation + (image.progress * 15 * image.rotationDirection),
              filter: `blur(${Math.max(0, (image.progress - 0.5) * 8)}px)`
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 25,
              mass: 0.6,
              opacity: { duration: 0.15, ease: "easeOut" },
              scale: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
              rotate: { duration: 0.3, ease: "easeOut" },
              filter: { duration: 0.15, ease: "easeIn" }
            }}
            className="fixed pointer-events-none"
            style={{
              transformOrigin: 'center center',
              willChange: 'transform, opacity, filter'
            }}
          >
            <Image
              src={`/arrows/${Math.floor((image.id % 4) + 1)}.jpg`}
              alt="Arrow image"
              width={140}
              height={140}
              className="w-[120px] h-[120px] object-contain"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
} 