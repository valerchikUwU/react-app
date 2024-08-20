import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api.js";

export const getReview = createAsyncThunk(
  "review/getReview",
  async ({ accountId, date }, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(`${accountId}/reviews`);

      const priceDate = new Date(date[0]);
      const selectedDate = new Date(date[1]); // Преобразование строки даты в объект Date

      // Преобразуем даты из ответа сервера в объекты Date
      const filteredData = response.data.allPostyplenie.filter((item) => {
        const itemDate = item.timestamp;
        console.log(`itemDate ${itemDate}`);
        return itemDate >= priceDate && itemDate <= selectedDate;
      });

      let totalSum = 0;
      let totalQuantity = 0;
      let totalMainQuantity = 0;
      console.log(`date ${date}`);
      response.data.allPostyplenie.forEach((item) => {
        const itemDate = new Date(item.timestamp);
        console.log(` --------------------`);
        console.log(` itemDate ${itemDate}`);
        console.log(` priceDate ${priceDate}`);
        console.log(` selectedDate ${selectedDate}`);
        if (itemDate >= priceDate && itemDate <= selectedDate) {
          if (item.SUM !== null) {
            totalSum += parseFloat(item.SUM);
            console.log(` SUM`);
          }

          if (item.totalQuantity !== null) {
            totalQuantity += parseFloat(item.totalQuantity);
          }

          if (item.totalMainQuantity !== null) {
            totalMainQuantity += parseFloat(item.totalMainQuantity);
          }
        }
      });
      return {
        reviews: filteredData,
        SUM: totalSum,
        totalQuantity: totalQuantity,
        totalMainQuantity: totalMainQuantity,
        allOrganizations: response.data.allOrganizations,
        allCommisionRecievers: response.data.allCommisionRecievers,
        response: response,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOrganizations = createAsyncThunk(
  "review/getOrganizations",
  async ({ accountId, organizationCustomerId }, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `${accountId}/reviews/org/${organizationCustomerId}`
      );

      return {
        allOrders: response.data.allOrders,
        allProducts: response.data.allProducts,
        allPayees: response.data.allPayees,
        nameOrganization: response.data.organizationCustomer.organizationName,
        response: response,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCommision = createAsyncThunk(
  "review/getCommision",
  async ({ accountId, commisionRecieverId }, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `${accountId}/reviews/com/${commisionRecieverId}`
      );

      return {
        commisionReceiver: response.data.commisionReceiver,
        operations: response.data.operations,
      };
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
    SUM: 0,
    totalQuantity: 0,
    totalMainQuantity: 0,
    allCommisionRecievers: null,
    allOrganizations: null,
    allOrders: null,
    allProducts: null,
    allPayees: null,
    id: null,
    nameOrganization: null,
    commisionReceiver: null,
    operations: null,
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
        state.SUM = action.payload.SUM;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalMainQuantity = action.payload.totalMainQuantity;
        state.allOrganizations = action.payload.allOrganizations;
        state.allCommisionRecievers = action.payload.allCommisionRecievers;
      })
      .addCase(getReview.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })

      //getOrganizations
      .addCase(getOrganizations.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getOrganizations.fulfilled, (state, action) => {
        state.status = "resolved";
        state.allOrders = action.payload.allOrders;
        state.allProducts = action.payload.allProducts;
        state.allPayees = action.payload.allPayees;
        state.nameOrganization = action.payload.nameOrganization;
        state.id = action.payload.allOrders[0].organizationCustomerId;
      })
      .addCase(getOrganizations.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })

      //getCommision
      .addCase(getCommision.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCommision.fulfilled, (state, action) => {
        state.status = "resolved";
        state.commisionReceiver = action.payload.commisionReceiver;
        state.operations = action.payload.operations;
      })
      .addCase(getCommision.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {} = reviewSlice.actions;

export default reviewSlice.reducer;
