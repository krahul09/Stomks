"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { updateStockPrice } from "@/redux/slices/stockSlice";
import { executeLimitOrder } from "@/redux/slices/tradeSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { simulateStockPriceChange } from "@/utils/mockData";
import { PortfolioSummary } from "@/components/dashboard/portfolio-summary";
import { RecentTrades } from "@/components/dashboard/recent-trades";
import { PortfolioChart } from "@/components/dashboard/portfolio-chart";
import { StockList } from "@/components/dashboard/stock-list";
import { MarketNews } from "@/components/dashboard/market-news";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { stocks } = useSelector((state: RootState) => state.stocks);
  const { pendingOrders } = useSelector((state: RootState) => state.trades);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router]);

  // Simulate stock price changes
  useEffect(() => {
    if (!isAuthenticated) return;

    // Use a more efficient interval for price updates
    const interval = setInterval(() => {
      // Batch updates for better performance
      const updates = stocks.map((stock) => {
        const updatedStock = simulateStockPriceChange(stock);
        return {
          symbol: updatedStock.symbol,
          price: updatedStock.price,
          change: updatedStock.change,
          changePercent: updatedStock.changePercent,
        };
      });

      // Dispatch all updates at once
      updates.forEach((update) => {
        dispatch(updateStockPrice(update));
      });

      // Check for limit orders that can be executed
      const executableOrders = pendingOrders.filter((order) => {
        const matchingStock = stocks.find((s) => s.symbol === order.symbol);
        if (!matchingStock) return false;

        return (
          (order.action === "buy" && matchingStock.price <= order.price) ||
          (order.action === "sell" && matchingStock.price >= order.price)
        );
      });

      // Execute all matching orders at once
      executableOrders.forEach((order) => {
        dispatch(executeLimitOrder(order.id));
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [stocks, pendingOrders, dispatch, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your trading dashboard. Monitor your portfolio, analyze
          market trends, and make informed decisions.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <PortfolioSummary />
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stocks">Market</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
                <CardDescription>
                  Your portfolio value over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PortfolioChart />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Trades</CardTitle>
                <CardDescription>Your latest transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTrades />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stocks">
          <Card>
            <CardHeader>
              <CardTitle>Market Overview</CardTitle>
              <CardDescription>
                Current stock prices and daily changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StockList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Pending Orders</CardTitle>
              <CardDescription>Your active limit orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4">
                  {pendingOrders.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      No pending orders
                    </p>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Symbol</th>
                          <th className="text-left py-2">Type</th>
                          <th className="text-left py-2">Action</th>
                          <th className="text-right py-2">Price</th>
                          <th className="text-right py-2">Quantity</th>
                          <th className="text-right py-2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingOrders.map((order) => (
                          <tr key={order.id} className="border-b">
                            <td className="py-2">{order.symbol}</td>
                            <td className="py-2">{order.orderType}</td>
                            <td className="py-2">
                              <span
                                className={
                                  order.action === "buy"
                                    ? "text-green-500"
                                    : "text-red-500"
                                }
                              >
                                {order.action.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-2 text-right">
                              ${order.price.toFixed(2)}
                            </td>
                            <td className="py-2 text-right">
                              {order.quantity}
                            </td>
                            <td className="py-2 text-right">
                              ${order.totalValue.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news">
          <Card>
            <CardHeader>
              <CardTitle>Market News</CardTitle>
              <CardDescription>
                Latest financial news and market updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MarketNews />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
