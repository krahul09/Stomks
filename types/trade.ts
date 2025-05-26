export type OrderType = 'market' | 'limit';
export type TradeAction = 'buy' | 'sell';

export interface Trade {
  id: string;
  symbol: string;
  companyName: string;
  action: TradeAction;
  orderType: OrderType;
  quantity: number;
  price: number;
  timestamp: string;
  totalValue: number;
  status?: 'executed' | 'pending' | 'cancelled';
}