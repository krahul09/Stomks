import {
  ArrowRight,
  BarChart2,
  BookOpen,
  LineChart,
  Target,
} from "lucide-react";

const steps = [
  {
    title: "Create Your Account",
    description:
      "Sign up for free and get access to our trading simulator with virtual currency.",
    icon: Target,
  },
  {
    title: "Learn the Basics",
    description:
      "Access our comprehensive learning resources and trading guides.",
    icon: BookOpen,
  },
  {
    title: "Practice Trading",
    description:
      "Use our realistic simulator to practice trading with real-time market data.",
    icon: LineChart,
  },
  {
    title: "Track Progress",
    description: "Monitor your performance and improve your trading strategy.",
    icon: BarChart2,
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full py-16 md:py-28 lg:py-36">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
              How It Works
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Start your trading journey in four simple steps
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative flex flex-col items-center space-y-4 rounded-lg border p-6 bg-card transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 hover:bg-primary/5"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110">
                <step.icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary" />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold transition-colors duration-300 group-hover:text-primary">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
