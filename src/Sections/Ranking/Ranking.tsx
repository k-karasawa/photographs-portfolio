import { RankingSection } from './RankingSection';
import { rankingData } from './rankingData';

export const Ranking: React.FC = () => {
  return (
    <div className="bg-white relative z-10">
      <div className="container mx-auto py-12 px-4 md:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Trending in 2024</h1>
        </div>
        
        <div className="space-y-8">
          {rankingData.map((section) => (
            <RankingSection key={section.title} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
