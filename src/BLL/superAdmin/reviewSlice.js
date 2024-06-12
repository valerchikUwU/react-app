import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api.js";

export const getReview = createAsyncThunk(
  "review/getReview",
  async ({ accountId, date }, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(`${accountId}/reviews`);

      const priceDate = date[0].format("DD-MM-YYYY");
      const selectedDate = date[1].format("DD-MM-YYYY"); // Преобразование строки даты в объект Date

      // Преобразуем даты из ответа сервера в объекты Date
      const filteredData = response.data.allPostyplenie.filter((item) => {
        const itemDate = item.formattedDispatchDate;
        console.log(`itemDate ${itemDate}`);
        return itemDate >= priceDate && itemDate <= selectedDate;
      });

      let totalSum = 0;
      let totalQuantity = 0;
      let totalMainQuantity = 0;

      response.data.allPostyplenie.forEach((item) => {
        const itemDate = item.formattedDispatchDate;
        if (itemDate >= priceDate && itemDate <= selectedDate) {
          if (item.SUM !== null) {
            totalSum += parseFloat(item.SUM);
          }

          if (item.totalQuantity !== null) {
            totalQuantity += parseFloat(item.totalQuantity);
          }

          if (item.totalMainQuantity !== null) {
            totalMainQuantity += parseFloat(item.totalMainQuantity);
          }
        }
      });

      console.log(`priceDate${priceDate}`);
      console.log(`selectedDate${selectedDate}`);
      console.log(response.data.allPostyplenie);
      console.log(filteredData);
      return {
        reviews: filteredData,
        SUM: totalSum,
        totalQuantity: totalQuantity,
        totalMainQuantity: totalMainQuantity,
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
      })
      .addCase(getReview.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {} = reviewSlice.actions;

export default reviewSlice.reducer;
