import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Trade, OrderType } from "@/types/trade";

interface TradeState {
  trades: Trade[];
  pendingOrders: Trade[];
  loading: boolean;
  error: string | null;
}

const initialState: TradeState = {
  trades: [],
  pendingOrders: [],
  loading: false,
  error: null,
};

// Load trades from localStorage
if (typeof window !== "undefined") {
  const savedTrades = localStorage.getItem("trades");
  if (savedTrades) {
    initialState.trades = JSON.parse(savedTrades);
  }

  const pendingOrders = localStorage.getItem("pendingOrders");
  if (pendingOrders) {
    initialState.pendingOrders = JSON.parse(pendingOrders);
  }
}

const tradeSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {
    addTrade: (state, action: PayloadAction<Omit<Trade, "id">>) => {
      const newTrade: Trade = {
        ...action.payload,
        id: uuidv4(),
      };

      // Use unshift for better performance with small arrays
      state.trades.unshift(newTrade);

      // Batch localStorage updates
      if (typeof window !== "undefined") {
        requestAnimationFrame(() => {
          localStorage.setItem("trades", JSON.stringify(state.trades));
        });
      }
    },
    placeLimitOrder: (state, action: PayloadAction<Omit<Trade, "id">>) => {
      const newOrder: Trade = {
        ...action.payload,
        id: uuidv4(),
      };

      state.pendingOrders.push(newOrder);

      // Batch localStorage updates
      if (typeof window !== "undefined") {
        requestAnimationFrame(() => {
          localStorage.setItem(
            "pendingOrders",
            JSON.stringify(state.pendingOrders)
          );
        });
      }
    },
    executeLimitOrder: (state, action: PayloadAction<string>) => {
      const orderId = action.payload;
      const orderIndex = state.pendingOrders.findIndex(
        (order) => order.id === orderId
      );

      if (orderIndex >= 0) {
        const executedOrder = state.pendingOrders[orderIndex];

        // Remove from pending orders
        state.pendingOrders.splice(orderIndex, 1);

        // Add to completed trades
        state.trades.unshift({
          ...executedOrder,
          timestamp: new Date().toISOString(),
        });

        // Batch localStorage updates
        if (typeof window !== "undefined") {
          requestAnimationFrame(() => {
            localStorage.setItem("trades", JSON.stringify(state.trades));
            localStorage.setItem(
              "pendingOrders",
              JSON.stringify(state.pendingOrders)
            );
          });
        }
      }
    },
    cancelLimitOrder: (state, action: PayloadAction<string>) => {
      const orderId = action.payload;
      state.pendingOrders = state.pendingOrders.filter(
        (order) => order.id !== orderId
      );

      // Batch localStorage updates
      if (typeof window !== "undefined") {
        requestAnimationFrame(() => {
          localStorage.setItem(
            "pendingOrders",
            JSON.stringify(state.pendingOrders)
          );
        });
      }
    },
    clearAllTrades: (state) => {
      state.trades = [];
      state.pendingOrders = [];

      // Batch localStorage updates
      if (typeof window !== "undefined") {
        requestAnimationFrame(() => {
          localStorage.removeItem("trades");
          localStorage.removeItem("pendingOrders");
        });
      }
    },
  },
});

export const {
  addTrade,
  placeLimitOrder,
  executeLimitOrder,
  cancelLimitOrder,
  clearAllTrades,
} = tradeSlice.actions;

export default tradeSlice.reducer;
