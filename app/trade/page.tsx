'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { RootState } from '@/redux/store';
import { selectStock, updateStockPrice } from '@/redux/slices/stockSlice';
import { addTrade, placeLimitOrder } from '@/redux/slices/tradeSlice';
import { updatePortfolio } from '@/redux/slices/userSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { simulateStockPriceChange } from '@/utils/mockData';
import { StockChart } from '@/components/trade/stock-chart';
import { TradeForm } from '@/components/trade/trade-form';
import { StockInfo } from '@/components/trade/stock-info';
import { useToast } from '@/hooks/use-toast';

export default function TradePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { toast } = useToast();
  
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { stocks, selectedStock } = useSelector((state: RootState) => state.stocks);
  const { portfolio } = useSelector((state: RootState) => state.user);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);
  
  // Set selected stock from URL param
  useEffect(() => {
    const symbol = searchParams.get('symbol');
    if (symbol && stocks.some(s => s.symbol === symbol)) {
      dispatch(selectStock(symbol));
    } else if (stocks.length > 0 && !selectedStock) {
      dispatch(selectStock(stocks[0].symbol));
    }
  }, [searchParams, stocks, selectedStock, dispatch]);
  
  // Simulate stock price changes
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedStock) {
        const updatedStock = simulateStockPriceChange(selectedStock);
        dispatch(updateStockPrice({
          symbol: updatedStock.symbol,
          price: updatedStock.price,
          change: updatedStock.change,
          changePercent: updatedStock.changePercent
        }));
      }
    }, 3000); // Update every 3 seconds
    
    return () => clearInterval(interval);
  }, [selectedStock, dispatch]);
  
  const handleTrade = (values: any) => {
    const { action, orderType, quantity, price } = values;
    
    if (!selectedStock) {
      toast({
        title: "Error",
        description: "No stock selected",
        variant: "destructive",
      });
      return;
    }
    
    const tradePrice = orderType === 'market' ? selectedStock.price : price;
    const totalValue = tradePrice * quantity;
    
    // Validate if user has enough funds for buying
    if (action === 'buy' && totalValue > portfolio.availableCapital) {
      toast({
        title: "Insufficient funds",
        description: `You need $${totalValue.toFixed(2)} but only have $${portfolio.availableCapital.toFixed(2)} available`,
        variant: "destructive",
      });
      return;
    }
    
    // Process market order immediately
    if (orderType === 'market') {
      // Add trade
      dispatch(addTrade({
        symbol: selectedStock.symbol,
        companyName: selectedStock.companyName,
        action,
        orderType,
        quantity,
        price: tradePrice,
        timestamp: new Date().toISOString(),
        totalValue,
        status: 'executed'
      }));
      
      // Update portfolio
      if (action === 'buy') {
        dispatch(updatePortfolio({
          availableCapital: portfolio.availableCapital - totalValue,
          investedCapital: portfolio.investedCapital + totalValue,
        }));
      } else {
        dispatch(updatePortfolio({
          availableCapital: portfolio.availableCapital + totalValue,
          investedCapital: Math.max(0, portfolio.investedCapital - totalValue),
        }));
      }
      
      toast({
        title: "Trade executed",
        description: `Successfully ${action === 'buy' ? 'bought' : 'sold'} ${quantity} shares of ${selectedStock.symbol} at $${tradePrice.toFixed(2)}`,
      });
    } 
    // Place limit order
    else {
      dispatch(placeLimitOrder({
        symbol: selectedStock.symbol,
        companyName: selectedStock.companyName,
        action,
        orderType,
        quantity,
        price,
        timestamp: new Date().toISOString(),
        totalValue,
        status: 'pending'
      }));
      
      // Reserve funds for buy orders
      if (action === 'buy') {
        dispatch(updatePortfolio({
          availableCapital: portfolio.availableCapital - totalValue,
        }));
      }
      
      toast({
        title: "Order placed",
        description: `Limit order to ${action} ${quantity} shares of ${selectedStock.symbol} at $${price.toFixed(2)} has been placed`,
      });
    }
  };
  
  if (!isAuthenticated || !selectedStock) {
    return null;
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Trade</h1>
        <p className="text-muted-foreground">
          Execute trades in real-time with market and limit orders.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <StockInfo stock={selectedStock} />
          
          <Card>
            <CardHeader>
              <CardTitle>Price Chart</CardTitle>
              <CardDescription>
                {selectedStock.symbol} ({selectedStock.companyName}) price chart
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <StockChart stock={selectedStock} />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Place Order</CardTitle>
              <CardDescription>
                Available cash: ${portfolio.availableCapital.toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TradeForm onSubmit={handleTrade} currentPrice={selectedStock.price} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}