import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "./api.js";

export const postHeader = createAsyncThunk(
 "header/postHeader",
 async ({accountId}, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        `${accountId}/logout`
      ).then(() => {
        window.location.href = `#/`;
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
 }
);

const depositSlice = createSlice({
 name: "header",
 initialState: {
    status: null,
    error: null,
 },
 reducers: {},
 extraReducers: (builder) => {
    builder
      //postHeader
      .addCase(postHeader.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(postHeader.fulfilled, (state) => {
        state.status = 'resolved';
      })
      .addCase(postHeader.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
 },
});

export const {} = depositSlice.actions;

export default depositSlice.reducer;
