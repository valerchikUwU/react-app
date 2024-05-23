import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api.js";

export const getArchive = createAsyncThunk(
  "archive/getArchive",
  async (accountId, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(`${accountId}/orders/archive`);

      console.log(response.data);
      return  {orders_list: response.data.orders_list};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const archiveSlice = createSlice({
  name: "archive",
  initialState: {
    archive: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //getArchive
      .addCase(getArchive.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getArchive.fulfilled, (state, action) => {
        state.status = "resolved";
        state.archive = action.payload.orders_list;
      })
      .addCase(getArchive.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {} = archiveSlice.actions;

export default archiveSlice.reducer;
