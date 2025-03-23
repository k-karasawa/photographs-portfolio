import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { GalleryImage } from './galleryData'
import { AnimatedTargetButton } from '@/components/AnimatedTargetButton'
import { useEffect, useCallback, useRef, useState } from 'react'

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
  image: GalleryImage | null
}

export const GalleryModal = ({ isOpen, onClose, image }: GalleryModalProps) => {
  // 重複実行を防ぐためのフラグ
  const isProcessingRef = useRef(false);
  // タッチデバイスかどうかのフラグ
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // 画像のプリロード用の状態
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  
  // クライアントサイドでのみタッチデバイス検出を行う
  useEffect(() => {
    setIsTouchDevice(
      typeof window !== 'undefined' && 
      ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    );
  }, []);

  // ボタンで使用される画像をプリロード
  useEffect(() => {
    if (isOpen && !imagesPreloaded) {
      const targetImage = new window.Image();
      targetImage.src = '/icons/target.png';
      
      const arrowImage = new window.Image();
      arrowImage.src = '/icons/arrow.png';
      
      Promise.all([
        new Promise(resolve => { targetImage.onload = resolve; }),
        new Promise(resolve => { arrowImage.onload = resolve; })
      ]).then(() => {
        setImagesPreloaded(true);
      });
    }
  }, [isOpen, imagesPreloaded]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // 背景クリックでモーダルを閉じる関数
  const handleBackgroundClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    // デフォルトの動作を防止
    e.preventDefault();
    
    // イベントの伝播を停止
    e.stopPropagation();
    
    // 既に処理中なら何もしない
    if (isProcessingRef.current) return;
    
    // 処理中フラグを立てる
    isProcessingRef.current = true;
    
    // モーダルを閉じる
    onClose();
    
    // 少し遅延してフラグをリセット（次のタップのため）
    setTimeout(() => {
      isProcessingRef.current = false;
    }, 300);
  }, [onClose]);

  // 閉じるボタンのクリックハンドラ
  const handleCloseButtonClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    // デフォルトの動作を防止
    e.preventDefault();
    
    // イベントの伝播を停止
    e.stopPropagation();
    
    // 既に処理中なら何もしない
    if (isProcessingRef.current) return;
    
    // 処理中フラグを立てる
    isProcessingRef.current = true;
    
    // モーダルを閉じる
    onClose();
    
    // 少し遅延してフラグをリセット（次のタップのため）
    setTimeout(() => {
      isProcessingRef.current = false;
    }, 300);
  }, [onClose]);
  
  // タッチデバイスの場合はonClickを無効化し、onTouchEndのみを使用
  const clickHandler = isTouchDevice ? undefined : handleBackgroundClick;
  const touchEndHandler = isTouchDevice ? handleBackgroundClick : undefined;
  
  const closeButtonClickHandler = isTouchDevice ? undefined : handleCloseButtonClick;
  const closeButtonTouchEndHandler = isTouchDevice ? handleCloseButtonClick : undefined;

  // コンテンツ部分のクリック伝播を防止
  const handleContentClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <AnimatePresence>
      {isOpen && image && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={clickHandler}
            onTouchEnd={touchEndHandler}
            className="fixed inset-0 bg-black/70 z-50 cursor-pointer"
            style={{ touchAction: 'manipulation' }}
          />
          
          {/* モバイル表示用のモーダル */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ 
              type: "spring", 
              damping: 30,
              stiffness: 200,
              mass: 0.8,
              duration: 0.5
            }}
            className="fixed inset-x-0 bottom-0 z-50 flex items-end justify-center md:hidden"
            onClick={clickHandler}
            onTouchEnd={touchEndHandler}
            style={{ touchAction: 'manipulation' }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white w-full max-w-3xl overflow-y-auto flex flex-col gap-4 p-4 rounded-t-2xl"
              style={{ maxHeight: '80vh', marginTop: 'auto', touchAction: 'manipulation' }}
              onClick={handleContentClick}
              onTouchEnd={handleContentClick}
            >
              <div className="sticky top-0 right-0 z-50 flex items-center justify-center w-full">
                <div className="h-1 w-16 bg-gray-300 rounded-full mx-auto mb-3" />
                <button
                  onClick={closeButtonClickHandler}
                  onTouchEnd={closeButtonTouchEndHandler}
                  className="absolute right-2 top-0 bg-gray-200 rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors active:bg-gray-300"
                  aria-label="閉じる"
                  style={{ touchAction: 'manipulation' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="w-full pt-8">
                <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="w-full">
                <h3 className="text-lg font-bold mb-2 text-gray-800">{image.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{image.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div>
                    <h4 className="font-bold text-sm text-gray-800 mb-1">種目</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium">近的</span>
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-sm text-gray-800 mb-1">構成内容</h4>
                    <div className="space-y-1 text-sm">
                      <div className="text-gray-600 flex">
                        <span className="font-medium w-24">シャフト</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.shaft}</span>
                      </div>
                      <div className="text-gray-600 flex">
                        <span className="font-medium w-24">羽根</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.fletching}</span>
                      </div>
                      <div className="text-gray-600 flex">
                        <span className="font-medium w-24">和紙</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.paper}</span>
                      </div>
                      <div className="text-gray-600 flex">
                        <span className="font-medium w-24">毛引</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.furubiki}</span>
                      </div>
                      <div className="text-gray-600 flex">
                        <span className="font-medium w-24">羽中加工</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.featherProcess}</span>
                      </div>
                      <div className="text-gray-600 flex">
                        <span className="font-medium w-24">プチデコ</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.decoration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center pt-3 border-t border-gray-200">
                  <div className="mb-4 min-h-[60px] flex items-center justify-center w-full">
                    <AnimatedTargetButton
                      href={image.orderUrl || "https://sakuya-kyudogu.jp/order_made/kinteki/full/parts"}
                      target="_blank"
                      onClick={onClose}
                      className="scale-75"
                      triggerOnScroll={true}
                    >
                      この矢を作ってみる
                    </AnimatedTargetButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* PC表示用のモーダル */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 hidden md:flex items-center justify-center"
            onClick={clickHandler}
            onTouchEnd={touchEndHandler}
            style={{ touchAction: 'manipulation' }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white max-w-3xl overflow-visible flex flex-row gap-4 p-6 rounded-lg"
              style={{ maxHeight: '90vh', minWidth: '800px', touchAction: 'manipulation' }}
              onClick={handleContentClick}
              onTouchEnd={handleContentClick}
            >
              <div className="absolute -top-4 -right-4">
                <button
                  onClick={closeButtonClickHandler}
                  onTouchEnd={closeButtonTouchEndHandler}
                  className="bg-gray-200 rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors active:bg-gray-300"
                  aria-label="閉じる"
                  style={{ touchAction: 'manipulation' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="w-[55%]">
                <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="w-[45%]">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{image.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{image.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="font-bold text-sm text-gray-800 mb-1">種目</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium">近的</span>
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-sm text-gray-800 mb-1">構成内容</h4>
                    <div className="space-y-1 text-sm">
                      <div className="text-gray-600 flex">
                        <span className="font-medium w-24">シャフト</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.shaft}</span>
                      </div>
                      <div className="text-gray-600 flex">
                        <span className="font-medium w-24">羽根</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.fletching}</span>
                      </div>
                      <div className="text-gray-600 flex">
                        <span className="font-medium w-24">糸/和紙</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.paper}</span>
                      </div>
                      <div className="text-gray-600 flex">
                        <span className="font-medium w-24">毛引</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.furubiki}</span>
                      </div>
                      <div className="text-gray-600 flex">
                        <span className="font-medium w-24">羽中加工</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.featherProcess}</span>
                      </div>
                      <div className="text-gray-600 flex">
                        <span className="font-medium w-24">プチデコ</span>
                        <span className="mx-1">:</span>
                        <span>{image.specs.material.decoration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center pt-3 border-t border-gray-200">
                  <div className="flex justify-center w-full min-w-[280px] mt-14">
                    <AnimatedTargetButton
                      href={image.orderUrl || "https://sakuya-kyudogu.jp/order_made/kinteki/full/parts"}
                      target="_blank"
                      onClick={onClose}
                      className="scale-75"
                      triggerOnScroll={true}
                    >
                      この矢を作ってみる
                    </AnimatedTargetButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}