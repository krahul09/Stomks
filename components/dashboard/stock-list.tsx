'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addToWatchlist, removeFromWatchlist } from '@/redux/slices/watchlistSlice';

export function StockList() {
  const dispatch = useDispatch();
  const { stocks } = useSelector((state: RootState) => state.stocks);
  const { items: watchlistItems } = useSelector((state: RootState) => state.watchlist);
  
  const isInWatchlist = (symbol: string) => {
    return watchlistItems.some(item => item.symbol === symbol);
  };
  
  const handleWatchlistToggle = (symbol: string, companyName: string) => {
    if (isInWatchlist(symbol)) {
      dispatch(removeFromWatchlist(symbol));
    } else {
      dispatch(addToWatchlist({
        symbol,
        companyName,
        alertEnabled: false
      }));
    }
  };

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Symbol</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Company</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Price</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Change</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Volume</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.symbol} className="border-b hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3 font-medium">
                  <Link href={`/trade?symbol=${stock.symbol}`} className="hover:underline">
                    {stock.symbol}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{stock.companyName}</td>
                <td className="px-4 py-3 text-right">${stock.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end space-x-1">
                    {stock.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={stock.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground">
                  {(stock.volume / 1000000).toFixed(1)}M
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <Link href={`/trade?symbol=${stock.symbol}`}>
                      <Button variant="outline" size="sm">Trade</Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleWatchlistToggle(stock.symbol, stock.companyName)}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          isInWatchlist(stock.symbol)
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}