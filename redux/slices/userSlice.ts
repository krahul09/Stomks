import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PortfolioSummary } from '@/types/user';

interface UserState {
  portfolio: PortfolioSummary;
  loading: boolean;
  error: string | null;
}

const defaultPortfolio: PortfolioSummary = {
  totalCapital: 100000, // Starting with $100,000
  availableCapital: 100000,
  investedCapital: 0,
  totalPnL: 0,
  todayPnL: 0,
  pnlPercentage: 0,
  positions: [],
};

const initialState: UserState = {
  portfolio: defaultPortfolio,
  loading: false,
  error: null,
};

// Load portfolio from localStorage
if (typeof window !== 'undefined') {
  const savedPortfolio = localStorage.getItem('portfolio');
  if (savedPortfolio) {
    initialState.portfolio = JSON.parse(savedPortfolio);
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updatePortfolio: (state, action: PayloadAction<Partial<PortfolioSummary>>) => {
      state.portfolio = {
        ...state.portfolio,
        ...action.payload,
      };
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio', JSON.stringify(state.portfolio));
      }
    },
    resetPortfolio: (state) => {
      state.portfolio = defaultPortfolio;
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio', JSON.stringify(state.portfolio));
      }
    },
  },
});

export const {
  updatePortfolio,
  resetPortfolio,
} = userSlice.actions;

export default userSlice.reducer;