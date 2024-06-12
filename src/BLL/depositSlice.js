import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "./api.js";

export const getDeposit = createAsyncThunk(
 "deposit/getDeposit",
 async ({accountId, typeId}, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `${accountId}/productsByType/${typeId}`
      );
      console.log(response.data.productsList);
      console.log(response.data.organizations);
      // Убедитесь, что typeId передается в полезную нагрузку
      return { productsList:response.data.productsList, organizations: response.data.organizations};
    } catch (error) {
      return rejectWithValue(error.message);
    }
 }
);

export const putDeposit = createAsyncThunk(
  "deposit/putDeposit",
  async ({ accountId, productData }, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.post(
        `/${accountId}/orders/newOrder`, productData
      );
      console.log(response.status);
      return {status: response.status};
    } catch (error) {
      console.log(error.response.status);
      return rejectWithValue(error.response.status);
    }
  }
);

const depositSlice = createSlice({
 name: "deposit",
 initialState: {
    deposit:[],
    organizations:[],
    status: null,
    error: null,
    errorDeposit: null,
 },
 reducers: {},
 extraReducers: (builder) => {
    builder
    //getDeposit
      .addCase(getDeposit.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getDeposit.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.deposit = action.payload.productsList;
        state.organizations = action.payload.organizations;
      })
      .addCase(getDeposit.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      //putDeposit
      .addCase(putDeposit.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
        state.errorDeposit = null;
      })
      .addCase(putDeposit.fulfilled, (state, action) => {
        state.status = 'resolved'; 
        state.errorDeposit = action.payload.status;
      })
      .addCase(putDeposit.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
        state.errorDeposit = action.payload;
      });
 },
});

export const {} = depositSlice.actions;

export default depositSlice.reducer;
