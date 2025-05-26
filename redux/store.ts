import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import stockReducer from "./slices/stockSlice";
import tradeReducer from "./slices/tradeSlice";
import userReducer from "./slices/userSlice";
import watchlistReducer from "./slices/watchlistSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stocks: stockReducer,
    trades: tradeReducer,
    user: userReducer,
    watchlist: watchlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["stocks/updateStockPrice"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["payload.timestamp", "payload.date"],
        // Ignore these paths in the state
        ignoredPaths: [
          "stocks.stocks.priceHistory",
          "stocks.selectedStock.priceHistory",
        ],
      },
      immutableCheck: {
        // Ignore these paths in the state
        ignoredPaths: [
          "stocks.stocks.priceHistory",
          "stocks.selectedStock.priceHistory",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
