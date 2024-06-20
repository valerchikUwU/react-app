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

      // Отсортировка массива orders_list по полю organizationName
      const sortedOrdersList = response.data.orders_list.sort((a, b) => {
        if (a.organizationName > b.organizationName) {
          return 1; // a идет после b
        }
        if (a.organizationName < b.organizationName) {
          return -1; // a идет перед b
        }
        return 0; // a и b равны
      });

      return { orders_list: sortedOrdersList };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getNewOrder = createAsyncThunk(
  "order/getNewOrder",
  async (accountId, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(`${accountId}/orders/admin/newOrder`);

      console.log(response.data);
      return {
        allProducts: response.data.allProducts,
        allOrganizations: response.data.allOrganizations,
        allPayees: response.data.allPayees,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOrderModal = createAsyncThunk(
  "order/getOrderModal",
  async ({ accountId, orderId }, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(
        `/${accountId}/orders/admin/${orderId}`
      );
      console.log(response.data);
      return {
        order: response.data.order,
        titles: response.data.titles,
        products: response.data.products,
        payees: response.data.payees,
        allOrganizationsModal: response.data.allOrganizations,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const putNewOrder = createAsyncThunk(
  "order/putNewOrder",
  async (
    {
      accountId,
      organizationCustomerId,
      status,
      billNumber,
      payeeId,
      isFromDeposit,
      titlesToCreate,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await instance.post(
        `/${accountId}/orders/admin/newOrder`,
        {
          organizationCustomerId,
          status,
          billNumber,
          payeeId,
          isFromDeposit,
          titlesToCreate,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTitleOrderAdmin = createAsyncThunk(
  "order/updateTitleOrderAdmin",
  async (
    {
      accountId,
      orderId,
      organizationName,
      status,
      billNumber,
      payeeId,
      isFromDeposit,
      titlesToUpdate,
      titlesToCreate
    },
    { rejectWithValue }
  ) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.put(
        `/${accountId}/orders/admin/${orderId}/update`,
        {
          organizationName,
          status,
          billNumber,
          payeeId,
          isFromDeposit,
          titlesToUpdate,
          titlesToCreate
        }
      );
      console.log(response.data.organizationName);
      console.log(response.data.status);
      console.log(response.data.billNumber);
      console.log(response.data.payeeId);
      console.log(response.data.isFromDeposit);
      console.log(response.data.titlesToUpdate);
      return response.data.titlesToUpdate;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    modalOrder: {},
    modalTitles: [],
    products: [],
    payees: [],
    allProducts: [],
    allOrganizations: [],
    allOrganizationsModal: [],
    allPayees: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //getOrder
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
      //getNewOrder
      .addCase(getNewOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getNewOrder.fulfilled, (state, action) => {
        state.status = "resolved";
        state.allProducts = action.payload.allProducts;
        state.allOrganizations = action.payload.allOrganizations;
        state.allPayees = action.payload.allPayees;
      })
      .addCase(getNewOrder.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      //getOrderModal
      .addCase(getOrderModal.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getOrderModal.fulfilled, (state, action) => {
        state.status = "resolved";
        state.modalOrder = action.payload.order;
        state.modalTitles = action.payload.titles;
        state.products = action.payload.products;
        state.payees = action.payload.payees;
        state.allOrganizationsModal = action.payload.allOrganizationsModal;
      })
      .addCase(getOrderModal.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      //updateTitleOrderAdmin
      .addCase(updateTitleOrderAdmin.pending, (state) => {
        console.log("updateTitleOrderAdmin pending");
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateTitleOrderAdmin.fulfilled, (state, action) => {
        console.log("updateTitleOrderAdmin fulfilled", action.payload);
        state.status = "resolved";
      })
      .addCase(updateTitleOrderAdmin.rejected, (state, action) => {
        console.log("updateTitleOrderAdmin rejected", action.payload);
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
