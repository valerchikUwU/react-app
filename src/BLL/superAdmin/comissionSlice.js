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
  async ({ accountId, commisionRecieverId }, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(
        `${accountId}/commisionRecievers/${commisionRecieverId}/rulesDetails`
      );
      console.log(response.data);
      return {
        rules: response.data.allRules,
        allProducts: response.data.allProducts,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getBalance = createAsyncThunk(
  "commision/getBalance",
  async ({ accountId, commisionRecieverId }, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(
        `${accountId}/commisionRecievers/${commisionRecieverId}/balanceDetails`
      );
      console.log(response.data);
      return {
        commisionReciever: response.data.commisionReceiver,
        allPostyplenie: response.data.allPostyplenie,
        operations: response.data.operations,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postCommision = createAsyncThunk(
  "commision/postCommision",
  async ({ accountId, commisionRecieverName }, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.post(
        `${accountId}/newCommisionReciever`,
        { commisionRecieverName }
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Пиздец");
      return rejectWithValue(error.message);
    }
  }
);

export const postReciever = createAsyncThunk(
  "commision/postReciever",
  async ({ accountId, commisionRecieverId, billNumber, Spisanie }, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.post(
        `${accountId}/commisionRecievers/${commisionRecieverId}/balanceDetails/newOperation`,
        {billNumber, Spisanie}
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Пиздец");
      return rejectWithValue(error.message);
    }
  }
);

export const putAccrualRule = createAsyncThunk(
  "commision/putAccrualRule",
  async (
    { accountId, commisionRecieverId, rulesToUpdate },
    { rejectWithValue }
  ) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.put(
        `${accountId}/commisionRecievers/${commisionRecieverId}/rulesDetails/update`,
        { rulesToUpdate }
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Пиздец");
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRule = createAsyncThunk(
  "commision/deleteRule",
  async ({ accountId, commisionRecieverId, ruleId }, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.delete(
        `${accountId}/${commisionRecieverId}/${ruleId}/delete`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Пиздец");
      return rejectWithValue(error.message);
    }
  }
);

const commisionSlice = createSlice({
  name: "commision",
  initialState: {
    commision: [],
    rules: [],
    allProducts: [],
    commisionReceiver: {},
    allPostyplenie: [],
    operations: [],
    dummyKey: 0,
    status: null,
    error: null,
  },
  reducers: {
    incrementDummyKey(state, action) {
      state.dummyKey += 1;
    },
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
        state.rules = action.payload.rules;
        state.allProducts = action.payload.allProducts;
      })
      .addCase(getRules.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      //getBalance
      .addCase(getBalance.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.status = "resolved";
        state.commisionReceiver = action.payload.commisionReciever;
        state.allPostyplenie = action.payload.allPostyplenie;
        state.operations = action.payload.operations;
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { incrementDummyKey } = commisionSlice.actions;

export default commisionSlice.reducer;
