import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "./api.js";

export const getCompleted = createAsyncThunk(
  "completed/getCompleted",
  async (accountId, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(
        `${accountId}/orders/finished`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const completedSlice = createSlice({
  name: "completed",
  initialState: {
    completed: [],
    status: null,
    error: null,

  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompleted.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getCompleted.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.completed = action.payload.orders_list;
      })
      .addCase(getCompleted.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
 },
});

export const {} = completedSlice.actions;

export default completedSlice.reducer;
