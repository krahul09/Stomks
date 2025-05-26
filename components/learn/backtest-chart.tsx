'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { format, parseISO } from 'date-fns';

interface BacktestChartProps {
  symbol: string;
  strategyName: string;
  startDate: string;
  endDate: string;
}

export function BacktestChart({ symbol, strategyName, startDate, endDate }: BacktestChartProps) {
  const { stocks } = useSelector((state: RootState) => state.stocks);
  const selectedStock = stocks.find(s => s.symbol === symbol);
  
  if (!selectedStock) {
    return <div>Stock data not found</div>;
  }
  
  // Generate mock strategy performance data
  const generateStrategyData = () => {
    const data = [];
    const priceData = selectedStock.priceHistory.slice(-30); // Use last 30 data points
    
    let capital = 10000;
    for (let i = 0; i < priceData.length; i++) {
      // Add some randomness to strategy performance
      const randomFactor = 1 + (Math.random() * 0.01 - 0.005); // -0.5% to +0.5%
      
      if (i > 0) {
        // Strategy performance should somewhat correlate with price movement
        const priceChange = priceData[i].price / priceData[i-1].price;
        capital = capital * (priceChange * 0.5 + 0.5 * randomFactor);
      }
      
      data.push({
        time: priceData[i].time,
        price: priceData[i].price,
        strategy: capital
      });
    }
    
    return data;
  };
  
  const data = generateStrategyData();
  
  // Add buy/sell signals
  const signals = [];
  for (let i = 5; i < data.length; i += 5) {
    const isBuy = Math.random() > 0.5;
    signals.push({
      time: data[i].time,
      type: isBuy ? 'buy' : 'sell',
      price: data[i].price
    });
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="time"
            tickFormatter={(tick) => format(new Date(tick), 'MMM d')}
            stroke="var(--muted-foreground)"
            fontSize={12}
          />
          <YAxis
            yAxisId="left"
            tickFormatter={(tick) => `$${tick.toFixed(2)}`}
            stroke="var(--muted-foreground)"
            fontSize={12}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(tick) => `$${tick.toFixed(0)}`}
            stroke="var(--muted-foreground)"
            fontSize={12}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === 'price') return [`$${value.toFixed(2)}`, 'Stock Price'];
              if (name === 'strategy') return [`$${value.toFixed(2)}`, 'Strategy Value'];
              return [value, name];
            }}
            labelFormatter={(label) => format(new Date(label), 'MMM d, yyyy')}
            contentStyle={{
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)',
              borderRadius: '8px',
            }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="price"
            stroke="hsl(var(--chart-2))"
            dot={false}
            name="price"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="strategy"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            dot={false}
            name="strategy"
          />
          
          {/* Buy/sell signals */}
          {signals.map((signal, index) => (
            <ReferenceLine
              key={index}
              x={signal.time}
              stroke={signal.type === 'buy' ? 'hsl(var(--chart-1))' : 'hsl(var(--destructive))'}
              strokeDasharray="3 3"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}