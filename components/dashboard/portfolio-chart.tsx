"use client";

import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format } from "date-fns";

const CHART_PERIODS = [
  { value: "1D", label: "1D" },
  { value: "1W", label: "1W" },
  { value: "1M", label: "1M" },
  { value: "3M", label: "3M" },
  { value: "ALL", label: "ALL" },
];

// Generate mock portfolio data
const generateMockPortfolioData = () => {
  const data = [];
  const now = new Date();

  // For 3 months
  for (let i = 90; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);

    // Start with $100,000 and add some randomness
    let value = 100000;

    // Add an upward trend with randomness
    const trend = 100000 * (1 + (90 - i) * 0.001); // 0.1% per day on average
    const randomFactor = Math.random() * 2000 - 1000; // +/- $1000 randomness

    value = trend + randomFactor;

    data.push({
      date: date.toISOString(),
      value: Math.round(value * 100) / 100,
    });
  }

  return data;
};

const portfolioData = generateMockPortfolioData();

export function PortfolioChart() {
  const [period, setPeriod] = useState("1M");

  // Memoize filtered data to prevent unnecessary recalculations
  const filteredData = useMemo(() => {
    switch (period) {
      case "1D":
        return portfolioData.slice(-1);
      case "1W":
        return portfolioData.slice(-7);
      case "1M":
        return portfolioData.slice(-30);
      case "3M":
        return portfolioData.slice(-90);
      case "ALL":
      default:
        return portfolioData;
    }
  }, [period]);

  // Memoize change calculations
  const { change, changePercent, isPositive } = useMemo(() => {
    const firstValue = filteredData[0]?.value || 0;
    const lastValue = filteredData[filteredData.length - 1]?.value || 0;
    const change = lastValue - firstValue;
    const changePercent = (change / firstValue) * 100;
    return {
      change,
      changePercent,
      isPositive: change >= 0,
    };
  }, [filteredData]);

  // Memoize chart data formatting
  const formattedData = useMemo(() => {
    return filteredData.map((item) => ({
      ...item,
      date: format(new Date(item.date), "MMM d"),
      value: Math.round(item.value),
    }));
  }, [filteredData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Performance</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <span>Total Change:</span>
            <span className={isPositive ? "text-green-500" : "text-red-500"}>
              {isPositive ? "+" : ""}
              {change.toFixed(2)} ({changePercent.toFixed(2)}%)
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={period} onValueChange={setPeriod}>
          <TabsList>
            {CHART_PERIODS.map((p) => (
              <TabsTrigger key={p.value} value={p.value}>
                {p.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={period} className="mt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={isPositive ? "#22c55e" : "#ef4444"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
