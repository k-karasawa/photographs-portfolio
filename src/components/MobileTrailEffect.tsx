import { useState, useCallback, useEffect, useRef } from 'react'
import { ArrowImage } from '@/types/arrow'

const MIN_DISTANCE_FOR_NEW_IMAGE = 40
const MAX_MOVE_SPEED = 50
const ROTATION_RANGE = 45
const TAP_IMAGE_LIFETIME = 4000
const TOTAL_IMAGES = 28

interface Props {
  setParentImages: React.Dispatch<React.SetStateAction<ArrowImage[]>>
}

export const MobileTrailEffect = ({ setParentImages }: Props) => {
  const [lastTouchPos, setLastTouchPos] = useState({ x: 0, y: 0 })
  const [accumulatedDistance, setAccumulatedDistance] = useState(0)
  const isMoving = useRef(false)

  const handleTouchMove = useCallback((e: TouchEvent) => {
    isMoving.current = true
    const touch = e.touches[0]
    if (!touch) return

    const currentTouchPos = { x: touch.clientX, y: touch.clientY }
    const moveDistance = Math.sqrt(
      Math.pow(currentTouchPos.x - lastTouchPos.x, 2) +
      Math.pow(currentTouchPos.y - lastTouchPos.y, 2)
    )

    const normalizedDistance = Math.min(moveDistance, MAX_MOVE_SPEED)

    setParentImages(prev => prev.map(image => ({
      ...image,
      progress: image.isTapImage 
        ? image.progress 
        : Math.min(1, image.progress + (normalizedDistance / 400))
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
        rotationDirection: Math.random() > 0.5 ? 1 : -1,
        timestamp: Date.now(),
        imageNumber: Math.floor(Math.random() * TOTAL_IMAGES) + 1 // 1-21のランダムな数字を生成
      }

      setParentImages(prev => [...prev.filter(img => img.progress < 1), newImage].slice(-10))
      setAccumulatedDistance(0)
    } else {
      setAccumulatedDistance(newAccumulatedDistance)
    }

    setLastTouchPos(currentTouchPos)
  }, [lastTouchPos, accumulatedDistance, setParentImages])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    isMoving.current = false
    const touch = e.touches[0]
    if (touch) {
      setLastTouchPos({ x: touch.clientX, y: touch.clientY })
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!isMoving.current) {
      const newImage: ArrowImage = {
        id: Date.now(),
        x: lastTouchPos.x,
        y: lastTouchPos.y,
        initialX: lastTouchPos.x,
        initialY: lastTouchPos.y,
        progress: 0,
        rotation: (Math.random() - 0.5) * ROTATION_RANGE,
        rotationDirection: Math.random() > 0.5 ? 1 : -1,
        timestamp: Date.now(),
        isTapImage: true,
        imageNumber: Math.floor(Math.random() * TOTAL_IMAGES) + 1 // 1-21のランダムな数字を生成
      }

      setParentImages(prev => [...prev, newImage])
    }
    isMoving.current = false
    setAccumulatedDistance(0)
  }, [lastTouchPos, setParentImages])

  useEffect(() => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      setParentImages(prev => prev.map(image => {
        if (!image.isTapImage) return image;
        
        const elapsed = Date.now() - image.timestamp;
        const progress = elapsed < 200 
          ? (elapsed / 200) * 0.1  // 最初の10%を0.2秒で
          : 0.1 + (Math.min(elapsed - 200, TAP_IMAGE_LIFETIME - 200) / (TAP_IMAGE_LIFETIME - 200)) * 0.99;  // 残り90%を3.8秒で
        
        // よりなめらかな消失カーブを作成
        const easedProgress = Math.min(1, progress * (1 + Math.pow(progress, 2)));
        
        return {
          ...image,
          progress: Math.min(1, easedProgress)
        };
      }));
    }, 16);

    return () => clearInterval(interval);
  }, [setParentImages]);

  return null
} 