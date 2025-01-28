import { motion, useAnimationControls } from 'framer-motion'
import { 
  GiArrowhead,        // 矢尻用
  GiArrowFlights,     // 筈用
  GiResize,           // 矢尺用
  GiWeight,           // インサート用
  GiRibbonShield,     // 筈巻用
  GiSparkles,         // ラメ加工用
  GiFeather,          // 羽中加工用
  GiPowerLightning,   // ZERO流用
  GiStarFormation,    // プチデコ用
  GiFleurDeLys        // 家紋用
} from 'react-icons/gi';
import { MdTextFields } from 'react-icons/md';  // 文字刻印用
import { PrimaryButton } from '@/components/PrimaryButton'
import { HiOutlineAcademicCap } from 'react-icons/hi2'
import { RiSortNumberAsc } from "react-icons/ri";
import { useState } from 'react';


interface CardProps {
  title: string;
}

const Card = ({ title }: CardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimationControls();

  const getCardShadowColor = (title: string) => {
    const colorMap: { [key: string]: string } = {
      "筈": 'rgba(255, 0, 0, 0.15)',      // 赤
      "矢尻": 'rgba(255, 127, 0, 0.15)',  // オレンジ
      "矢尺": 'rgba(255, 255, 0, 0.15)',  // 黄
      "セット本数": 'rgba(0, 255, 0, 0.15)',    // 緑
      "インサート": 'rgba(0, 255, 255, 0.15)',  // シアン
      "筈巻": 'rgba(0, 127, 255, 0.15)',  // 青
      "ラメ加工": 'rgba(139, 0, 255, 0.15)',  // 紫
      "文字刻印": 'rgba(255, 0, 255, 0.15)',  // マゼンタ
      "羽中加工": 'rgba(255, 20, 147, 0.15)', // ピンク
      "プチデコ": 'rgba(255, 105, 180, 0.15)', // ホットピンク
      "ZERO流": 'rgba(255, 0, 127, 0.15)',   // ローズ
      "家紋": 'rgba(147, 112, 219, 0.15)',   // ラベンダー
    };
    return colorMap[title] || 'rgba(0, 0, 0, 0.15)';
  };

  const getIcon = (title: string) => {
    switch (title) {
      case "筈": return <GiArrowFlights className="text-3xl text-[#333333]" />;
      case "矢尻": return <GiArrowhead className="text-3xl text-[#333333]" />;
      case "矢尺": return <GiResize className="text-3xl text-[#333333]" />;
      case "セット本数": return <RiSortNumberAsc className="text-3xl text-[#333333]" />;
      case "インサート": return <GiWeight className="text-3xl text-[#333333]" />;
      case "筈巻": return <GiRibbonShield className="text-3xl text-[#333333]" />;
      case "ラメ加工": return <GiSparkles className="text-3xl text-[#333333]" />;
      case "文字刻印": return <MdTextFields className="text-3xl text-[#333333]" />;
      case "羽中加工": return <GiFeather className="text-3xl text-[#333333]" />;
      case "プチデコ": return <GiStarFormation className="text-3xl text-[#333333]" />;
      case "ZERO流": return <GiPowerLightning className="text-3xl text-[#333333]" />;
      case "家紋": return <GiFleurDeLys className="text-3xl text-[#333333]" />;
      default: return null;
    }
  };

  const handleHoverStart = async () => {
    if (!isAnimating) {
      setIsAnimating(true);
      await controls.start({
        y: [0, -15, -15, 0],
        rotateX: [0, 0, 360, 360],
        scale: [1, 1.05, 1.05, 1],
        boxShadow: [
          '0 8px 16px -4px rgba(0, 0, 0, 0.1), 0 2px 6px -2px rgba(0, 0, 0, 0.1)',
          `0 12px 20px -4px ${getCardShadowColor(title)}, 0 4px 8px -4px rgba(0, 0, 0, 0.1)`,
          `0 12px 20px -4px ${getCardShadowColor(title)}, 0 4px 8px -4px rgba(0, 0, 0, 0.1)`,
          '0 8px 16px -4px rgba(0, 0, 0, 0.1), 0 2px 6px -2px rgba(0, 0, 0, 0.1)'
        ],
        transition: {
          duration: 1.2,
          times: [0, 0.25, 0.5, 0.7],
          ease: "easeInOut",
        }
      });
      setIsAnimating(false);
    }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        y: 20,
        scale: 0.95,
        boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1), 0 2px 6px -2px rgba(0, 0, 0, 0.1)'
      }}
      whileInView={{ 
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.8,
          ease: "easeOut",
          delay: 0.2
        }
      }}
      viewport={{ 
        amount: 0.8
      }}
      animate={controls}
      onHoverStart={handleHoverStart}
      className="w-full bg-white rounded-xl shadow-lg perspective-1000 cursor-pointer"
    >
      <div className="relative w-full h-full preserve-3d">
        {/* 表面 */}
        <div className="w-full p-6 bg-white rounded-xl backface-hidden">
          <div className="flex items-center gap-4">
            {getIcon(title)}
            <span className="text-2xl text-[#333333] font-medium">{title}</span>
          </div>
        </div>

        {/* 裏面 */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl"
          style={{ transform: 'rotateX(180deg)' }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-white/20 rounded-full" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// グローバルスタイルを追加
const styles = `
  .perspective-1000 {
    perspective: 1000px;
  }
  .preserve-3d {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
`;

// スタイルをheadに追加
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export const FlipCard = () => {
  const customItems = [
    "筈",
    "矢尻",
    "矢尺",
    "セット本数",
    "インサート",
    "筈巻",
    "ラメ加工",
    "文字刻印",
    "羽中加工",
    "プチデコ",
    "ZERO流",
    "家紋"
  ];

  return (
    <section className="relative h-screen bg-white flex items-center">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
          <div className="flex flex-col justify-center">
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

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-[#666666] leading-relaxed font-sans mb-12"
              >
                見た目だけじゃない、性能にだってこだわれる。
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <PrimaryButton 
                  href="/customize"
                  icon={<HiOutlineAcademicCap className="w-6 h-6" />}
                >
                  矢の選び方を学ぶ　
                </PrimaryButton>
              </motion.div>
            </motion.div>
          </div>

          {/* 右側: 2列のカードグリッド */}
          <div className="h-full flex items-center">
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 w-full">
              {customItems.map((item, index) => (
                <Card 
                  key={index}
                  title={item}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
