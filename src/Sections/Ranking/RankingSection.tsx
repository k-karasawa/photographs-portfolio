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
      <div className="mb-4">
        <h2 className="text-lg font-bold">{section.title}</h2>
        {section.subtitle && (
          <p className="text-xs text-muted-foreground">{section.subtitle}</p>
        )}
      </div>

      <div className="relative px-4">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={5.4}
          navigation={{
            nextEl: `.next-${section.title}`,
            prevEl: `.prev-${section.title}`,
          }}
          breakpoints={{
            320: { slidesPerView: 1.4 },
            640: { slidesPerView: 2.4 },
            768: { slidesPerView: 3.4 },
            1024: { slidesPerView: 5.4 },
          }}
          className="!px-4"
        >
          {section.items.map((item, index) => (
            <SwiperSlide key={item.id} className="!w-auto">
              <RankingCard item={item} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className={`prev-${section.title} absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all disabled:opacity-0`}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          className={`next-${section.title} absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all disabled:opacity-0`}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

