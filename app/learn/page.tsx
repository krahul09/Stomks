"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RootState } from "@/redux/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { generateMockStrategies } from "@/utils/mockData";
import { StrategyTester } from "@/components/learn/strategy-tester";

export default function LearnPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [strategies, setStrategies] = useState(generateMockStrategies());
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

  // If authenticated, check, but don't redirect
  // This page can be public

  return (
    <div className="container py-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Learn & Test</h1>
        <p className="text-muted-foreground">
          Explore different trading strategies and test them with historical
          data.
        </p>
      </div>

      <Tabs defaultValue="strategies" className="mt-6">
        <TabsList>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="backtester" disabled={!selectedStrategy}>
            Backtester
          </TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
        </TabsList>

        <TabsContent value="strategies">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {strategies.map((strategy) => (
              <Card key={strategy.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{strategy.name}</CardTitle>
                  <CardDescription>
                    Timeframe: {strategy.timeframe}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm">{strategy.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {strategy.indicators.map((indicator) => (
                      <Badge key={indicator} variant="outline">
                        {indicator}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => {
                      setSelectedStrategy(strategy.id);
                      (
                        document.querySelector(
                          '[data-value="backtester"]'
                        ) as HTMLElement | null
                      )?.click();
                    }}
                  >
                    Test Strategy
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="backtester">
          {selectedStrategy && (
            <StrategyTester
              strategy={strategies.find((s) => s.id === selectedStrategy)!}
            />
          )}
        </TabsContent>

        <TabsContent value="guides">
          <div className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Trading Basics</CardTitle>
                <CardDescription>
                  Essential knowledge for beginners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">
                      Understanding Market Orders vs. Limit Orders
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Market orders execute immediately at the current market
                      price, while limit orders only execute at your specified
                      price or better.
                    </p>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">
                        Read More
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">
                      Basic Technical Analysis Concepts
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Learn about support and resistance, trend lines, and basic
                      chart patterns that can help inform your trading
                      decisions.
                    </p>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">
                        Read More
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">
                      Risk Management Fundamentals
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Discover how to protect your capital with proper position
                      sizing, stop-loss orders, and risk-to-reward ratios.
                    </p>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">
                        Read More
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Techniques</CardTitle>
                <CardDescription>
                  For intermediate and advanced traders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">
                      Advanced Chart Patterns
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Master complex chart patterns like head and shoulders, cup
                      and handle, and harmonic patterns for precise entries and
                      exits.
                    </p>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">
                        Read More
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">
                      Momentum Trading Strategies
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Learn how to identify and capitalize on stocks with strong
                      momentum using indicators and volume analysis.
                    </p>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">
                        Read More
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">
                      Trading Psychology
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Understand the mental aspects of trading, including how to
                      manage emotions, maintain discipline, and develop a
                      winning mindset.
                    </p>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">
                        Read More
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
