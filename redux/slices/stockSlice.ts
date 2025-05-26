import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Stock, StockPriceUpdate } from "@/types/stock";
import { generateMockStocks } from "@/utils/mockData";

interface StockState {
  stocks: Stock[];
  selectedStock: Stock | null;
  loading: boolean;
  error: string | null;
}

const mockStocks = generateMockStocks();

const initialState: StockState = {
  stocks: mockStocks,
  selectedStock: mockStocks[0] || null,
  loading: false,
  error: null,
};

const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    fetchStocksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStocksSuccess: (state, action: PayloadAction<Stock[]>) => {
      state.stocks = action.payload;
      state.loading = false;
    },
    fetchStocksFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectStock: (state, action: PayloadAction<string>) => {
      const stock = state.stocks.find((s) => s.symbol === action.payload);
      if (stock) {
        state.selectedStock = stock;
      }
    },
    updateStockPrice: (state, action: PayloadAction<StockPriceUpdate>) => {
      const { symbol, price, change, changePercent } = action.payload;

      // Update in stocks array
      const stockIndex = state.stocks.findIndex((s) => s.symbol === symbol);
      if (stockIndex >= 0) {
        // Only update if price actually changed
        if (state.stocks[stockIndex].price !== price) {
          state.stocks[stockIndex].price = price;
          state.stocks[stockIndex].change = change;
          state.stocks[stockIndex].changePercent = changePercent;

          // Also update price history for charts
          if (state.stocks[stockIndex].priceHistory) {
            const now = new Date().toISOString();
            state.stocks[stockIndex].priceHistory.push({
              time: now,
              price,
            });

            // Keep only last 100 data points using slice for better performance
            if (state.stocks[stockIndex].priceHistory.length > 100) {
              state.stocks[stockIndex].priceHistory =
                state.stocks[stockIndex].priceHistory.slice(-100);
            }
          }
        }
      }

      // Update selected stock if it's the same symbol
      if (state.selectedStock && state.selectedStock.symbol === symbol) {
        // Only update if price actually changed
        if (state.selectedStock.price !== price) {
          state.selectedStock.price = price;
          state.selectedStock.change = change;
          state.selectedStock.changePercent = changePercent;

          // Also update price history for charts
          if (state.selectedStock.priceHistory) {
            const now = new Date().toISOString();
            state.selectedStock.priceHistory.push({
              time: now,
              price,
            });

            // Keep only last 100 data points using slice for better performance
            if (state.selectedStock.priceHistory.length > 100) {
              state.selectedStock.priceHistory =
                state.selectedStock.priceHistory.slice(-100);
            }
          }
        }
      }
    },
  },
});

export const {
  fetchStocksStart,
  fetchStocksSuccess,
  fetchStocksFailure,
  selectStock,
  updateStockPrice,
} = stockSlice.actions;

export default stockSlice.reducer;
