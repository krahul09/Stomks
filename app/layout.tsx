import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/common/site-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stomks - Where Memes Meet Money",
  description:
    "Trade stocks, make memes, and learn trading without losing your actual tendies. To the moon! 🚀",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
