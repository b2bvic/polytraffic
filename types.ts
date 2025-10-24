
export type Outcome = 'UP' | 'DOWN';

export interface Market {
  id: string;
  websiteName: string;
  websiteUrl: string;
  faviconUrl: string;
  description: string;
  historicalData: { month: string; traffic: number }[];
  sharesUp: number;
  sharesDown: number;
}

export interface GeminiAnalysis {
    analysis: string;
    prediction: 'INCREASING' | 'DECREASING' | 'NEUTRAL';
}
