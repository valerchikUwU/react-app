import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api.js";

export const getReview = createAsyncThunk(
  "review/getReview",
  async (accountId, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(`${accountId}/reviews`);
      console.log(response.dataallPostyplenie);
      return {reviews: response.data.allPostyplenie}
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //getReview
      .addCase(getReview.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.status = "resolved";
        state.reviews = action.payload.reviews;
      })
      .addCase(getReview.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {} = reviewSlice.actions;

export default reviewSlice.reducer;
