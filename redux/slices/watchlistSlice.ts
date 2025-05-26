import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WatchlistItem } from '@/types/stock';

interface WatchlistState {
  items: WatchlistItem[];
  loading: boolean;
  error: string | null;
}

const initialState: WatchlistState = {
  items: [],
  loading: false,
  error: null,
};

// Load watchlist from localStorage
if (typeof window !== 'undefined') {
  const savedWatchlist = localStorage.getItem('watchlist');
  if (savedWatchlist) {
    initialState.items = JSON.parse(savedWatchlist);
  }
}

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<WatchlistItem>) => {
      // Check if already exists
      const exists = state.items.some(item => item.symbol === action.payload.symbol);
      if (!exists) {
        state.items.push(action.payload);
        
        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('watchlist', JSON.stringify(state.items));
        }
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.symbol !== action.payload);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('watchlist', JSON.stringify(state.items));
      }
    },
    toggleAlert: (state, action: PayloadAction<{ symbol: string, enabled: boolean }>) => {
      const { symbol, enabled } = action.payload;
      const itemIndex = state.items.findIndex(item => item.symbol === symbol);
      
      if (itemIndex >= 0) {
        state.items[itemIndex].alertEnabled = enabled;
        
        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('watchlist', JSON.stringify(state.items));
        }
      }
    },
    setAlertPrice: (state, action: PayloadAction<{ symbol: string, price: number }>) => {
      const { symbol, price } = action.payload;
      const itemIndex = state.items.findIndex(item => item.symbol === symbol);
      
      if (itemIndex >= 0) {
        state.items[itemIndex].alertPrice = price;
        
        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('watchlist', JSON.stringify(state.items));
        }
      }
    },
  },
});

export const {
  addToWatchlist,
  removeFromWatchlist,
  toggleAlert,
  setAlertPrice,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;