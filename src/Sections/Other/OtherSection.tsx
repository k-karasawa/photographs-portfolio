import { motion } from 'framer-motion';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Other } from './Other';
import { FlipCard } from './FlipCard';
import { useEffect, useState } from 'react';

export const OtherSection = () => {
  const customItems = [
    "プチデコ",
    "セット本数",
    "ラメ加工",
    "筈",
    "矢尻",
    "ZERO流",
    "インサート",
    "文字刻印",
    "筈巻",
    "矢尺",
    "羽中加工",
  ];

  // テキストサイズを画面幅に応じて動的に調整
  const [fontSize, setFontSize] = useState("1rem");
  
  useEffect(() => {
    const updateFontSize = () => {
      const containerWidth = document.querySelector('#subtitle-container')?.clientWidth || 0;
      const textLength = "見た目だけじゃない、性能にだってこだわれる。".length;
      // 文字数と利用可能な幅に基づいてフォントサイズを計算
      const calculatedSize = Math.min(containerWidth / (textLength * 1.8), 1.125);
      setFontSize(`${Math.max(0.75, calculatedSize)}rem`);
    };
    
    updateFontSize();
    window.addEventListener('resize', updateFontSize);
    
    return () => {
      window.removeEventListener('resize', updateFontSize);
    };
  }, []);

  return (
    <section 
      id="other"
      className="relative min-h-screen md:h-screen bg-white py-16 md:py-0 md:flex md:items-center overflow-hidden"
    >
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
          <div className="flex flex-col justify-center mt-8 md:mt-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl md:text-5xl lg:text-6xl font-normal text-[#333333] leading-tight font-sans mb-4 whitespace-nowrap"
              >
                その他のカスタマイズ
              </motion.h2>

              <motion.div 
                id="subtitle-container"
                className="w-full overflow-hidden"
              >
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-[#666666] leading-relaxed font-sans whitespace-nowrap"
                  style={{ fontSize }}
                >
                  見た目だけじゃない、性能にだってこだわれる。
                </motion.p>
              </motion.div>
            </motion.div>

            <div className="md:hidden mb-12">
              <FlipCard />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center md:justify-start"
            >
              <PrimaryButton 
                href="https://sakuya-kyudogu.jp/select_guide"
                target="_blank"
                icon={<HiOutlineAcademicCap className="w-6 h-6" />}
              >
                矢の選び方を学ぶ　
              </PrimaryButton>
            </motion.div>
          </div>

          <div className="hidden md:flex w-full h-full items-center justify-center">
            <Other items={customItems} />
          </div>
        </div>
      </div>
    </section>
  );
}; 