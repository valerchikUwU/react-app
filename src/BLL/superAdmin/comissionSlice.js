import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api.js";

export const getComission = createAsyncThunk(
  "commision/getComission",
  async (accountId, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(`${accountId}/commisionRecievers`);
      console.log(response.data.allCommisionRecievers);
      return response.data.allCommisionRecievers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getRules = createAsyncThunk(
  "commision/getRules",
  async ({accountId, commisionRecieverId}, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(`${accountId}/commisionRecievers/${commisionRecieverId}/rulesDetails`);
      console.log(response.data.allRules);
      return response.data.allRules;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const commisionSlice = createSlice({
  name: "commision",
  initialState: {
    commision: [],
    rules:[],
    newRules:[],
    status: null,
    error: null,
  },
  reducers: {
    createProducts(state, action){
      state.newRules = [
        ...state.newRules,
        {
          id: new Date().toISOString(),
          groupProducts: action.payload.groupProducts,
          products: action.payload.products,
          generation: action.payload.generation,
          accessType: action.payload.accessType,
          accrual: action.payload.accrual
        }
     ];
    }
  },
  extraReducers: (builder) => {
    builder
      //getComission
      .addCase(getComission.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getComission.fulfilled, (state, action) => {
        state.status = "resolved";
        state.commision = action.payload;
      })
      .addCase(getComission.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      //getRules
      .addCase(getRules.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getRules.fulfilled, (state, action) => {
        state.status = "resolved";
        state.rules = action.payload;
      })
      .addCase(getRules.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {createProducts} = commisionSlice.actions;

export default commisionSlice.reducer;
