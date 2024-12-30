import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const MIN_DISTANCE_FOR_NEW_IMAGE = 80  // 新しい画像を生成するための最小移動距離
const MAX_MOVE_SPEED = 50

interface ArrowImage {
  id: number
  x: number
  y: number
  initialX: number
  initialY: number
  progress: number
}

const Home: NextPage = () => {
  const [images, setImages] = useState<ArrowImage[]>([])
  const lastMousePos = useRef({ x: 0, y: 0 })
  const accumulatedDistance = useRef(0)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const currentMousePos = { x: e.clientX, y: e.clientY }

    // マウスの移動距離を計算
    const moveDistance = Math.sqrt(
      Math.pow(currentMousePos.x - lastMousePos.current.x, 2) +
      Math.pow(currentMousePos.y - lastMousePos.current.y, 2)
    )

    const normalizedDistance = Math.min(moveDistance, MAX_MOVE_SPEED)

    // 既存の画像のアニメーションを更新
    setImages(prev => prev.map(image => ({
      ...image,
      progress: Math.min(1, image.progress + (normalizedDistance / 300))
    })))

    // 累積距離を更新
    accumulatedDistance.current += moveDistance

    // 十分な距離を移動した場合に新しい画像を生成
    if (accumulatedDistance.current >= MIN_DISTANCE_FOR_NEW_IMAGE) {
      const newImage: ArrowImage = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        initialX: e.clientX,
        initialY: e.clientY,
        progress: 0
      }

      setImages(prev => [...prev.filter(img => img.progress < 1), newImage].slice(-10))
      accumulatedDistance.current = 0  // 累積距離をリセット
    }

    lastMousePos.current = currentMousePos
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Head>
        <title>mokubara. | Realistic Mockups Made Easy</title>
        <meta name="description" content="The easiest way to create amazing mockups" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatePresence>
        {images.map((image) => (
          <motion.div
            key={image.id}
            initial={{
              scale: 0.8,
              opacity: 0,
              x: image.initialX - 75,
              y: image.initialY - 75,
            }}
            animate={{
              scale: 1 - (image.progress * 0.5),
              opacity: 1 - image.progress,
              x: image.initialX - 75,
              y: image.initialY - 75,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 1,
              opacity: {
                duration: 0.15,
                ease: "easeOut"
              },
              scale: {
                duration: 0.15,
                ease: "easeOut"
              }
            }}
            className="fixed pointer-events-none"
          >
            <Image
              src={`/arrows/${Math.floor((image.id % 4) + 1)}.jpg`}
              alt="Arrow image"
              width={150}
              height={150}
              className="w-full h-full object-contain"
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <nav className="absolute top-0 left-0 w-full p-8 z-10">
        <Link href="/" className="text-[#333333] text-xl font-medium">
          mokubara.
        </Link>
      </nav>

      <main className="flex items-center justify-center min-h-screen relative z-10">
        <div className="relative">
          {/* Text Content */}
          <div className="max-w-3xl mx-auto text-center">
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
            <button className="bg-[#C84C38] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-colors">
              Join Waitlist
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
