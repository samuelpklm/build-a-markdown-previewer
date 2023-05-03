import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    caja: "white",
    status: "CERRADO",
  };

  export const salidaSlice = createSlice({
    name: 'salida',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      // Use the PayloadAction type to declare the contents of `action.payload`
      cajaColor: (state, action) => {
        state.caja = action.payload;
      },
      abrirCaja: (state) => {
        state.status = "ABIERTO";
      },
      cerrarCaja: (state) => {
        state.status = "CERRADO";
      },
    },

  });

  export const { cajaColor, abrirCaja, cerrarCaja } = salidaSlice.actions;

  export const selectEstado = (state) => state.salida.status;

  export default salidaSlice.reducer;