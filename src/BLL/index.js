import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import completedReducer from './completedSlice';
import workReducer from './workSlice';
import depositReducer from './depositSlice';

export default configureStore({
  reducer: {
    products: productReducer,
    completed: completedReducer,
    work: workReducer,
    deposit: depositReducer,
  },
});