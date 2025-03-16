import { motion } from 'framer-motion';
import { RankingSection } from './RankingSection';
import { rankingData } from './rankingData';

export const Ranking: React.FC = () => {
  return (
    <div 
      id="ranking"
      className="bg-[#fafafa] relative z-10"
      aria-label="人気ランキングセクション"
    >
      <div className="container mx-auto py-24 px-4 md:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md:text-5xl lg:text-6xl font-normal text-[#333333] leading-tight font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Trending in 2024
          </motion.h2>
          
          <motion.p
            className="mt-4 text-lg text-[#666666] leading-relaxed font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            2024年に注目を集めたカスタマイズ
          </motion.p>
        </motion.div>
        
        <div className="space-y-8">
          {rankingData.map((section) => (
            <RankingSection key={section.title} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
