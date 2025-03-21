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
} from 'react-icons/gi';
import { MdTextFields } from 'react-icons/md';  // 文字刻印用
import { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';

interface CardProps {
  title: string;
}

export interface CardHandle {
  triggerFlip: () => void;
}

const Card = forwardRef<CardHandle, CardProps>(({ title }, ref) => {
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
      case "インサート": return <GiWeight className="text-3xl text-[#333333]" />;
      case "筈巻": return <GiRibbonShield className="text-3xl text-[#333333]" />;
      case "ラメ加工": return <GiSparkles className="text-3xl text-[#333333]" />;
      case "文字刻印": return <MdTextFields className="text-3xl text-[#333333]" />;
      case "羽中加工": return <GiFeather className="text-3xl text-[#333333]" />;
      case "プチデコ": return <GiStarFormation className="text-3xl text-[#333333]" />;
      case "ZERO流": return <GiPowerLightning className="text-3xl text-[#333333]" />;
      default: return null;
    }
  };

  const playFlipAnimation = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      controls.start({
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
      }).then(() => {
        setIsAnimating(false);
      });
    }
  };

  // ホバー時にアニメーションを開始
  const handleHoverStart = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      controls.start({
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
      }).then(() => {
        setIsAnimating(false);
      });
    }
  };

  // 外部から triggerFlip を呼び出せるようにする
  useImperativeHandle(ref, () => ({
    triggerFlip: playFlipAnimation
  }));

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        y: 20,
        scale: 0.95,
      }}
      whileInView={{ 
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      animate={controls}
      onHoverStart={handleHoverStart}
      className="w-full bg-white rounded-xl shadow-lg perspective-1000 cursor-pointer"
    >
      <div className="relative w-full h-full preserve-3d">
        <div className="w-full p-4 bg-white rounded-xl backface-hidden">
          <div className="flex items-center gap-3">
            {getIcon(title)}
            <span className="text-lg text-[#333333] font-medium">{title}</span>
          </div>
        </div>

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
});

Card.displayName = 'Card';

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
    "ZERO流",
    "筈",
    "矢尻",
    "矢尺",
    "インサート",
    "筈巻",
    "ラメ加工",
    "文字刻印",
    "羽中加工",
    "プチデコ",
  ];

  const cardRefs = useRef<(CardHandle | null)[]>([]);

  // コンポーネントマウント後、ランダムなタイミングでカードのフリップを実行
  useEffect(() => {
    const randomFlip = () => {
      // 3000～5000ミリ秒のランダムな遅延を設定
      const delay = Math.floor(Math.random() * 1500) + 3400;
      setTimeout(() => {
        const randIndex = Math.floor(Math.random() * customItems.length);
        const cardRef = cardRefs.current[randIndex];
        if (cardRef) {
          cardRef.triggerFlip();
        }
        randomFlip();
      }, delay);
    };

    randomFlip();
  }, [customItems.length]);

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-4">
      {customItems.map((item, index) => (
        <Card 
          key={index}
          title={item}
          ref={(el) => { cardRefs.current[index] = el; }}
        />
      ))}
    </div>
  );
};
