"use client";

import Link from "next/link";
import { Book, Code, FileText, Settings } from "lucide-react";

export default function DocumentationPage() {
  const sections = [
    {
      title: "Getting Started",
      description: "Learn the basics of using our trading platform",
      icon: Book,
      links: [
        { title: "Quick Start Guide", href: "/docs/quickstart" },
        { title: "Platform Overview", href: "/docs/overview" },
        { title: "Account Setup", href: "/docs/account-setup" },
      ],
    },
    {
      title: "API Reference",
      description: "Detailed documentation for our REST API",
      icon: Code,
      links: [
        { title: "Authentication", href: "/docs/api/auth" },
        { title: "Market Data", href: "/docs/api/market-data" },
        { title: "Trading Endpoints", href: "/docs/api/trading" },
      ],
    },
    {
      title: "Trading Guides",
      description: "Learn about different trading strategies",
      icon: FileText,
      links: [
        {
          title: "Technical Analysis",
          href: "/docs/guides/technical-analysis",
        },
        { title: "Risk Management", href: "/docs/guides/risk-management" },
        { title: "Portfolio Management", href: "/docs/guides/portfolio" },
      ],
    },
    {
      title: "Platform Features",
      description: "Explore advanced platform features",
      icon: Settings,
      links: [
        { title: "Charts & Indicators", href: "/docs/features/charts" },
        { title: "Alerts & Notifications", href: "/docs/features/alerts" },
        { title: "Backtesting", href: "/docs/features/backtesting" },
      ],
    },
  ];

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Documentation
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Everything you need to know about using our platform
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
        {sections.map((section) => (
          <div
            key={section.title}
            className="group flex flex-col space-y-4 rounded-lg border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50"
          >
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                <section.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold transition-colors duration-300 group-hover:text-primary">
                  {section.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {section.description}
                </p>
              </div>
            </div>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="flex items-center text-sm text-muted-foreground hover:text-primary"
                  >
                    <svg
                      className="mr-2 h-4 w-4"
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
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
