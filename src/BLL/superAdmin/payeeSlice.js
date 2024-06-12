import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api.js";

export const getPayee = createAsyncThunk(
  "payee/getPayee",
  async (accountId, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(`${accountId}/payees`);
      console.log(response.data.payees_list);
      return {payees: response.data.payees_list}
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postPayee = createAsyncThunk(
  "payee/postPayee",
  async ({accountId, name}, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.post(
        `${accountId}/payees/newPayee`,
        {name}
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Пиздец");
      return rejectWithValue(error.message);
    }
  }
);

const payeeSlice = createSlice({
  name: "payee",
  initialState: {
    payees: [],
    status: null,
    error: null,
    dummyKey: 0,
  },
  reducers: {
    incrementDummyKey(state, action) {
      state.dummyKey += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      //getPayee
      .addCase(getPayee.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getPayee.fulfilled, (state, action) => {
        state.status = "resolved";
        state.payees = action.payload.payees;
      })
      .addCase(getPayee.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {incrementDummyKey} = payeeSlice.actions;

export default payeeSlice.reducer;
