import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./product/productsSlice";

export default configureStore({
  reducer: {
    products: productsSlice,
  },
});
