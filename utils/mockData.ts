import { Stock } from '@/types/stock';
import { LeaderboardUser } from '@/types/user';

// Helper function to generate random price movement
function randomPrice(base: number, volatility: number = 0.02): number {
  const change = base * (Math.random() * volatility * 2 - volatility);
  return +(base + change).toFixed(2);
}

// Generate price history for the last 30 days
function generatePriceHistory(basePrice: number, days: number = 30): { time: string, price: number }[] {
  const history = [];
  let currentPrice = basePrice;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    currentPrice = randomPrice(currentPrice, 0.03);
    
    history.push({
      time: date.toISOString(),
      price: currentPrice
    });
  }
  
  return history;
}

export function generateMockStocks(): Stock[] {
  return [
    {
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      price: 178.92,
      change: 2.45,
      changePercent: 1.38,
      volume: 23456789,
      marketCap: 2850000000000,
      sector: 'Technology',
      priceHistory: generatePriceHistory(178.92),
    },
    {
      symbol: 'MSFT',
      companyName: 'Microsoft Corporation',
      price: 315.75,
      change: -1.25,
      changePercent: -0.39,
      volume: 18765432,
      marketCap: 2350000000000,
      sector: 'Technology',
      priceHistory: generatePriceHistory(315.75),
    },
    {
      symbol: 'GOOGL',
      companyName: 'Alphabet Inc.',
      price: 138.45,
      change: 0.87,
      changePercent: 0.63,
      volume: 9876543,
      marketCap: 1750000000000,
      sector: 'Technology',
      priceHistory: generatePriceHistory(138.45),
    },
    {
      symbol: 'AMZN',
      companyName: 'Amazon.com Inc.',
      price: 132.65,
      change: -2.35,
      changePercent: -1.74,
      volume: 12345678,
      marketCap: 1350000000000,
      sector: 'Consumer Cyclical',
      priceHistory: generatePriceHistory(132.65),
    },
    {
      symbol: 'TSLA',
      companyName: 'Tesla, Inc.',
      price: 242.18,
      change: 5.67,
      changePercent: 2.4,
      volume: 34567890,
      marketCap: 770000000000,
      sector: 'Automotive',
      priceHistory: generatePriceHistory(242.18),
    },
    {
      symbol: 'NVDA',
      companyName: 'NVIDIA Corporation',
      price: 437.92,
      change: 12.43,
      changePercent: 2.92,
      volume: 28765432,
      marketCap: 1080000000000,
      sector: 'Technology',
      priceHistory: generatePriceHistory(437.92),
    },
    {
      symbol: 'META',
      companyName: 'Meta Platforms, Inc.',
      price: 325.52,
      change: 1.23,
      changePercent: 0.38,
      volume: 15678901,
      marketCap: 835000000000,
      sector: 'Technology',
      priceHistory: generatePriceHistory(325.52),
    },
    {
      symbol: 'JPM',
      companyName: 'JPMorgan Chase & Co.',
      price: 152.34,
      change: -0.89,
      changePercent: -0.58,
      volume: 8765432,
      marketCap: 450000000000,
      sector: 'Financial Services',
      priceHistory: generatePriceHistory(152.34),
    },
    {
      symbol: 'V',
      companyName: 'Visa Inc.',
      price: 245.73,
      change: 0.32,
      changePercent: 0.13,
      volume: 7654321,
      marketCap: 510000000000,
      sector: 'Financial Services',
      priceHistory: generatePriceHistory(245.73),
    },
    {
      symbol: 'WMT',
      companyName: 'Walmart Inc.',
      price: 59.87,
      change: 0.45,
      changePercent: 0.76,
      volume: 6543210,
      marketCap: 420000000000,
      sector: 'Consumer Defensive',
      priceHistory: generatePriceHistory(59.87),
    },
  ];
}

