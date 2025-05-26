"use client";

import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SessionProvider>
      <Provider store={store}>
        {mounted ? (
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        ) : (
          <div style={{ visibility: "hidden" }}>{children}</div>
        )}
      </Provider>
    </SessionProvider>
  );
}
