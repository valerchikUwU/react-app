import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "./api.js";

export const getProducts = createAsyncThunk(
  "orders/getProducts",
  async ({ accountId, typeId }, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `${accountId}/productsByType/${typeId}`
      );
      console.log(response.data.productsList);
      // Убедитесь, что typeId передается в полезную нагрузку
      return { productsList: response.data.productsList, typeId: typeId };
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);

export const getDraft = createAsyncThunk(
  "orders/getDraft",
  async (accountId, { rejectWithValue }) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.get(`${accountId}/orders`);

      console.log(response.data.productsInDraft);
      return { productsInDraft: response.data.productsInDraft[0].productIds };
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);

const productSlice = createSlice({
  name: "orders",
  initialState: {
    productsStart: [],
    isProduct: [],
    isProductsDraft: [],
    productsInDraft: null,
    status: null,
    error: null,
    countButton: 0,
    totalCheck: true,
  },
  reducers: {
    countClick(state) {
      state.countButton += 1;
    },
    deleteCountClick(state) {
      state.countButton = 0;
    },
    decrementCountClick(state) {
      state.countButton -= 1;
    },
    total(state) {
      if (state.totalCheck === true) {
        const count = state.productsInDraft?.split(",");
        if (count?.length > 0) {
          state.countButton += count?.length;
        }
        state.totalCheck = false;
      }
    },
    isPress(state, action) {
      state.isProduct = state.isProduct.map((product) =>
        product.id === action.payload.id
          ? { ...product, isBoolean: true }
          : { ...product, isBoolean: product.isBoolean }
      );
    },

    deletePress(state, action) {
      state.isProduct = state.isProduct.map((product) =>
        product.id === action.payload.id
          ? { ...product, isBoolean: false }
          : { ...product, isBoolean: product.isBoolean }
      );
    },

    deletePressArray(state, action) {
      // Перебираем каждый продукт в state.isProduct
      state.isProduct = state.isProduct.map((product) => {
        // Проверяем, есть ли совпадение id с одним из объектов в action.payload
        const isMatched = action.payload.some(
          (payloadProduct) => payloadProduct.id === product.id
        );

        // Возвращаем новый объект продукта с обновленным значением isBoolean
        return { ...product, isBoolean: isMatched };
      });
    },

    deletePressSend(state, action) {
      // Перебираем каждый продукт в state.isProduct
      state.isProduct = state.isProduct.map((product) => {
        // Возвращаем новый объект продукта с обновленным значением isBoolean
        return { ...product, isBoolean: false };
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = 200;
        state.productsStart = action.payload.productsList;
        // Получаем текущее состояние isProduct
        let currentIsProduct = [...state.isProduct];
        let filteredIsProductsDraft = [];
        
        if(currentIsProduct != null){
           filteredIsProductsDraft = currentIsProduct.map(product => {
          const isInCurrentIsProduct = state.isProductsDraft.some(currentProduct => currentProduct.id === product.id);
          return {
           ...product,
            isBoolean: isInCurrentIsProduct,
          };
        });
        }
        console.log('currentIsProduct');
        console.log(filteredIsProductsDraft);
        // Добавляем новые продукты, убеждаясь, что они не являются дубликатами
        const newProducts = action.payload.productsList
        .filter(
           (product) =>
            !currentIsProduct.some(
               (currentProduct) => currentProduct.id === product.id
             )
         )
        .map((product) => {
           const isDraft = state.isProductsDraft.some(draft => draft.id === product.id);
           return {
            ...product,
             isBoolean: isDraft,
           };
         });
       

        // Объединяем старые и новые продукты
        state.isProduct = [...filteredIsProductsDraft, ...newProducts];
        console.log(`state.getProducts`);
        console.log(state.isProduct);
      })

      .addCase(getProducts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })

      //getDraft
      .addCase(getDraft.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(getDraft.fulfilled, (state, action) => {
        state.status = "resolved";
        state.productsInDraft = action.payload.productsInDraft;

        if (state.productsInDraft !== null) {
          const productIds = state.productsInDraft.split(",");

          const productsArray = productIds.map((id) => ({
            id: id.trim(),
            isBoolean: true,
          }));

          state.isProductsDraft = productsArray;

          console.log(`state.getDraft`);
          console.log(state.isProductsDraft);
        }
      })

      .addCase(getDraft.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {
  isPress,
  deletePress,
  deletePressArray,
  deletePressSend,
  countClick,
  deleteCountClick,
  decrementCountClick,
  total,
} = productSlice.actions;

export default productSlice.reducer;
