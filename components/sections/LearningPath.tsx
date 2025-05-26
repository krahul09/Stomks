import { BookOpen, BarChart2, Target, Trophy } from "lucide-react";
import Link from "next/link";

const learningPaths = [
  {
    title: "Beginner",
    description: "Start with the basics of trading and market concepts",
    icon: BookOpen,
    features: [
      "Introduction to Stock Market",
      "Basic Trading Concepts",
      "Understanding Charts",
      "Risk Management Basics",
    ],
  },
  {
    title: "Intermediate",
    description: "Dive deeper into technical analysis and strategies",
    icon: BarChart2,
    features: [
      "Technical Analysis",
      "Trading Strategies",
      "Market Indicators",
      "Portfolio Management",
    ],
  },
  {
    title: "Advanced",
    description: "Master complex trading techniques and analysis",
    icon: Target,
    features: [
      "Advanced Chart Patterns",
      "Options Trading",
      "Algorithmic Trading",
      "Risk Analysis",
    ],
  },
  {
    title: "Expert",
    description: "Perfect your skills with advanced trading concepts",
    icon: Trophy,
    features: [
      "Market Psychology",
      "Advanced Strategies",
      "Trading Systems",
      "Performance Analysis",
    ],
  },
];

export default function LearningPath() {
  return (
    <section className="w-full py-16 md:py-28 lg:py-36">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
              Learning Path
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Progress through our comprehensive trading curriculum
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
          {learningPaths.map((path) => (
            <div
              key={path.title}
              className="group flex flex-col space-y-4 rounded-lg border p-6 bg-card transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 hover:bg-primary/5"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110">
                <path.icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold transition-colors duration-300 group-hover:text-primary">
                  {path.title}
                </h3>
                <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                  {path.description}
                </p>
              </div>
              <ul className="space-y-2">
                {path.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center space-x-2 text-sm text-muted-foreground"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/learn"
                className="mt-auto inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Start Learning
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
