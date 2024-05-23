import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api.js";

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (accountId, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(`${accountId}/orders/all`);

      console.log(response.data);
      return {orders_list: response.data.orders_list};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOrderModal = createAsyncThunk(
  "work/getOrderModal",
  async ({accountId, orderId}, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(
        `/${accountId}/orders/admin/${orderId}`
      );
      console.log(response.data);
      return {order: response.data.order, titles: response.data.titles, products: response.data.products, payees: response.data.payees};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    modalOrder:{},
    modalTitles:[],
    products:[],
    payees:[],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //getWork
      .addCase(getOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.status = "resolved";
        state.orders = action.payload.orders_list;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
        //getOrderModal
        .addCase(getOrderModal.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(getOrderModal.fulfilled, (state, action) => {
          state.status = 'resolved';
          state.modalOrder = action.payload.order;
          state.modalTitles = action.payload.titles;
          state.products = action.payload.products;
          state.payees = action.payload.payees;
        })
        .addCase(getOrderModal.rejected, (state, action) => {
          state.status = 'rejected';
          state.error = action.payload;
        });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
