"use client";

import Link from "next/link";
import { BookOpen, TrendingUp, Shield, PieChart } from "lucide-react";

export default function GuidesPage() {
  const guides = [
    {
      title: "Technical Analysis Fundamentals",
      description:
        "Learn the basics of technical analysis and how to use charts to make trading decisions.",
      icon: BookOpen,
      level: "Beginner",
      timeToRead: "30 min",
      topics: ["Chart Patterns", "Indicators", "Support/Resistance"],
    },
    {
      title: "Advanced Trading Strategies",
      description:
        "Explore sophisticated trading strategies used by professional traders.",
      icon: TrendingUp,
      level: "Advanced",
      timeToRead: "45 min",
      topics: ["Swing Trading", "Day Trading", "Position Trading"],
    },
    {
      title: "Risk Management Essentials",
      description:
        "Master the art of protecting your capital and managing trading risks.",
      icon: Shield,
      level: "Intermediate",
      timeToRead: "25 min",
      topics: ["Position Sizing", "Stop Losses", "Risk/Reward"],
    },
    {
      title: "Portfolio Management",
      description:
        "Learn how to build and maintain a diversified trading portfolio.",
      icon: PieChart,
      level: "Intermediate",
      timeToRead: "35 min",
      topics: ["Diversification", "Asset Allocation", "Rebalancing"],
    },
  ];

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Trading Guides
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Comprehensive guides to help you become a better trader
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
        {guides.map((guide) => (
          <div
            key={guide.title}
            className="group flex flex-col space-y-4 rounded-lg border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50"
          >
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                <guide.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold transition-colors duration-300 group-hover:text-primary">
                  {guide.title}
                </h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {guide.level}
                  </span>
                  <span>•</span>
                  <span>{guide.timeToRead}</span>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">{guide.description}</p>
            <div className="flex flex-wrap gap-2">
              {guide.topics.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>
            <Link
              href={`/guides/${guide.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              Read Guide
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
