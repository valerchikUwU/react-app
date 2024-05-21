import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api.js";

export const getPriceList = createAsyncThunk(
  "order/getPriceList",
  async (accountId, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(`${accountId}/prices`);

      console.log(response.data.pricesForEmployers);
      return {pricesInit: response.data.pricesInit, pricesMain: response.data.pricesMain, pricesForEmployers: response.data.pricesForEmployers};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    pricesInit: [],
    pricesMain: [],
    pricesForEmployers: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //getPriceList
      .addCase(getPriceList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getPriceList.fulfilled, (state, action) => {
        state.status = "resolved";
        state.pricesInit = action.payload.pricesInit;
        state.pricesMain = action.payload.pricesMain;
        state.pricesForEmployers = action.payload.pricesForEmployers;
      })
      .addCase(getPriceList.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
