import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api.js";

export const getModalAbbrevation = createAsyncThunk(
  "priceList/getModalAbbrevation",
  async (accountId, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(`${accountId}/prices/newPrice`);

      console.log(response.data);
      return { nameСourses: response.data.products };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPriceList = createAsyncThunk(
  "priceList/getPriceList",
  async ({accountId}, { rejectWithValue }) => {
    try {
      const response = await instance.get(`${accountId}/prices`);
      
      console.log(response.data);
      return {
        pricesInit: response.data.pricesInit,
        pricesMain: response.data.pricesMain,
        pricesForEmployers: response.data.pricesForEmployers,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postPrice = createAsyncThunk(
  "priceList/newPrice",
  async (
    {
      accountId,
      productTypeId,
      name,
      abbreviation,
      priceAccess,
      priceBooklet,
      activationDate,
    },
    { rejectWithValue }
  ) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.post(`${accountId}/prices/newPrice`, {
        name,
        productTypeId,
        abbreviation,
        priceAccess,
        priceBooklet,
        activationDate,
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Пиздец");
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    pricesInit: [],
    pricesMain: [],
    pricesForEmployers: [],
    nameСourses: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //getPriceList
      .addCase(getPriceList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getPriceList.fulfilled, (state, action) => {
        state.status = "resolved";
        state.pricesInit = action.payload.pricesInit;
        state.pricesMain = action.payload.pricesMain;
        state.pricesForEmployers = action.payload.pricesForEmployers;
      })
      .addCase(getPriceList.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      //getModalAbbrevation
      .addCase(getModalAbbrevation.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getModalAbbrevation.fulfilled, (state, action) => {
        state.status = "resolved";
        state.nameСourses = action.payload.nameСourses;
      })
      .addCase(getModalAbbrevation.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
