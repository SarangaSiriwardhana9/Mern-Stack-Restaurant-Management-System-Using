import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import productReducer from "./productSlide";

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    product: productReducer,
  },
});
