import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RankingCard } from './RankingCard';
import { RankingSection as RankingSectionType } from './rankingTypes';

interface RankingSectionProps {
  section: RankingSectionType;
}

export const RankingSection = ({ section }: RankingSectionProps) => {
  return (
    <div className="relative py-4">
      <div className="mb-2">
        <h2 className="text-lg font-bold">{section.title}</h2>
        {section.subtitle && (
          <p className="text-xs text-muted-foreground">{section.subtitle}</p>
        )}
      </div>
      
      <div className="w-full h-px bg-gray-300 mb-4"></div>
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView="auto"
          navigation={{
            nextEl: `.next-${section.title}`,
            prevEl: `.prev-${section.title}`,
          }}
          breakpoints={{
            320: { 
              slidesPerView: "auto",
              slidesPerGroup: 1
            },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="!px-0"
        >
          {section.items.map((item, index) => (
            <SwiperSlide 
              key={item.id} 
              className="!w-auto"
            >
              <RankingCard item={item} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className={`prev-${section.title} absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all disabled:opacity-0`}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          className={`next-${section.title} absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all disabled:opacity-0`}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

