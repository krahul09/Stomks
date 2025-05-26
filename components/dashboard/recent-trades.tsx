'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { format } from 'date-fns';

export function RecentTrades() {
  const { trades } = useSelector((state: RootState) => state.trades);
  
  const recentTrades = trades.slice(0, 5);

  if (recentTrades.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">No trades yet</p>
        <p className="text-sm text-muted-foreground mt-2">
          Start trading to see your history here
        </p>
      </div>
    );
  }

  return (
    <div className="-mx-4 overflow-y-auto max-h-[290px]">
      <ul className="space-y-2">
        {recentTrades.map((trade) => (
          <li key={trade.id} className="flex flex-col p-2 border-b last:border-b-0">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-medium">{trade.symbol}</span>
                <span className="text-xs text-muted-foreground">{trade.companyName}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className={`font-medium ${trade.action === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                  {trade.action === 'buy' ? 'BUY' : 'SELL'}
                </span>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(trade.timestamp), 'MMM d, h:mm a')}
                </span>
              </div>
            </div>
            <div className="flex justify-between mt-1 text-sm">
              <span>${trade.price.toFixed(2)} × {trade.quantity}</span>
              <span className="font-medium">${trade.totalValue.toFixed(2)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}