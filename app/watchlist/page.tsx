'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RootState } from '@/redux/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Bell, BellOff, X, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { WatchlistAlertModal } from '@/components/watchlist/watchlist-alert-modal';
import { removeFromWatchlist, toggleAlert } from '@/redux/slices/watchlistSlice';

export default function WatchlistPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.watchlist);
  const { stocks } = useSelector((state: RootState) => state.stocks);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);
  
  const handleRemoveFromWatchlist = (symbol: string) => {
    dispatch(removeFromWatchlist(symbol));
  };
  
  const handleToggleAlert = (symbol: string, enabled: boolean) => {
    dispatch(toggleAlert({ symbol, enabled }));
  };
  
  const getStockDetails = (symbol: string) => {
    return stocks.find(stock => stock.symbol === symbol);
  };
  
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Watchlist</h1>
        <p className="text-muted-foreground">
          Track your favorite stocks and set price alerts.
        </p>
      </div>
      
      <div className="mt-6">
        {items.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="text-center space-y-3">
                <h3 className="text-lg font-medium">Your watchlist is empty</h3>
                <p className="text-muted-foreground">
                  Add stocks to your watchlist to track them easily
                </p>
                <Link href="/trade">
                  <Button>Browse Stocks</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const stockDetails = getStockDetails(item.symbol);
              return (
                <Card key={item.symbol} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{item.symbol}</CardTitle>
                        <CardDescription>{item.companyName}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFromWatchlist(item.symbol)}
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      {stockDetails ? (
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold">
                            ${stockDetails.price.toFixed(2)}
                          </span>
                          <div className={`flex items-center ${stockDetails.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {stockDetails.change >= 0 ? (
                              <ArrowUpRight className="h-4 w-4 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 mr-1" />
                            )}
                            <span>
                              {stockDetails.change >= 0 ? '+' : ''}{stockDetails.change.toFixed(2)} ({stockDetails.changePercent.toFixed(2)}%)
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="h-8 animate-pulse bg-muted rounded"></div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                            onClick={() => handleToggleAlert(item.symbol, !item.alertEnabled)}
                          >
                            {item.alertEnabled ? (
                              <>
                                <Bell className="h-4 w-4 mr-1 fill-primary text-primary" />
                                <span className="text-xs">Alert On</span>
                              </>
                            ) : (
                              <>
                                <BellOff className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span className="text-xs">Set Alert</span>
                              </>
                            )}
                          </Button>
                        </div>
                        <WatchlistAlertModal
                          item={item}
                          currentPrice={stockDetails?.price || 0}
                        />
                        <Link href={`/trade?symbol=${item.symbol}`}>
                          <Button variant="outline" size="sm">
                            Trade
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}