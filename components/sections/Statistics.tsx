import { Users, TrendingUp, Clock, Target } from "lucide-react";

const stats = [
  {
    title: "Active Traders",
    value: "10,000+",
    description: "Join our growing community of traders",
    icon: Users,
  },
  {
    title: "Success Rate",
    value: "85%",
    description: "Of users improve their trading skills",
    icon: TrendingUp,
  },
  {
    title: "Trading Hours",
    value: "24/7",
    description: "Practice anytime with our simulator",
    icon: Clock,
  },
  {
    title: "Learning Resources",
    value: "100+",
    description: "Comprehensive trading guides and tutorials",
    icon: Target,
  },
];

export default function Statistics() {
  return (
    <section className="w-full py-16 md:py-28 lg:py-36 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
              Platform Statistics
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of successful traders on our platform
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="group flex flex-col items-center space-y-4 rounded-lg border p-6 bg-card transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 hover:bg-primary/5"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110">
                <stat.icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary" />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-4xl font-bold transition-colors duration-300 group-hover:text-primary">
                  {stat.value}
                </h3>
                <p className="text-xl font-semibold transition-colors duration-300 group-hover:text-foreground">
                  {stat.title}
                </p>
                <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
