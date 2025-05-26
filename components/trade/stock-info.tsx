'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stock } from '@/types/stock';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, DollarSign, BarChart3, Users, Star, Building } from 'lucide-react';
import { addToWatchlist, removeFromWatchlist } from '@/redux/slices/watchlistSlice';
import { RootState } from '@/redux/store';

interface StockInfoProps {
  stock: Stock;
}

export function StockInfo({ stock }: StockInfoProps) {
  const dispatch = useDispatch();
  const { items: watchlistItems } = useSelector((state: RootState) => state.watchlist);
  
  const isInWatchlist = watchlistItems.some(item => item.symbol === stock.symbol);
  
  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(stock.symbol));
    } else {
      dispatch(addToWatchlist({
        symbol: stock.symbol,
        companyName: stock.companyName,
        alertEnabled: false
      }));
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{stock.symbol}</h2>
              <span className="text-muted-foreground">{stock.companyName}</span>
            </div>
            <div className="flex items-center mt-1">
              <span className="text-3xl font-bold mr-2">${stock.price.toFixed(2)}</span>
              <div className={`flex items-center ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stock.change >= 0 ? (
                  <ArrowUpRight className="h-5 w-5 mr-1" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 mr-1" />
                )}
                <span className="font-medium">
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
          
          <Button
            variant={isInWatchlist ? "default" : "outline"}
            onClick={handleWatchlistToggle}
            className="flex items-center gap-1"
          >
            <Star className={`h-4 w-4 ${isInWatchlist ? 'fill-primary-foreground' : ''}`} />
            {isInWatchlist ? 'Watchlisted' : 'Add to Watchlist'}
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center text-muted-foreground text-sm">
              <DollarSign className="h-4 w-4 mr-1" />
              <span>Market Cap</span>
            </div>
            <span className="font-medium">
              ${(stock.marketCap / 1000000000).toFixed(2)}B
            </span>
          </div>
          
          <div className="flex flex-col gap-1">
            <div className="flex items-center text-muted-foreground text-sm">
              <BarChart3 className="h-4 w-4 mr-1" />
              <span>Volume</span>
            </div>
            <span className="font-medium">
              {(stock.volume / 1000000).toFixed(1)}M
            </span>
          </div>
          
          <div className="flex flex-col gap-1">
            <div className="flex items-center text-muted-foreground text-sm">
              <Building className="h-4 w-4 mr-1" />
              <span>Sector</span>
            </div>
            <span className="font-medium">
              {stock.sector}
            </span>
          </div>
          
          <div className="flex flex-col gap-1">
            <div className="flex items-center text-muted-foreground text-sm">
              <Users className="h-4 w-4 mr-1" />
              <span>P/E Ratio</span>
            </div>
            <span className="font-medium">
              {(Math.random() * 30 + 10).toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}