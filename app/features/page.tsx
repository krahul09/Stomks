"use client";

import {
  LineChart,
  Briefcase,
  BookOpen,
  Bell,
  TrendingUp,
  BarChart3,
  Trophy,
  Settings,
} from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      title: "Real-time Trading",
      description:
        "Experience the thrill of intraday trading with real-time price simulations and market data.",
      icon: LineChart,
    },
    {
      title: "Portfolio Management",
      description:
        "Track your performance with detailed portfolio analytics, trade history, and performance metrics.",
      icon: Briefcase,
    },
    {
      title: "Learning Resources",
      description:
        "Access comprehensive educational content to understand different trading strategies and market concepts.",
      icon: BookOpen,
    },
    {
      title: "Watchlist Alerts",
      description:
        "Set custom price alerts for your favorite stocks and get notified when your conditions are met.",
      icon: Bell,
    },
    {
      title: "Strategy Testing",
      description:
        "Backtest your trading strategies against historical data to validate your approach.",
      icon: TrendingUp,
    },
    {
      title: "Advanced Charts",
      description:
        "Analyze stock movements with powerful technical analysis tools and customizable indicators.",
      icon: BarChart3,
    },
    {
      title: "Leaderboards",
      description:
        "Compete with other traders and track your ranking on our global leaderboards.",
      icon: Trophy,
    },
    {
      title: "Customization",
      description:
        "Personalize your trading experience with customizable layouts and preferences.",
      icon: Settings,
    },
  ];

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Powerful Features for Traders
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Everything you need to practice and perfect your trading strategy
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 hover:bg-primary/5"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110">
              <feature.icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary" />
            </div>
            <h3 className="text-xl font-bold transition-colors duration-300 group-hover:text-primary">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground text-center transition-colors duration-300 group-hover:text-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
