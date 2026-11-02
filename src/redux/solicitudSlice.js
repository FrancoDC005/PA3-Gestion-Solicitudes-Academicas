
import { createSlice } from "@reduxjs/toolkit";

const solicitudSlice = createSlice({
  name: "solicitudes",
  initialState: {
    notificaciones: 0
  },
  reducers: {
    incrementarNotificaciones: (state) => {
      state.notificaciones += 1;
    },

    limpiarNotificaciones: (state) => {
      state.notificaciones = 0;
    }
  }
});

export const {
  incrementarNotificaciones,
  limpiarNotificaciones
} = solicitudSlice.actions;

export default solicitudSlice.reducer;
