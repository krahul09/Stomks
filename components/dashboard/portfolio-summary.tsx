'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export function PortfolioSummary() {
  const { portfolio } = useSelector((state: RootState) => state.user);
  const { trades } = useSelector((state: RootState) => state.trades);

  const isPositive = portfolio.totalPnL >= 0;
  const totalTrades = trades.length;
  
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Total Account Value</CardTitle>
            <CardDescription>Your total investment portfolio</CardDescription>
          </div>
          <DollarSign className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${portfolio.totalCapital.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
              {isPositive ? '+' : ''}{portfolio.totalPnL.toLocaleString()} ({portfolio.pnlPercentage.toFixed(2)}%)
            </span>
            {' '}from initial capital
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Available Cash</CardTitle>
            <CardDescription>Funds available for trading</CardDescription>
          </div>
          <DollarSign className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${portfolio.availableCapital.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">
            ${portfolio.investedCapital.toLocaleString()} currently invested
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Daily P&L</CardTitle>
            <CardDescription>Today's profit/loss</CardDescription>
          </div>
          {portfolio.todayPnL >= 0 ? (
            <TrendingUp className="h-5 w-5 text-green-500" />
          ) : (
            <TrendingDown className="h-5 w-5 text-red-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${portfolio.todayPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {portfolio.todayPnL >= 0 ? '+' : ''}{portfolio.todayPnL.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {totalTrades} total trades made
          </p>
        </CardContent>
      </Card>
    </>
  );
}