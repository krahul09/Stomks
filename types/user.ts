export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  joinedAt: string;
}

export interface Position {
  symbol: string;
  companyName: string;
  quantity: number;
  averageBuyPrice: number;
  currentPrice: number;
  value: number;
  pnl: number;
  pnlPercentage: number;
}

export interface PortfolioSummary {
  totalCapital: number;
  availableCapital: number;
  investedCapital: number;
  totalPnL: number;
  todayPnL: number;
  pnlPercentage: number;
  positions: Position[];
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  returnPercentage: number;
  totalTrades: number;
  rank: number;
}