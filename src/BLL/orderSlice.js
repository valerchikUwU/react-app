import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
    },
    reducers: {
    },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;