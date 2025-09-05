import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api.js";

export const getComission = createAsyncThunk(
  "commision/getComission",
  async (accountId, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(`${accountId}/commisionRecievers`);
      const comision = [];

      response.data.allCommisionRecievers.map((allCommisionRecievers) => {
        response.data.commisionReceiverOperations.map(
          (commisionReceiverOperations) => {
            if (
              allCommisionRecievers.id ===
              commisionReceiverOperations.commisionRecieverId
            ) {
              comision.push({
                ...allCommisionRecievers,
                balance:
                  commisionReceiverOperations.allPostyplenie -
                  commisionReceiverOperations.allSpisanie,
              });
            }
          }
        );
      });

      const missingItems = response.data.allCommisionRecievers.filter(
        (receiver) =>
          !comision.some((commission) => commission.id === receiver.id)
      );

      const endArray = comision.concat(missingItems);

      return {
        commision: endArray,
        response: response,
      };
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
        response: response,
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

      const sortedOperations = [...response.data.operations].sort(
        (a, b) => new Date(b.dateOfOperation) - new Date(a.dateOfOperation)
      );

      const reverseArray = sortedOperations.reverse();

      let balance = 0;
      const updatedArray = reverseArray.map((item) => {
        if (item.Spisanie !== undefined) {
          balance -= Number(item.Spisanie);
          console.log(`balance Spisanie ${balance}`);
        }
        if (item.Postyplenie !== undefined) {
          balance += Number(item.Postyplenie);
          console.log(`balance Postyplenie ${balance}`);
        }
        return {
          ...item,
          balance: balance,
        };
      });

      console.log(`updatedArray ${updatedArray}`);

      return {
        commisionReciever: response.data.commisionReceiver,
        operations: updatedArray.reverse(),
        response: response,
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
  async (
    { accountId, commisionRecieverId, billNumber, Spisanie },
    { rejectWithValue }
  ) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.post(
        `${accountId}/commisionRecievers/${commisionRecieverId}/balanceDetails/newOperation`,
        { billNumber, Spisanie }
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
    combine: [],
    dummyKey: 0,
    status: null,
    error: null,
    errorPostCommision: null,
    errorPutAccrualRule: null,
    errorDeleteRule: null,
    errorPostReciever: null,
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
        state.commision = action.payload.commision;
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
        state.combine = action.payload.combine;
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      //postCommision
      .addCase(postCommision.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.errorPostCommision = null;
      })
      .addCase(postCommision.fulfilled, (state, action) => {
        state.status = "resolved";
        state.errorPostCommision = 200;
      })
      .addCase(postCommision.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
        state.errorPostCommision = "что-то пошло не так";
      })
      //putAccrualRule
      .addCase(putAccrualRule.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.errorPutAccrualRule = null;
      })
      .addCase(putAccrualRule.fulfilled, (state, action) => {
        state.status = "resolved";
        state.errorPutAccrualRule = 200;
      })
      .addCase(putAccrualRule.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
        state.errorPutAccrualRule = "что-то пошло не так";
      })
      //deleteRule
      .addCase(deleteRule.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.errorDeleteRule = null;
      })
      .addCase(deleteRule.fulfilled, (state, action) => {
        state.status = "resolved";
        state.errorDeleteRule = 200;
      })
      .addCase(deleteRule.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
        state.errorDeleteRule = "что-то пошло не так";
      })
            //postReciever
            .addCase(postReciever.pending, (state) => {
              state.status = "loading";
              state.error = null;
              state.errorPostReciever = null;
            })
            .addCase(postReciever.fulfilled, (state, action) => {
              state.status = "resolved";
              state.errorPostReciever = 200;
            })
            .addCase(postReciever.rejected, (state, action) => {
              state.status = "rejected";
              state.error = action.payload;
              state.errorPostReciever = "что-то пошло не так";
            });
  },
});

export const { incrementDummyKey } = commisionSlice.actions;

export default commisionSlice.reducer;
