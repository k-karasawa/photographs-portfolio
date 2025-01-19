import { RankingSection } from './RankingSection';
import { rankingData } from './rankingData';

export const Ranking: React.FC = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold px-4">Ranking</h1>
      </div>
      
      <div className="space-y-8">
        {rankingData.map((section) => (
          <RankingSection key={section.title} section={section} />
        ))}
      </div>
    </div>
  );
}
