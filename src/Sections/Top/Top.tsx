import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MobileTrailEffect } from '@/components/MobileTrailEffect'

const MIN_DISTANCE_FOR_NEW_IMAGE = 80
const MAX_MOVE_SPEED = 50
const ROTATION_RANGE = 45

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

export const Top = () => {
  const [images, setImages] = useState<ArrowImage[]>([])
  const lastMousePos = useRef({ x: 0, y: 0 })
  const accumulatedDistance = useRef(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const currentMousePos = { x: e.clientX, y: e.clientY }

    const moveDistance = Math.sqrt(
      Math.pow(currentMousePos.x - lastMousePos.current.x, 2) +
      Math.pow(currentMousePos.y - lastMousePos.current.y, 2)
    )

    const normalizedDistance = Math.min(moveDistance, MAX_MOVE_SPEED)

    setImages(prev => prev.map(image => ({
      ...image,
      progress: Math.min(1, image.progress + (normalizedDistance / 400))
    })))

    accumulatedDistance.current += moveDistance

    if (accumulatedDistance.current >= MIN_DISTANCE_FOR_NEW_IMAGE) {
      const newImage: ArrowImage = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        initialX: e.clientX,
        initialY: e.clientY,
        progress: 0,
        rotation: (Math.random() - 0.5) * ROTATION_RANGE,
        rotationDirection: Math.random() > 0.5 ? 1 : -1
      }

      setImages(prev => [...prev.filter(img => img.progress < 1), newImage].slice(-10))
      accumulatedDistance.current = 0
    }

    lastMousePos.current = currentMousePos
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  // スクロール制御を改善
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
      // スクロールを無効化
      document.body.style.overflow = 'hidden'

      // Intersection Observerで次のセクションの監視
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // 次のセクションが表示されたらスクロールを再有効化
              document.body.style.overflow = 'auto'
            } else if (entry.boundingClientRect.top > 0) {
              // Topセクションに戻ってきたらスクロールを無効化
              document.body.style.overflow = 'hidden'
            }
          })
        },
        { threshold: 0.1 } // 10%見えたら発火
      )

      // 次のセクションを監視
      const nextSection = document.getElementById('next-section')
      if (nextSection) {
        observer.observe(nextSection)
      }

      return () => {
        // クリーンアップ
        observer.disconnect()
        document.body.style.overflow = 'auto'
      }
    }
  }, [])

  // 次のセクションへスクロール
  const handleNextSection = () => {
    const nextSection = document.getElementById('next-section')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-screen bg-white overflow-hidden relative">
      <AnimatePresence>
        {images.map((image) => (
          <motion.div
            key={image.id}
            initial={{
              scale: 0.6,
              opacity: 0,
              x: image.initialX - 75,
              y: image.initialY - 75,
              rotate: image.rotation,
              filter: 'blur(2px)'
            }}
            animate={{
              scale: 1 - (image.progress * 0.3),
              opacity: 1 - Math.pow(image.progress, 2),
              x: image.initialX - 75,
              y: image.initialY - 75,
              rotate: image.rotation + (image.progress * 20 * image.rotationDirection),
              filter: `blur(${Math.max(0, (image.progress - 0.5) * 16)}px)`
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 25,
              mass: 0.8,
              opacity: { duration: 0.2, ease: "easeOut" },
              scale: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
              rotate: { duration: 0.4, ease: "easeOut" },
              filter: { duration: 0.2, ease: "easeIn" }
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
              width={200}
              height={200}
              className="w-full h-full object-contain"
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <nav className="absolute top-0 left-0 w-full p-8 z-10">
        <Link href="/" className="text-[#333333] text-xl font-medium hover:opacity-80 transition-opacity">
          mokubara.
        </Link>
      </nav>

      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="relative">
          <div className="max-w-3xl mx-auto text-center px-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal text-[#333333] leading-tight mb-6">
              Realistic Mockups
              <br />
              Made Easy
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto">
              The easiest way to create amazing mockups.
              <br />
              And it works on your browser.
            </p>

            {/* PCとモバイルで異なるボタンを表示 */}
            <div className="relative">
              {/* PC用のボタン */}
              <button className="hidden md:inline-block bg-[#C84C38] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-colors shadow-lg hover:shadow-xl">
                Join Waitlist
              </button>

              {/* モバイル用のボタン */}
              <motion.div
                className="md:hidden inline-flex flex-col items-center"
                whileHover={{ y: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <motion.button
                  onClick={handleNextSection}
                  className="bg-[#C84C38] text-white px-8 py-3 rounded-full shadow-lg relative"
                >
                  Join Waitlist
                </motion.button>
                
                {/* 下矢印のアニメーション */}
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0.5, y: -5 }}
                  animate={{ opacity: 1, y: 5 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1,
                    ease: "easeInOut"
                  }}
                >
                  <svg 
                    className="w-6 h-6 text-[#C84C38]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <MobileTrailEffect />
      </div>

      <MobileTrailEffect />
    </section>
  )
}
