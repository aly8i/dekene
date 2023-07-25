import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    query: "",
    title:"",
  },
  reducers: {
    updateQuery: (state, action) => {
      state.query = action.payload.query;
    },
    updateTitle: (state, action) => {
      state.title = action.payload.title;
    },
    resetQuery: (state) => {
      state.query = "";
    },
  },
});

export const { updateQuery, resetQuery, updateTitle } = filterSlice.actions;
export default filterSlice.reducer;
