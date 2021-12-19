import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'market',
  initialState: {
    value: 0,
    mynfts: [],
    marketNfts: []
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

    // Use the PayloadAction type to declare the contents of `action.payload`
    setMyNfts: (state, action) => {
      state.mynfts = action.payload;
    },
    setMarketNfts: (state, action) => {
        state.marketNfts = action.payload;
      },
  },
});

export const { setMyNfts,  setMarketNfts} = appSlice.actions;

export const selectMarketnfts = (state) => state.market.marketNfts;
export const selectmyNfts = (state) => state.market.mynfts;

export default appSlice.reducer;
 