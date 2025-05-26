'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RootState } from '@/redux/store';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { resetPortfolio } from '@/redux/slices/userSlice';
import { clearAllTrades } from '@/redux/slices/tradeSlice';
import { RecentTrades } from '@/components/dashboard/recent-trades';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();
  
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { portfolio } = useSelector((state: RootState) => state.user);
  const { trades } = useSelector((state: RootState) => state.trades);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);
  
  const handleResetPortfolio = () => {
    if (confirm('Are you sure you want to reset your portfolio? This will clear all your trades and reset your capital to $100,000.')) {
      dispatch(resetPortfolio());
      dispatch(clearAllTrades());
      
      toast({
        title: "Portfolio Reset",
        description: "Your portfolio has been reset to the starting value of $100,000.",
      });
    }
  };
  
  if (!isAuthenticated || !user) {
    return null;
  }
  
  // Calculate trading stats
  const totalTrades = trades.length;
  const buyTrades = trades.filter(trade => trade.action === 'buy').length;
  const sellTrades = trades.filter(trade => trade.action === 'sell').length;
  const profitPercentage = ((portfolio.totalCapital - 100000) / 100000) * 100;
  
  // Format join date
  const joinDate = new Date(user.joinedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container py-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          View and manage your profile and trading statistics.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>Your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" alt={user.name} />
                <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground mt-1">Member since {joinDate}</p>
              
              <div className="w-full mt-6">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/settings">Edit Profile</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Trading Statistics</CardTitle>
            <CardDescription>Overview of your trading activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Total P&L</div>
                <div className={`text-lg font-bold ${profitPercentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {profitPercentage >= 0 ? '+' : ''}{profitPercentage.toFixed(2)}%
                </div>
                <div className="text-xs text-muted-foreground">
                  ${(portfolio.totalCapital - 100000).toFixed(2)}
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Total Trades</div>
                <div className="text-lg font-bold">{totalTrades}</div>
                <div className="text-xs text-muted-foreground">
                  Buy: {buyTrades} / Sell: {sellTrades}
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Current Capital</div>
                <div className="text-lg font-bold">${portfolio.totalCapital.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">
                  Available: ${portfolio.availableCapital.toLocaleString()}
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Invested Capital</div>
                <div className="text-lg font-bold">${portfolio.investedCapital.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">
                  {((portfolio.investedCapital / portfolio.totalCapital) * 100).toFixed(1)}% of total
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Recent Trades</h3>
              <RecentTrades />
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button variant="destructive" onClick={handleResetPortfolio}>
              Reset Portfolio
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}