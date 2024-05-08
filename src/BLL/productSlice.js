import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "./api.js";

export const getProducts = createAsyncThunk(
 "orders/getProducts",
 async ({accountId, typeId}, { rejectWithValue }) => {
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
    status: null,
    error: null,
    saveButtonActive: {},
 },
 reducers: {
  addNewFieldToAllProducts: (state, action) => {
    state.productsStart = state.productsStart.map(product => ({
     ...product,
      button: false,

    }));
  },
  updateSaveButtonState: (state, action) => {
    const { productId, active } = action.payload;
    state.saveButtonActive[productId] = active; // Обновляем состояние для конкретного productId
    localStorage.setItem(`saveButtonActive-${productId}`, active);
    console.log(`Saved state for product ${productId}: ${active}`); // Добавьте эту строку
  },
 },
 extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.productsStart = action.payload.productsList;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
 },
});

export const {addNewFieldToAllProducts, updateSaveButtonState } = productSlice.actions;

export default productSlice.reducer;