export function generateMockLeaderboard(): LeaderboardUser[] {
  return [
    {
      id: '1',
      name: 'Emma Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      returnPercentage: 32.5,
      totalTrades: 87,
      rank: 1,
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      returnPercentage: 28.7,
      totalTrades: 132,
      rank: 2,
    },
    {
      id: '3',
      name: 'Sophia Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      returnPercentage: 24.3,
      totalTrades: 65,
      rank: 3,
    },
    {
      id: '4',
      name: 'James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      returnPercentage: 21.9,
      totalTrades: 104,
      rank: 4,
    },
    {
      id: '5',
      name: 'Olivia Kim',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      returnPercentage: 19.8,
      totalTrades: 91,
      rank: 5,
    },
    {
      id: '6',
      name: 'William Davis',
      avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
      returnPercentage: 18.4,
      totalTrades: 76,
      rank: 6,
    },
    {
      id: '7',
      name: 'Isabella Martinez',
      avatar: 'https://randomuser.me/api/portraits/women/36.jpg',
      returnPercentage: 17.2,
      totalTrades: 113,
      rank: 7,
    },
    {
      id: '8',
      name: 'Ethan Patel',
      avatar: 'https://randomuser.me/api/portraits/men/58.jpg',
      returnPercentage: 15.6,
      totalTrades: 82,
      rank: 8,
    },
    {
      id: '9',
      name: 'Ava Thompson',
      avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
      returnPercentage: 14.9,
      totalTrades: 97,
      rank: 9,
    },
    {
      id: '10',
      name: 'Noah Garcia',
      avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
      returnPercentage: 13.7,
      totalTrades: 68,
      rank: 10,
    },
  ];
}

export function generateMockStrategies() {
  return [
    {
      id: 'strategy1',
      name: 'Moving Average Crossover',
      description: 'A strategy based on the crossover of two moving averages (usually a shorter and a longer one). Buy when the short MA crosses above the long MA, and sell when it crosses below.',
      indicators: ['SMA', 'EMA'],
      timeframe: 'Daily'
    },
    {
      id: 'strategy2',
      name: 'RSI Oversold/Overbought',
      description: 'Uses the Relative Strength Index to identify potential reversal points. Buy when RSI goes below 30 (oversold) and sell when it goes above 70 (overbought).',
      indicators: ['RSI'],
      timeframe: 'Hourly'
    },
    {
      id: 'strategy3',
      name: 'MACD Divergence',
      description: 'Identifies divergences between price and the MACD indicator to spot potential trend reversals. Works best in ranging markets.',
      indicators: ['MACD', 'Signal Line'],
      timeframe: '4-Hour'
    },
    {
      id: 'strategy4',
      name: 'Bollinger Band Squeeze',
      description: 'Identifies periods of low volatility (when bands narrow) followed by breakouts. Trade in the direction of the breakout for momentum.',
      indicators: ['Bollinger Bands', 'Volume'],
      timeframe: 'Daily'
    },
    {
      id: 'strategy5',
      name: 'Fibonacci Retracement',
      description: 'Uses Fibonacci levels to identify potential support and resistance areas where price might reverse during a trend.',
      indicators: ['Fibonacci Retracement'],
      timeframe: 'Daily'
    },
    {
      id: 'strategy6',
      name: 'Volume Breakout',
      description: 'Focuses on stocks breaking out of ranges or patterns on high volume, indicating strong conviction behind the move.',
      indicators: ['Volume', 'Price Channels'],
      timeframe: 'Hourly'
    }
  ];
}

export function simulateStockPriceChange(stock: Stock): Stock {
  // Random price change between -2% and +2%
  const changePercent = (Math.random() * 4) - 2;
  const priceChange = (stock.price * changePercent) / 100;
  const newPrice = +(stock.price + priceChange).toFixed(2);
  
  return {
    ...stock,
    price: newPrice,
    change: +priceChange.toFixed(2),
    changePercent: +changePercent.toFixed(2),
    priceHistory: [
      ...stock.priceHistory,
      {
        time: new Date().toISOString(),
        price: newPrice
      }
    ].slice(-100) // Keep only last 100 points
  };
}