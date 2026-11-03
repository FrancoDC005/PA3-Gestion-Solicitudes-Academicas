import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificaciones: 0,
  historialNotificaciones: [],
  ultimoEvento: null
};

export const solicitudSlice = createSlice({
  name: "solicitudes",
  initialState,
  reducers: {
    incrementarNotificaciones: (state, action) => {
      state.notificaciones += 1;
      const mensaje = action.payload?.mensaje || "Nueva solicitud registrada";
      const timestamp = new Date().toLocaleTimeString("es-PE");
      state.historialNotificaciones.unshift({
        id: Date.now(),
        mensaje,
        hora: timestamp
      });
      state.ultimoEvento = { mensaje, hora: timestamp };
    },
    limpiarNotificaciones: (state) => {
      state.notificaciones = 0;
      state.historialNotificaciones = [];
      state.ultimoEvento = null;
    },
    notificarCambioEstado: (state, action) => {
      state.notificaciones += 1;
      const { id, estado } = action.payload;
      const mensaje = `Solicitud #${id} cambió a estado ${estado}`;
      const timestamp = new Date().toLocaleTimeString("es-PE");
      state.historialNotificaciones.unshift({
        id: Date.now(),
        mensaje,
        hora: timestamp
      });
      state.ultimoEvento = { mensaje, hora: timestamp };
    }
  }
});

export const {
  incrementarNotificaciones,
  limpiarNotificaciones,
  notificarCambioEstado
} = solicitudSlice.actions;

export default solicitudSlice.reducer;
