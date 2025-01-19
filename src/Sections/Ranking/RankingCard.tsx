import { motion } from 'framer-motion';
import Image from 'next/image';
import { Crown } from 'lucide-react';
import { RankingItem } from './rankingTypes';

interface RankingCardProps {
  item: RankingItem;
  index: number;
}

export const RankingCard = ({ item, index }: RankingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative w-48 overflow-hidden rounded-lg bg-background"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-sm font-bold text-primary">
          <Crown className="h-3 w-3" />
          <span>{item.rank}</span>
        </div>
      </div>
      <div className="p-2">
        <h3 className="text-sm line-clamp-1">{item.title}</h3>
      </div>
    </motion.div>
  );
}
