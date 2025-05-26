'use client';

import { useState } from 'react';
import { Stock } from '@/types/stock';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StockChartProps {
  stock: Stock;
}

const CHART_PERIODS = [
  { value: '1D', label: '1D' },
  { value: '1W', label: '1W' },
  { value: '1M', label: '1M' },
  { value: 'ALL', label: 'ALL' }
];

export function StockChart({ stock }: StockChartProps) {
  const [period, setPeriod] = useState('1D');
  
  // Filter data based on selected period
  const getFilteredData = () => {
    const now = new Date();
    
    switch (period) {
      case '1D':
        return stock.priceHistory.slice(-24); // Last 24 data points for 1 day
      case '1W':
        return stock.priceHistory.slice(-7 * 24); // Last 7 days
      case '1M':
        return stock.priceHistory.slice(-30 * 24); // Last 30 days
      case 'ALL':
      default:
        return stock.priceHistory;
    }
  };
  
  const data = getFilteredData();
  
  // Calculate min and max for y-axis domain
  const prices = data.map(item => item.price);
  const minPrice = Math.min(...prices) * 0.995; // 0.5% padding
  const maxPrice = Math.max(...prices) * 1.005; // 0.5% padding
  
  return (
    <div className="h-full w-full">
      <div className="flex justify-end mb-4">
        <div className="flex items-center space-x-2">
          {CHART_PERIODS.map((chartPeriod) => (
            <button
              key={chartPeriod.value}
              onClick={() => setPeriod(chartPeriod.value)}
              className={`px-2 py-1 text-xs rounded-md ${
                period === chartPeriod.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {chartPeriod.label}
            </button>
          ))}
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 25,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="time"
            tickFormatter={(tick) => format(new Date(tick), 'h:mm a')}
            stroke="var(--muted-foreground)"
            fontSize={12}
          />
          <YAxis
            domain={[minPrice, maxPrice]}
            tickFormatter={(tick) => `$${tick.toFixed(2)}`}
            stroke="var(--muted-foreground)"
            fontSize={12}
          />
          <Tooltip
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            labelFormatter={(label) => format(new Date(label), 'MMM d, yyyy h:mm a')}
            contentStyle={{
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)',
              borderRadius: '8px',
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={stock.change >= 0 ? 'hsl(var(--chart-1))' : 'hsl(var(--destructive))'}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}