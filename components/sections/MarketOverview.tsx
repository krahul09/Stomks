import { TrendingUp, TrendingDown } from "lucide-react";

const marketData = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 178.92,
    change: 2.45,
    changePercent: 1.38,
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    price: 415.32,
    change: -3.21,
    changePercent: -0.77,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet",
    price: 142.56,
    change: 1.23,
    changePercent: 0.87,
  },
  {
    symbol: "AMZN",
    name: "Amazon",
    price: 178.75,
    change: 4.32,
    changePercent: 2.47,
  },
  {
    symbol: "META",
    name: "Meta",
    price: 485.58,
    change: -2.15,
    changePercent: -0.44,
  },
  {
    symbol: "TSLA",
    name: "Tesla",
    price: 175.34,
    change: 5.67,
    changePercent: 3.34,
  },
];

export default function MarketOverview() {
  return (
    <section className="w-full py-16 md:py-28 lg:py-36 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
              Market Overview
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Real-time market data for popular stocks
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-16 md:grid-cols-2 lg:grid-cols-3">
          {marketData.map((stock) => (
            <div
              key={stock.symbol}
              className="group flex flex-col space-y-2 rounded-lg border p-4 bg-card transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 hover:bg-primary/5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold transition-colors duration-300 group-hover:text-primary">
                    {stock.symbol}
                  </h3>
                  <p className="text-sm text-muted-foreground">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">${stock.price.toFixed(2)}</p>
                  <div className="flex items-center justify-end space-x-1">
                    {stock.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <p
                      className={`text-sm font-medium ${
                        stock.change >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stock.change >= 0 ? "+" : ""}
                      {stock.change.toFixed(2)} (
                      {stock.changePercent.toFixed(2)}%)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
