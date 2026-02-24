export interface MarketInsightRequest {
  market: string;
}

export interface BotLog {
  timestamp: string;
  message: string;
  type: 'info' | 'alert' | 'success' | 'analysis';
}

export interface TradingBot {
  id: string;
  name: string;
  market: string;
  risk: 'Low' | 'Medium' | 'High';
  performance: string;
}