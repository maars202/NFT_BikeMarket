import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import MarketSlice from '../features/marketItemsSlice';


export const store = configureStore({
  reducer: {
    market: MarketSlice,
  },
});
