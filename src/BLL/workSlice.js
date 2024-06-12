import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "./api.js";




export const getWork = createAsyncThunk(
  "work/getWork",
  async (accountId, { rejectWithValue }) => {

    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(
        `${accountId}/orders`
      );

      console.log(response.data);
      return {orders_list: response.data.orders_list, organizationList: response.data.organizationList};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getWorkModal = createAsyncThunk(
  "work/getWorkModal",
  async ({accountId, orderId}, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(
        `/${accountId}/orders/${orderId}`
      );
      console.log(response.data.products);
      return {order: response.data.order, titles: response.data.titles, products: response.data.products};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const putOrders = createAsyncThunk(
  "work/putOrders",
  async ({ accountId, productData }, { rejectWithValue }) => {
    // Функция для отложенного выполнения запроса
    const delayedPost = async () => {
      if (navigator.onLine) {
        try {
          const response = await instance.post(`/${accountId}/orders/newOrder`, productData);
          console.log(response.data);
          return response.data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      } else {
        // Если устройство офлайн, отложить выполнение
        setTimeout(delayedPost, 10000);
        console.log('retry post') // Проверять каждые 5 секунд
      }
    };

    // Начинаем процесс с проверкой статуса сети
    delayedPost();
  }
);


export const updateDraft = createAsyncThunk(
  "work/updateDraft",
  async ({ accountId, orderId, organizationName }, { rejectWithValue }) => {
    // Функция для отложенного выполнения запроса
    const delayedUpdate = async () => {
      if (navigator.onLine) {
        try {
          const response = await instance.put(`/${accountId}/orders/${orderId}/active`, { organizationName });
          return response.data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      } else {
        // Если устройство офлайн, отложить выполнение
        setTimeout(delayedUpdate, 10000); // Проверять каждые 5 секунд
      }
    };

    // Начинаем процесс с проверкой статуса сети
    delayedUpdate();
  }
);

export const updateRecieved = createAsyncThunk(
  "work/updateRecieved",
  async ({ accountId, orderId }, { rejectWithValue }) => {
    // Функция для отложенного выполнения запроса
    const delayedUpdate = async () => {
      if (navigator.onLine) {
        try {
          const response = await instance.put(`/${accountId}/orders/${orderId}/recieved`);
          return response;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      } else {
        // Если устройство офлайн, отложить выполнение
        setTimeout(delayedUpdate, 10000); // Проверять каждые 5 секунд
      }
    };

    // Начинаем процесс с проверкой статуса сети
    delayedUpdate();
  }
);



export const updateTitleOrder = createAsyncThunk(
  "work/updateTitleOrder",
  async ({ accountId, orderId, titlesToUpdate}, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.put(
        `/${accountId}/orders/${orderId}/update`,{titlesToUpdate}
      );
      return response.data.titlesToUpdate;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const deleteTitleOrder = createAsyncThunk(
  "work/deleteTitleOrder",
  async ({ accountId, orderId, titleId}, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.delete(
        `/${accountId}/orders/${orderId}/delete/${titleId}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const workSlice = createSlice({
  name: "work",
  initialState: {
    // drafts: [],
    work: [],
    organizationList:[],
    workModalOrder:{},
    workModalTitles:[],
    products:[],
    status: null,
    error: null,

  },
  reducers: {
    addWork(state, action) {
      state.work = [
         ...state.work,
         {
           productId: action.payload.productId,
           accessType: action.payload.accessType,
           generation: action.payload.generation,
           addBooklet: action.payload.addBooklet,
           quantity: action.payload.quantity
         }
      ];
     }, 
  },
  extraReducers: (builder) => {
    builder
    //getWork
      .addCase(getWork.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getWork.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.work = action.payload.orders_list;
        state.organizationList = action.payload.organizationList;
      })
      .addCase(getWork.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      //getWorkModal
      .addCase(getWorkModal.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getWorkModal.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.workModalOrder = action.payload.order;
        state.workModalTitles = action.payload.titles;
        state.products = action.payload.products;
      })
      .addCase(getWorkModal.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
  //updateDraft
      .addCase(updateDraft.pending, (state) => {
        console.log('updateDraft pending');
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateDraft.fulfilled, (state, action) => {
        console.log('updateDraft fulfilled', action.payload);
        state.status = 'resolved';
        // state.drafts = action.payload;
      })
      .addCase(updateDraft.rejected, (state, action) => {
        console.log('updateDraft rejected', action.payload);
        state.status = 'rejected';
        state.error = action.payload;
      })
    //updateRecieved
     .addCase(updateRecieved.pending, (state) => {
      console.log('updateResieved pending');
      state.status = 'loading';
      state.error = null;
    })
   .addCase(updateRecieved.fulfilled, (state, action) => {
      console.log('updateResieved fulfilled', action.payload);
      state.status = 'resolved';
    })
   .addCase(updateRecieved.rejected, (state, action) => {
      console.log('updateResieved rejected', action.payload);
      state.status = 'rejected';
      state.error = action.payload;
    })
     //updateTitleOrder
     .addCase(updateTitleOrder.pending, (state) => {
      console.log('updateTitleOrder pending');
      state.status = 'loading';
      state.error = null;
    })
    .addCase(updateTitleOrder.fulfilled, (state, action) => {
      console.log('updateTitleOrder fulfilled', action.payload);
      state.status = 'resolved';
      // state.drafts = action.payload;
    })
    .addCase(updateTitleOrder.rejected, (state, action) => {
      console.log('updateTitleOrder rejected', action.payload);
      state.status = 'rejected';
      state.error = action.payload;
    })
     //deleteTitleOrder
     .addCase(deleteTitleOrder.pending, (state) => {
      console.log('deleteTitleOrder pending');
      state.status = 'loading';
      state.error = null;
    })
   .addCase(deleteTitleOrder.fulfilled, (state, action) => {
      console.log('deleteTitleOrder fulfilled', action.payload);
      state.status = 'resolved';
    })
   .addCase(deleteTitleOrder.rejected, (state, action) => {
      console.log('deleteTitleOrder rejected', action.payload);
      state.status = 'rejected';
      state.error = action.payload;
    });
 },
});

export const {actions, addWork} = workSlice.actions;

export default workSlice.reducer;
