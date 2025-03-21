import Image from 'next/image';
import { Crown } from 'lucide-react';
import { RankingItem } from './rankingTypes';

interface RankingCardProps {
  item: RankingItem;
  index: number;
}

export const RankingCard = ({ item, index }: RankingCardProps) => {
  return (
    <div className="flex flex-col w-48 md:w-64">
      <div className="relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md 
        transition-all duration-200 ease-in-out
        hover:shadow-lg hover:-translate-y-0.5"
      >
        <div className="relative aspect-[16/9]">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 left-2 flex items-center gap-1.5 rounded-full 
            bg-white/95 backdrop-blur-sm px-2.5 py-1 text-sm font-bold text-gray-800
            shadow-sm"
          >
            <Crown className="h-3 w-3 md:h-4 md:w-4 text-gray-700" />
            <span className="md:text-base">{index + 1}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-2 md:mt-3">
        <h3 className="text-sm md:text-base font-bold line-clamp-1 text-gray-800">
          {item.title}
        </h3>
      </div>
    </div>
  );
}
