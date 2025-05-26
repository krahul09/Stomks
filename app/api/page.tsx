"use client";

import { Code, Database, Key, Server } from "lucide-react";

export default function ApiPage() {
  const endpoints = [
    {
      title: "Authentication",
      description: "Secure your API requests with authentication tokens",
      icon: Key,
      methods: [
        {
          method: "POST",
          path: "/api/auth/login",
          description: "Authenticate and get access token",
        },
        {
          method: "POST",
          path: "/api/auth/refresh",
          description: "Refresh expired access token",
        },
      ],
    },
    {
      title: "Market Data",
      description: "Access real-time and historical market data",
      icon: Database,
      methods: [
        {
          method: "GET",
          path: "/api/market/quotes",
          description: "Get real-time quotes for symbols",
        },
        {
          method: "GET",
          path: "/api/market/historical",
          description: "Get historical price data",
        },
      ],
    },
    {
      title: "Trading",
      description: "Execute trades and manage positions",
      icon: Server,
      methods: [
        {
          method: "POST",
          path: "/api/trade/order",
          description: "Place a new order",
        },
        {
          method: "GET",
          path: "/api/trade/positions",
          description: "Get current positions",
        },
      ],
    },
  ];

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            API Documentation
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Integrate our trading platform with your applications
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl gap-8 py-12">
        {endpoints.map((section) => (
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
            <div className="space-y-4">
              {section.methods.map((method) => (
                <div
                  key={method.path}
                  className="rounded-lg border bg-muted/50 p-4"
                >
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        method.method === "GET"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {method.method}
                    </span>
                    <code className="text-sm font-mono">{method.path}</code>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {method.description}
                  </p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium">Example Request</h4>
                    <pre className="mt-2 rounded-lg bg-background p-4 text-sm">
                      <code>
                        {`curl -X ${method.method} \\
  'https://api.stomks.com${method.path}' \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json'`}
                      </code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
