import { motion } from 'framer-motion';
import { RankingSection } from './RankingSection';
import { rankingData } from './rankingData';
import { AnimatedTargetButton } from '@/components/AnimatedTargetButton';

export const Ranking: React.FC = () => {
  return (
    <div
      id="ranking"
      className="bg-[#fafafa] relative z-10 overflow-x-clip"
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
            Trending in 2025
          </motion.h2>
          
          <motion.p
            className="mt-4 text-lg text-[#666666] leading-relaxed font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            2025年に注目を集めたカスタマイズ
          </motion.p>
        </motion.div>
        
        <div className="space-y-8">
          {rankingData.map((section) => (
            <RankingSection key={section.title} section={section} />
          ))}
        </div>

        {/* ECサイト誘導セクション */}
        <motion.div
          className="mt-16 md:mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg max-w-3xl mx-auto mb-8">
            <p className="text-xl md:text-2xl text-[#333333] font-normal mb-4 leading-relaxed font-sans">
              気になる組み合わせは見つかりましたか？
            </p>
            <p className="text-base md:text-lg text-[#666666] leading-relaxed font-sans">
              人気のカスタマイズを参考に、<br className="md:hidden" />
              あなただけの一本を作りませんか
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mt-8 text-center"
        >
          <AnimatedTargetButton
            triggerOnScroll={true}
            href="https://sakuya-kyudogu.jp/order_made/"
          >
            オーダーメイドを始める
          </AnimatedTargetButton>
        </motion.div>
      </div>
    </div>
  );
}
