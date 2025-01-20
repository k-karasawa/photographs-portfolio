export interface RankingItem {
  id: number;
  rank: number;
  title: string;
  imageUrl: string;
}

export interface RankingSection {
  title: string;
  subtitle?: string;
  items: RankingItem[];
}
