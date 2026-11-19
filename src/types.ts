export interface Plan {
  name: string;
  price: number;
  period: string;
  trafficGb: number;
  unitPricePerGb: number;
  note: string;
}

export interface Airport {
  id: string;
  rank: number;
  name: string;
  slug: string;
  description: string;
  officialUrl: string;
  affiliateUrl: string;
  startingPrice: number;
  currency: string;
  plans: Plan[];
  protocols: string[];
  regions: string[];
  deviceLimit: string;
  aiSupport: string[];
  streamingSupport: string[];
  coupon?: string;
  advantages: string[];
  disadvantages: string[];
  suitableFor: string[];
  sources: string[];
  lastVerified: string;
  testStatus: "tested" | "official-data" | "unverified";
  overallScore: number;
  speedScore: number;
  stabilityScore: number;
  valueScore: number;
}

export interface Guide {
  slug: string;
  platform: string;
  platformBadge: string;
  title: string;
  h1: string;
  keywords: string;
  desc: string;
  content: string;
}

export interface Article {
  slug: string;
  category: string;
  categoryBadge: string;
  title: string;
  h1: string;
  keywords: string;
  desc: string;
  content: string;
}
