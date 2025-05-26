'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Medal, Crown, ArrowUpRight } from 'lucide-react';
import { generateMockLeaderboard } from '@/utils/mockData';

export default function LeaderboardPage() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [leaderboardData, setLeaderboardData] = useState(generateMockLeaderboard());
  const [period, setPeriod] = useState('week');
  
  // Simulate different data for different periods
  useEffect(() => {
    const data = generateMockLeaderboard();
    
    if (period === 'month') {
      data.forEach(user => {
        user.returnPercentage = user.returnPercentage * 1.5;
        user.totalTrades = Math.floor(user.totalTrades * 2.5);
      });
    } else if (period === 'all') {
      data.forEach(user => {
        user.returnPercentage = user.returnPercentage * 3;
        user.totalTrades = Math.floor(user.totalTrades * 6);
      });
    }
    
    // Sort by return percentage
    data.sort((a, b) => b.returnPercentage - a.returnPercentage);
    
    // Update ranks
    data.forEach((user, index) => {
      user.rank = index + 1;
    });
    
    setLeaderboardData(data);
  }, [period]);
  
  return (
    <div className="container py-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">
          See how your trading performance compares to other traders.
        </p>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Top Traders</CardTitle>
          <CardDescription>Ranked by return percentage</CardDescription>
          <Tabs
            value={period}
            onValueChange={setPeriod}
            className="mt-2"
          >
            <TabsList>
              <TabsTrigger value="week">Weekly</TabsTrigger>
              <TabsTrigger value="month">Monthly</TabsTrigger>
              <TabsTrigger value="all">All Time</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground w-12">Rank</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Trader</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Return</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground hidden md:table-cell">Trades</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((trader) => (
                    <tr
                      key={trader.id}
                      className={`border-b hover:bg-muted/50 transition-colors ${
                        isAuthenticated && user?.id === trader.id ? 'bg-muted/30' : ''
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center">
                          {trader.rank === 1 ? (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500/10">
                              <Crown className="h-4 w-4 text-yellow-500" />
                            </div>
                          ) : trader.rank === 2 ? (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-400/10">
                              <Medal className="h-4 w-4 text-zinc-400" />
                            </div>
                          ) : trader.rank === 3 ? (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-700/10">
                              <Medal className="h-4 w-4 text-amber-700" />
                            </div>
                          ) : (
                            <span className="text-sm font-medium text-muted-foreground">{trader.rank}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={trader.avatar} alt={trader.name} />
                            <AvatarFallback>{trader.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{trader.name}</div>
                            {isAuthenticated && user?.id === trader.id && (
                              <div className="text-xs text-primary">You</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end">
                          <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-500 font-medium">
                            {trader.returnPercentage.toFixed(2)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right hidden md:table-cell text-muted-foreground">
                        {trader.totalTrades}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {!isAuthenticated && (
            <div className="mt-6 p-4 border rounded-md bg-muted/30">
              <p className="text-center text-sm text-muted-foreground">
                <span className="font-medium">Want to be on the leaderboard?</span> Sign up and start trading!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}