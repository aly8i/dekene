import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "table",
  initialState: {
    id: null,
  },
  reducers: {
    addID: (state, action) => {
      state.id=action.payload.id;
    },
    
    resetTable: (state) => {
      state.id = null;
    },
  },
});

export const { addID, resetTable } = tableSlice.actions;
export default tableSlice.reducer;