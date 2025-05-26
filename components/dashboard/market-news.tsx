'use client';

export function MarketNews() {
  // Mock news data
  const newsItems = [
    {
      id: 1,
      title: "Fed Signals Potential Rate Cut in September",
      source: "Financial Times",
      summary: "Federal Reserve officials hinted at a possible interest rate reduction in September, citing improving inflation figures and steady economic growth.",
      date: "2025-08-21T14:30:00Z",
      url: "#",
      image: "https://images.pexels.com/photos/7985216/pexels-photo-7985216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      title: "Tech Giants Report Strong Q2 Earnings",
      source: "Reuters",
      summary: "Major technology companies exceeded analyst expectations for the second quarter, with cloud services and AI initiatives driving growth.",
      date: "2025-08-20T10:15:00Z",
      url: "#",
      image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      title: "Oil Prices Stabilize After Volatility",
      source: "Bloomberg",
      summary: "Crude oil markets have settled following weeks of fluctuation, as supply concerns ease and demand forecasts improve for the remainder of the year.",
      date: "2025-08-19T16:45:00Z",
      url: "#",
      image: "https://images.pexels.com/photos/162568/oil-industry-pump-jack-sunset-162568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 4,
      title: "Retail Sales Show Unexpected Strength",
      source: "CNBC",
      summary: "Consumer spending increased by 0.8% last month, surpassing economists' projections and suggesting resilient household finances despite inflation concerns.",
      date: "2025-08-18T09:30:00Z",
      url: "#",
      image: "https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 5,
      title: "New Regulations for Cryptocurrency Markets Proposed",
      source: "Wall Street Journal",
      summary: "Regulatory agencies have unveiled a framework for digital asset oversight, aiming to increase investor protection while fostering innovation.",
      date: "2025-08-17T11:20:00Z",
      url: "#",
      image: "https://images.pexels.com/photos/843700/pexels-photo-843700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-4">
      {newsItems.map((item) => (
        <div key={item.id} className="flex gap-4 border-b pb-4 last:border-b-0">
          <div className="flex-grow">
            <h3 className="font-medium hover:text-primary">
              <a href={item.url} className="hover:underline">{item.title}</a>
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{item.summary}</p>
            <div className="flex items-center mt-2 text-xs text-muted-foreground">
              <span className="font-medium">{item.source}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(item.date)}</span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-16 object-cover rounded-md"
            />
          </div>
        </div>
      ))}
    </div>
  );
}