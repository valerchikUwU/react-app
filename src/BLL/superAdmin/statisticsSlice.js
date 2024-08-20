import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api.js";

// export const getStatistics = createAsyncThunk(
//   "statistics/getStatistics",
//   async ({ accountId, date }, { rejectWithValue }) => {
//     try {
//       // Используем шаблонные строки для динамического формирования URL
//       const response = await instance.get(`${accountId}/statistics`);   
//         const filter = response.data.orders.filter(item => {
//         const itemDate = new Date(item.timestamp);
//         const selectedDate = new Date(date); // Преобразование строки даты в объект Date
//         console.log(selectedDate);
//         return (
//           selectedDate.getFullYear() <= itemDate.getFullYear() &&
//           selectedDate.getMonth() <= itemDate.getMonth() && // Месяцы индексируются с 0
//           selectedDate.getDate() <= itemDate.getDate()
//         );
//       });

//       filter.sort((a,b) => {
//         if(a.timestamp > b.timestamp) {
//           return 1;
//         }else if (a.timestamp < b.timestamp) {
//           return -1;
//         }
//         return 0;
//       })
//       console.log(`filter ${filter}`);
//       console.log(response);
//       return  {statistics: filter, response: response};
      
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const getStatistics = createAsyncThunk(
  "statistics/getStatistics",
  async ({ accountId }, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(`${accountId}/statistics`);   
      
      return  {statistics: response.data.orders, response: response};
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const statisticsSlice = createSlice({
  name: "statistics",
  initialState: {
    statistics: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //getStatistics
      .addCase(getStatistics.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.status = "resolved";
        state.statistics = action.payload.statistics;
        state.response = action.payload.response;
      })
      .addCase(getStatistics.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {} = statisticsSlice.actions;

export default statisticsSlice.reducer;
