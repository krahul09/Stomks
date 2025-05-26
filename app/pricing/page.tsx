"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for beginners",
      features: [
        "Basic trading simulator",
        "Limited historical data",
        "Basic technical indicators",
        "Community support",
      ],
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "For serious traders",
      features: [
        "Advanced trading simulator",
        "Full historical data access",
        "All technical indicators",
        "Priority support",
        "Custom watchlists",
        "Portfolio analytics",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For institutions",
      features: [
        "Everything in Pro",
        "Custom API access",
        "Dedicated support",
        "White-label solutions",
        "Custom integrations",
        "Team management",
      ],
    },
  ];

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Choose the plan that best fits your trading needs
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-lg border bg-card p-6 ${
              plan.popular ? "border-primary shadow-lg" : ""
            }`}
          >
            {plan.popular && (
              <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-bold">{plan.name}</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.period && (
                <span className="ml-1 text-muted-foreground">
                  {plan.period}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {plan.description}
            </p>
            <ul className="mt-6 space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className={`mt-8 ${plan.popular ? "bg-primary" : "bg-secondary"}`}
            >
              Get Started
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
