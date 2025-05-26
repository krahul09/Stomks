"use client";

import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Code,
  GraduationCap,
  Heart,
  Home,
  Lightbulb,
  Users,
} from "lucide-react";

export default function CareersPage() {
  const benefits = [
    {
      title: "Remote First",
      description: "Work from anywhere in the world",
      icon: Home,
    },
    {
      title: "Learning & Development",
      description: "Continuous learning opportunities and resources",
      icon: GraduationCap,
    },
    {
      title: "Health & Wellness",
      description: "Comprehensive health coverage and wellness programs",
      icon: Heart,
    },
    {
      title: "Innovation Time",
      description: "Dedicated time for personal projects and innovation",
      icon: Lightbulb,
    },
    {
      title: "Team Events",
      description: "Regular team building and social events",
      icon: Users,
    },
    {
      title: "Tech Stack",
      description: "Work with cutting-edge technologies",
      icon: Code,
    },
  ];

  const positions = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description:
        "Join our team to build and improve our trading platform's user interface and experience.",
      requirements: [
        "5+ years of experience with React/Next.js",
        "Strong TypeScript skills",
        "Experience with financial applications",
        "Knowledge of trading concepts",
      ],
    },
    {
      title: "Trading Strategy Developer",
      department: "Trading",
      location: "Remote",
      type: "Full-time",
      description:
        "Develop and implement trading strategies and algorithms for our platform.",
      requirements: [
        "Experience in algorithmic trading",
        "Strong Python skills",
        "Knowledge of financial markets",
        "Understanding of technical analysis",
      ],
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      description:
        "Lead the development of new features and improvements for our trading platform.",
      requirements: [
        "3+ years of product management experience",
        "Experience with fintech products",
        "Strong analytical skills",
        "Excellent communication abilities",
      ],
    },
  ];

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Join Our Team
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Help us revolutionize trading education and practice
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-12 py-12">
        <section className="space-y-8">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Open Positions</h2>
              <p className="text-muted-foreground">
                Explore our current job openings and find your perfect role
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            {positions.map((position) => (
              <div
                key={position.title}
                className="group flex flex-col space-y-4 rounded-lg border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold transition-colors duration-300 group-hover:text-primary">
                      {position.title}
                    </h3>
                    <div className="mt-1 flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{position.department}</span>
                      <span>•</span>
                      <span>{position.location}</span>
                      <span>•</span>
                      <span>{position.type}</span>
                    </div>
                  </div>
                  <Button>Apply Now</Button>
                </div>
                <p className="text-muted-foreground">{position.description}</p>
                <div>
                  <h4 className="text-sm font-semibold">Requirements:</h4>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                    {position.requirements.map((req) => (
                      <li key={req}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Benefits & Perks</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex items-start space-x-4 rounded-lg border bg-card p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
