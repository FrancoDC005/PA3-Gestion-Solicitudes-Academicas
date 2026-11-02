
import { configureStore } from "@reduxjs/toolkit";
import solicitudReducer from "./solicitudSlice";

export const store = configureStore({
  reducer: {
    solicitudes: solicitudReducer
  }
});
