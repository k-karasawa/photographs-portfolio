import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  GiArrowhead,        // 矢尻用
  GiArrowFlights,     // 筈用
  GiResize,           // 矢尺用
  GiArrowDunk,        // セット本数用
  GiWeight,           // インサート用
  GiRibbonShield,     // 筈巻用
  GiSparkles,         // ラメ加工用
  GiFeather,          // 羽中加工用
  GiPowerLightning,   // ZERO流用
  GiStarFormation     // プチデコ用
} from 'react-icons/gi';
import { MdTextFields } from 'react-icons/md';  // 文字刻印用
import { PrimaryButton } from '@/components/PrimaryButton'
import { HiOutlineAcademicCap } from 'react-icons/hi2'

interface CardProps {
  index: number;
  total: number;
  title: string;
  scrollProgress: number;
}

const Card = ({ index, total, title, scrollProgress }: CardProps) => {
  const getCardShadowColor = (index: number) => {
    const colors = [
      'rgba(255, 0, 0, 0.15)',    // 赤
      'rgba(255, 127, 0, 0.15)',  // オレンジ
      'rgba(255, 255, 0, 0.15)',  // 黄
      'rgba(0, 255, 0, 0.15)',    // 緑
      'rgba(0, 255, 255, 0.15)',  // シアン
      'rgba(0, 127, 255, 0.15)',  // 青
      'rgba(139, 0, 255, 0.15)',  // 紫
      'rgba(255, 0, 255, 0.15)',  // マゼンタ
      'rgba(255, 20, 147, 0.15)', // ピンク
      'rgba(255, 105, 180, 0.15)',// ホットピンク
      'rgba(255, 0, 127, 0.15)'   // ローズ
    ];
    return colors[index % colors.length];
  };

  const getIcon = (title: string) => {
    switch (title) {
      case "筈": return <GiArrowFlights className="text-3xl text-[#333333]" />;
      case "矢尻": return <GiArrowhead className="text-3xl text-[#333333]" />;
      case "矢尺": return <GiResize className="text-3xl text-[#333333]" />;
      case "セット本数": return <GiArrowDunk className="text-3xl text-[#333333]" />;
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

  // 基本の角度を計算（中央を0度として上下に広がるように）
  const baseAngle = (index - (total - 1) / 2) * 22 // 20度ずつ傾ける
  
  // スクロールによる回転を追加
  const rotationAngle = useTransform(
    scrollProgress,
    [0, 1],
    [baseAngle + 15, baseAngle - 15] // 回転範囲を90度に縮小（-45度から+45度）
  )

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        default: {  // 初期表示のアニメーション
          duration: 0.8,
          delay: index * 0.1,
        },
        scale: {    // ホバー時のscaleアニメーション
          duration: 0.3,
          ease: "easeOut",
          delay: 0
        },
        boxShadow: {  // ホバー時のshadowアニメーション
          duration: 0.3,
          ease: "easeOut",
          delay: 0
        }
      }}
      className="absolute w-[80%] h-28 bg-white rounded-xl flex items-center px-10"
      style={{
        rotate: rotationAngle,
        transformOrigin: 'right center',
        right: '20%',
        top: '50%',
        y: `-50%`,
        boxShadow: `0 8px 16px -4px rgba(0, 0, 0, 0.08), 0 2px 6px -2px rgba(0, 0, 0, 0.1)`
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: `0 12px 20px -4px ${getCardShadowColor(index)}, 0 4px 8px -4px rgba(0, 0, 0, 0.1)`
      }}
    >
      <div className="flex items-center gap-4">
        {getIcon(title)}
        <span className="text-2xl text-[#333333] font-medium">{title}</span>
      </div>
    </motion.div>
  )
}

export const Other = () => {
  const containerRef = useRef<HTMLDivElement>(null)
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
    "ZERO流"
  ]

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section 
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-white flex items-center"
    >
      <motion.div 
        style={{ y, opacity }}
        className="relative w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl md:text-5xl lg:text-6xl font-normal text-[#333333] leading-tight font-sans mb-4 whitespace-nowrap"
              >
                その他のカスタマイズ
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-[#666666] leading-relaxed font-sans mb-12"
              >
                見た目だけじゃない、性能にだってこだわれる。
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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

          <div className="relative h-[500px] hidden md:block overflow-visible">
            <div className="absolute inset-0 flex items-center">
              {customItems.map((item, index) => (
                <Card 
                  key={index} 
                  index={index} 
                  total={customItems.length} 
                  title={item}
                  scrollProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
