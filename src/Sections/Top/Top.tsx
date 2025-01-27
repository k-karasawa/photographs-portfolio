import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MobileTrailEffect } from '@/components/MobileTrailEffect'
import { ArrowImage } from '@/types/arrow'
import { PrimaryButton } from '@/components/PrimaryButton'
import { HiOutlineChevronRight, HiOutlineChevronDown } from 'react-icons/hi2'

const MIN_DISTANCE_FOR_NEW_IMAGE = 80
const MAX_MOVE_SPEED = 50
const ROTATION_RANGE = 45

export const Top = () => {
  const [images, setImages] = useState<ArrowImage[]>([])
  const [isClient, setIsClient] = useState(false)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const accumulatedDistance = useRef(0)
  const isMobile = useRef(false)

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== 'undefined') {
      isMobile.current = window.matchMedia('(max-width: 768px)').matches
    }
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // モバイルの場合はマウス操作を無視
    if (isMobile.current) return

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
        rotationDirection: Math.random() > 0.5 ? 1 : -1,
        timestamp: 0,
        imageNumber: Math.floor(Math.random() * 15) + 1
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
        { threshold: 0.1 }
      )

      // 次のセクションを監視
      const nextSection = document.getElementById('next-section')
      if (nextSection) {
        observer.observe(nextSection)
      }

      return () => {
        observer.disconnect()
        document.body.style.overflow = 'auto'
      }
    }
  }, [])

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
              scale: isMobile.current 
                ? (image.isTapImage ? 0.9 : 0.5)
                : 0.6,
              opacity: 0,
              x: image.initialX - (isMobile.current 
                ? (image.isTapImage ? 100 : 60)
                : 75),
              y: image.initialY - (isMobile.current 
                ? (image.isTapImage ? 100 : 60)
                : 75),
              rotate: image.rotation,
              filter: 'blur(1px)'
            }}
            animate={{
              scale: isMobile.current 
                ? (image.isTapImage 
                  ? 1.2 - (image.progress * 0.25)
                  : 0.8 - (image.progress * 0.3))
                : 1 - (image.progress * 0.3),
              opacity: image.isTapImage
                ? Math.max(0, 1 - Math.pow(image.progress, 0.8))
                : 1 - Math.pow(image.progress, 2),
              x: image.initialX - (isMobile.current 
                ? (image.isTapImage ? 100 : 60)
                : 75),
              y: image.initialY - (isMobile.current 
                ? (image.isTapImage ? 100 : 60)
                : 75),
              rotate: image.rotation + (image.progress * (isMobile.current ? 15 : 20) * image.rotationDirection),
              filter: `blur(${Math.max(0, (image.progress - 0.5) * (isMobile.current ? 8 : 16))}px)`
            }}
            transition={{
              type: "spring",
              stiffness: image.isTapImage ? 400 : 500,
              damping: image.isTapImage ? 30 : 25,
              mass: isMobile.current ? 0.6 : 0.8,
              opacity: { 
                duration: image.isTapImage ? 0.1 : 0.2,
                ease: image.isTapImage ? "linear" : "easeOut"  // タップ画像は線形の減衰
              },
              scale: { 
                duration: image.isTapImage ? 0.15 : 0.3,
                ease: [0.23, 1, 0.32, 1]
              },
              rotate: { duration: isMobile.current ? 0.3 : 0.4, ease: "easeOut" },
              filter: { duration: isMobile.current ? 0.15 : 0.2, ease: "easeIn" }
            }}
            className="fixed pointer-events-none"
            style={{
              transformOrigin: 'center center',
              willChange: 'transform, opacity, filter'
            }}
          >
            <Image
              src={`/arrows/${image.imageNumber}.jpg`}
              alt="Arrow image"
              width={isMobile.current 
                ? (image.isTapImage ? 200 : 140)
                : 200}
              height={isMobile.current 
                ? (image.isTapImage ? 200 : 140)
                : 200}
              className={isMobile.current 
                ? (image.isTapImage 
                  ? "w-[200px] h-[200px] object-contain"
                  : "w-[120px] h-[120px] object-contain")
                : "w-full h-full object-contain"}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <nav className="absolute top-0 left-0 w-full p-8 z-10">
        <Link href="/" className="text-[#333333] text-xl font-medium hover:opacity-80 transition-opacity">
          izu-tech presents.
        </Link>
      </nav>

      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="relative">
          <div className="max-w-3xl mx-auto text-left md:text-left px-4">
            <div className="md:max-w-3xl max-w-[280px] mx-auto md:mx-0">
              <h1 className="text-3xl md:text-6xl lg:text-7xl font-normal text-[#333333] leading-tight mb-6 
                text-center md:text-left"
              >
                <span className="whitespace-nowrap">あなたは出会う。</span>
                <br />
                <span className="whitespace-nowrap">ここで、運命の矢と。</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8
                text-center md:text-left"
              >
                Discover your destined arrow,
              </p>

              <div className="relative flex justify-center md:justify-start">
                <PrimaryButton 
                  href="#" 
                  className="hidden md:inline-flex"
                  icon={<HiOutlineChevronRight className="w-6 h-6" />}
                >
                  矢のオーダーメイド　
                </PrimaryButton>

                <motion.div
                  className="md:hidden inline-flex flex-col items-center"
                  whileHover={{ y: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                >
                  <PrimaryButton 
                    onClick={handleNextSection}
                  >
                    オーダーメイドの楽しさ
                  </PrimaryButton>
                  
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
                    onTouchStart={(e) => e.stopPropagation()}
                    onTouchEnd={(e) => e.stopPropagation()}
                  >
                    <HiOutlineChevronDown className="w-6 h-6 text-[#C84C38]" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isClient && (
        isMobile.current ? (
          <MobileTrailEffect setParentImages={setImages} />
        ) : (
          <div className="hidden md:block">
            <MobileTrailEffect setParentImages={setImages} />
          </div>
        )
      )}
    </section>
  )
}
