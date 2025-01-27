import { motion } from 'framer-motion'
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


interface CardProps {
  title: string;
}

const Card = ({ title }: CardProps) => {
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

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 mb-4">
      <div className="flex items-center gap-4">
        {getIcon(title)}
        <span className="text-2xl text-[#333333] font-medium">{title}</span>
      </div>
    </div>
  );
};

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

          {/* 右側: 2列のカードグリッド */}
          <div className="h-full flex items-center">
            <div className="grid grid-cols-2 gap-4 w-full">
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
