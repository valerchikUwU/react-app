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
      selectedFile
    },
    { rejectWithValue }
  ) => {
    try {
    // Создаем экземпляр FormData
    const formData = new FormData();
      
    // Добавляем все необходимые данные в formData
    formData.append('name', name || '');
    formData.append('productTypeId', productTypeId.toString());
    formData.append('abbreviation', abbreviation);
    formData.append('priceAccess', priceAccess);
    formData.append('priceBooklet', priceBooklet);
    formData.append('activationDate', activationDate.toISOString()); // Преобразование даты в строку ISO
    formData.append('image', selectedFile); // Добавляем файл
    
    // Используем шаблонные строки для динамического формирования URL
    const response = await instance.post(`${accountId}/prices/newPrice`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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
