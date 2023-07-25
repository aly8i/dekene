import { createSlice } from "@reduxjs/toolkit";

const defaultSlice = createSlice({
  name: "default",
  initialState: {
    currency:"$",
    langauge:"english",
    rate:100000
  },
  reducers: {
    updateCurrency: (state) => {
        if(state.currency=="$")
            state.currency = "lira";
        else
            state.currency = "$"
    },
    updateLangauge: (state, action) => {
      state.langauge = action.payload.langauge;
    },
    updateRate: (state, action) => {
        state.rate = action.payload.rate;
      },
    resetQuery: (state) => {
      state.currency = "$";
      state.langauge = "english";
      state.rate = 100000;
    },
  },
});

export const { updateLangauge, resetQuery,updateRate, updateCurrency } = defaultSlice.actions;
export default defaultSlice.reducer;
