export interface PricePoint {
  time: string;
  price: number;
  volume?: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
}

export interface Stock {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  sector: string;
  priceHistory: PricePoint[];
}

export interface StockPriceUpdate {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface WatchlistItem {
  symbol: string;
  companyName: string;
  alertEnabled: boolean;
  alertPrice?: number;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  indicators: string[];
  timeframe: string;
}

export interface BacktestResult {
  strategyId: string;
  symbol: string;
  startDate: string;
  endDate: string;
  initialCapital: number;
  finalCapital: number;
  returnPercentage: number;
  trades: number;
  winRate: number;
}