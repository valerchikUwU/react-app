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
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "orders",
  initialState: {
    productsStart: [],
    isProduct: [],
    status: null,
    error: null,
  },
  reducers: {
    isPress(state, action) {
      state.isProduct = state.isProduct.map((product) =>
        product.id === action.payload.id
          ? { ...product, isBoolean: true }
          : { ...product, isBoolean: product.isBoolean }
      );
      console.log("state.isProduct");
      console.log(state.isProduct);
      console.log("state.isProduct");
    },

    deletePress(state, action) {
      state.isProduct = state.isProduct.map((product) =>
        product.id === action.payload.id
          ? { ...product, isBoolean: false }
          : { ...product, isBoolean: product.isBoolean }
      );

      console.log("deletePress");
      console.log(state.isProduct);
      console.log("deletePress");
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
        state.productsStart = action.payload.productsList;
        // Получаем текущее состояние isProduct
        let currentIsProduct = [...state.isProduct];

        // Добавляем новые продукты, убеждаясь, что они не являются дубликатами
        const newProducts = action.payload.productsList
          .filter(
            (product) =>
              !currentIsProduct.some(
                (currentProduct) => currentProduct.id == product.id
              )
          )
          .map((product) => ({
            ...product,
            isBoolean: false,
          }));

        // Объединяем старые и новые продукты
        state.isProduct = [...currentIsProduct, ...newProducts];
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { isPress, deletePress } = productSlice.actions;

export default productSlice.reducer;
