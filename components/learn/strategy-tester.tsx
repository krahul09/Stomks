'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoIcon, PieChart, ArrowUp, ArrowDown } from 'lucide-react';
import { BacktestChart } from '@/components/learn/backtest-chart';
import { BacktestResult, Strategy } from '@/types/stock';

interface StrategyTesterProps {
  strategy: Strategy;
}

export function StrategyTester({ strategy }: StrategyTesterProps) {
  const { stocks } = useSelector((state: RootState) => state.stocks);
  const [selectedSymbol, setSelectedSymbol] = useState(stocks[0]?.symbol || '');
  const [timeframe, setTimeframe] = useState('1D');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<BacktestResult | null>(null);
  
  const handleRunBacktest = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate mock backtest result
      const mockResult: BacktestResult = {
        strategyId: strategy.id,
        symbol: selectedSymbol,
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date().toISOString(),
        initialCapital: 10000,
        finalCapital: 10000 * (1 + (Math.random() * 0.4 - 0.1)), // -10% to +30%
        returnPercentage: Math.random() * 30 - 5, // -5% to +25%
        trades: Math.floor(Math.random() * 20) + 5, // 5 to 25 trades
        winRate: Math.random() * 0.3 + 0.4, // 40% to 70% win rate
      };
      
      setResult(mockResult);
      setIsLoading(false);
    }, 1500);
  };
  
  const selectedStock = stocks.find(s => s.symbol === selectedSymbol);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Backtest Settings</CardTitle>
          <CardDescription>{strategy.name} Strategy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Stock Symbol</label>
              <select
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
              >
                {stocks.map((stock) => (
                  <option key={stock.symbol} value={stock.symbol}>
                    {stock.symbol} - {stock.companyName}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Timeframe</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {['1D', '1W', '1M', '3M'].map((tf) => (
                  <Button
                    key={tf}
                    variant={timeframe === tf ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimeframe(tf)}
                  >
                    {tf}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Strategy Parameters</label>
              <div className="space-y-2 mt-1">
                {strategy.indicators.map((indicator) => (
                  <div key={indicator} className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <span className="text-sm">{indicator}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-[200px] text-xs">
                              {indicator === 'SMA' && 'Simple Moving Average - average price over a period of time'}
                              {indicator === 'EMA' && 'Exponential Moving Average - weighted average with more emphasis on recent prices'}
                              {indicator === 'RSI' && 'Relative Strength Index - momentum indicator measuring speed and change of price movements'}
                              {indicator === 'MACD' && 'Moving Average Convergence Divergence - trend-following momentum indicator'}
                              {indicator === 'Bollinger Bands' && 'Volatility bands placed above and below a moving average'}
                              {indicator === 'Volume' && 'Trading volume - number of shares traded in a given period'}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <input
                      type="number"
                      className="w-16 h-8 rounded-md border border-input bg-background px-2 py-1 text-sm"
                      defaultValue={
                        indicator === 'SMA' ? '20' :
                        indicator === 'EMA' ? '9' :
                        indicator === 'RSI' ? '14' :
                        '20'
                      }
                      min="1"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              className="w-full mt-4" 
              onClick={handleRunBacktest}
              disabled={isLoading}
            >
              {isLoading ? 'Running Backtest...' : 'Run Backtest'}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Backtest Results</CardTitle>
          <CardDescription>
            {result ? `${strategy.name} on ${selectedSymbol}` : 'Configure and run a backtest to see results'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-[400px]">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-2 text-sm text-muted-foreground">Running backtest...</p>
              </div>
            </div>
          ) : result ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">Return</div>
                  <div className={`text-lg font-bold ${result.returnPercentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {result.returnPercentage >= 0 ? '+' : ''}{result.returnPercentage.toFixed(2)}%
                  </div>
                </div>
                
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">Final Capital</div>
                  <div className="text-lg font-bold">${result.finalCapital.toFixed(2)}</div>
                </div>
                
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">Trades</div>
                  <div className="text-lg font-bold">{result.trades}</div>
                </div>
                
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">Win Rate</div>
                  <div className="text-lg font-bold">{(result.winRate * 100).toFixed(1)}%</div>
                </div>
              </div>
              
              <BacktestChart
                symbol={selectedSymbol}
                strategyName={strategy.name}
                startDate={result.startDate}
                endDate={result.endDate}
              />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Strategy Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  {result.returnPercentage >= 10 ? (
                    `This strategy performed well on ${selectedSymbol} during the tested period, generating a ${result.returnPercentage.toFixed(2)}% return. The win rate of ${(result.winRate * 100).toFixed(1)}% suggests consistent performance.`
                  ) : result.returnPercentage >= 0 ? (
                    `This strategy showed positive results on ${selectedSymbol}, but with a modest ${result.returnPercentage.toFixed(2)}% return. Consider adjusting parameters or testing on different timeframes.`
                  ) : (
                    `This strategy didn't perform well on ${selectedSymbol} during this period, resulting in a ${result.returnPercentage.toFixed(2)}% loss. Try different parameters or stocks.`
                  )}
                </p>
                
                <div className="flex items-center mt-4 gap-2">
                  <Button variant="outline" size="sm">
                    <PieChart className="h-4 w-4 mr-1" />
                    Detailed Report
                  </Button>
                  <Button variant="outline" size="sm">
                    Save Results
                  </Button>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2">Trade Signals</h3>
                <div className="space-y-2">
                  {[...Array(Math.min(5, result.trades))].map((_, i) => {
                    const isWin = Math.random() > 0.5;
                    const date = new Date();
                    date.setDate(date.getDate() - (i * 3 + Math.floor(Math.random() * 3)));
                    
                    return (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          {Math.random() > 0.4 ? (
                            <ArrowUp className={`h-4 w-4 ${isWin ? 'text-green-500' : 'text-red-500'}`} />
                          ) : (
                            <ArrowDown className={`h-4 w-4 ${isWin ? 'text-green-500' : 'text-red-500'}`} />
                          )}
                          <span>{date.toLocaleDateString()}</span>
                        </div>
                        <span className={isWin ? 'text-green-500' : 'text-red-500'}>
                          {isWin ? '+' : '-'}${(Math.random() * 200 + 50).toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[400px] border border-dashed rounded-md">
              <div className="text-center max-w-md px-4">
                <h3 className="text-lg font-medium mb-2">Run a backtest</h3>
                <p className="text-sm text-muted-foreground">
                  Configure your strategy parameters and run a backtest to see how it would have performed historically.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}