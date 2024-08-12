import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api.js";

export const getDeposit = createAsyncThunk(
  "deposit/getDeposit",
  async (accountId, { rejectWithValue }) => {
    try {
      const response = await instance.get(`${accountId}/deposits`);
      console.log(response.data);
      return { organizations: response.data.organizations };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getDepositBalance = createAsyncThunk(
  "deposit/getDepositBalance",
  async ({ accountId, organizationCustomerId }, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `${accountId}/deposits/${organizationCustomerId}`
      );
      const sortedOrders = response.data.orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      const reverseArray = sortedOrders.reverse();
       
      let balance = 0;
      const updatedArray = reverseArray.map((item) => {
        if (item.Spisanie !== null) {
          balance += Number(item.Spisanie);
          console.log(`balance Spisanie ${balance}`);
        }
        if (item.Deposit !== null) {
          balance += Number(item.Deposit);
          console.log(`balance Deposit ${balance}`);
        }
      
        // Возвращаем новый объект, содержащий все свойства оригинального объекта + поле balance
        return {
          ...item,
          balance: balance,
        };
      });

      console.log(response.data);
      console.log(sortedOrders);
      return {
        organization: response.data.organization,
        orders: updatedArray.reverse(),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const depositSuperAdminSlice = createSlice({
  name: "deposit",
  initialState: {
    deposits: [],
    orders: [],
    organization: [],
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
      })
      //getDepositBalance
      .addCase(getDepositBalance.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getDepositBalance.fulfilled, (state, action) => {
        state.status = "resolved";
        state.organization = action.payload.organization;
        state.orders = action.payload.orders;
      })
      .addCase(getDepositBalance.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {} = depositSuperAdminSlice.actions;

export default depositSuperAdminSlice.reducer;
