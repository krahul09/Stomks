import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const generateRandomPrice = (lastPrice: number) => {
  const change = (Math.random() - 0.5) * 2; // Random value between -1 and 1
  return Math.max(150, Math.min(200, lastPrice + change)); // Keep price between 150 and 200
};

export default function Hero() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [chartData, setChartData] = useState({
    labels: [
      "9:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
    ],
    datasets: [
      {
        label: "AAPL Price",
        data: [
          175.5, 176.2, 175.8, 176.5, 177.1, 177.8, 178.2, 178.5, 178.9, 178.7,
          178.5, 178.8, 178.9, 178.92,
        ],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.4,
      },
    ],
  });

  const [currentPrice, setCurrentPrice] = useState(178.92);
  const [priceChange, setPriceChange] = useState(2.45);
  const [priceChangePercent, setPriceChangePercent] = useState(1.38);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => {
        const newData = [...prevData.datasets[0].data];
        const lastPrice = newData[newData.length - 1];
        const newPrice = generateRandomPrice(lastPrice);

        // Remove first element and add new price
        newData.shift();
        newData.push(newPrice);

        // Update current price and calculate changes
        const priceDiff = newPrice - 175.5; // Compare with initial price
        const percentChange = (priceDiff / 175.5) * 100;

        setCurrentPrice(newPrice);
        setPriceChange(Number(priceDiff.toFixed(2)));
        setPriceChangePercent(Number(percentChange.toFixed(2)));

        return {
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: newData,
            },
          ],
        };
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0, // Disable animation for smoother updates
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        >
          <source
            src="https://cdn.pixabay.com/video/2024/03/15/204306-923909642_tiny.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-primary/10 text-primary">
                <TrendingUp className="mr-2 h-4 w-4" />
                The Most Fun Trading Simulator
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none">
                Trade Like a Pro{" "}
                <span className="text-primary">
                  Without Losing Your Tendies
                </span>
              </h1>
              <p className="max-w-[600px] text-xl text-muted-foreground">
                Practice trading, make memes, and learn the ropes without
                risking your actual money. Whether you&apos;re a diamond hands
                or paper hands, we&apos;ve got you covered! 🚀
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Link
                href={isAuthenticated ? "/dashboard" : "/auth/register"}
                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Start Trading Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/learn"
                className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-base font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Learn More
              </Link>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <Image
                    src="https://assets.foxdcg.com/dpp-uploaded/images/credits/270765094675/family_guy_seth_macfarlane_2x.jpg?fit=inside%7C*:278"
                    alt="Peter Griffin"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-background object-cover"
                  />
                  <Image
                    src="https://oyster.ignimgs.com/mediawiki/apis.ign.com/family-guy/7/7e/Laser.jpg"
                    alt="Stewie Griffin"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-background object-cover"
                  />
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6UILTHR4fNFYkiu4DyIhR3BzU_GT63vboSQ&s"
                    alt="Glenn Quagmire"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-background object-cover"
                  />
                  <Image
                    src="https://i.cbc.ca/1.2439270.1385396617!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/family-guy-brian-from-fox.jpg"
                    alt="Brian Griffin"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-background object-cover"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Join 10,000+ traders
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-green-500">
                    85%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Success rate</p>
              </div>
            </div>
          </div>

          <div className="relative h-[450px] w-full overflow-hidden rounded-xl border bg-gradient-to-b from-muted/50 to-muted p-4">
            <div className="h-full w-full rounded-lg bg-card shadow-lg">
              <div className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="text-xl font-semibold">AAPL</h3>
                    <p className="text-sm text-muted-foreground">Apple Inc.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">
                      ${currentPrice.toFixed(2)}
                    </p>
                    <div className="flex items-center justify-end space-x-1">
                      {priceChange >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <p
                        className={`text-sm font-medium ${
                          priceChange >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {priceChange >= 0 ? "+" : ""}
                        {priceChange} ({priceChangePercent}%)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex-1">
                  <div className="h-[200px] w-full bg-muted rounded-md">
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
