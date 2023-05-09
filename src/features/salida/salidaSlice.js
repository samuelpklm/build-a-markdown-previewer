import { createSlice } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
});


const initialState = {
    salidaProcesada: [],
  };

  export const salidaSlice = createSlice({
    name: 'salida',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      // Use the PayloadAction type to declare the contents of `action.payload`
      agregarLinea: (state, action) => {
        state.salidaProcesada = "action.payload";
      },
      borrarUltimaLinea: (state) => {
        state.salidaProcesada = state.salidaProcesada.slice(0,-1);
      },
    },
  });

  export const { borrarUltimaLinea, agregarLinea } = salidaSlice.actions;

  export const selectSalida = (state) => state.salida.salidaProcesada;

  export default salidaSlice.reducer;