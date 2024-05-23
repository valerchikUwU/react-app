import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api.js";

export const getDeposit = createAsyncThunk(
  "deposit/getDeposit",
  async (accountId, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(`${accountId}/deposits`);

      console.log(response.data);
      return {organizations: response.data.organizations};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const depositAdminSlice = createSlice({
  name: "deposit",
  initialState: {
    deposits: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //getDeposit
      .addCase(getDeposit.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getDeposit.fulfilled, (state, action) => {
        state.status = "resolved";
        state.deposits = action.payload.organizations;
      })
      .addCase(getDeposit.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {} = depositAdminSlice.actions;

export default depositAdminSlice.reducer;
