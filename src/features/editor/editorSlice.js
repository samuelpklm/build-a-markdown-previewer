import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    texto: "# Hola Samuel, Eres increible",
    status: 'INITIAL',
  };

  export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      // Use the PayloadAction type to declare the contents of `action.payload`
      asignarTexto: (state, action) => {
        state.texto = action.payload;
      },
    },

  });

  export const { asignarTexto } = editorSlice.actions;

  export const selectTexto = (state) => state.editor.texto;

  export default editorSlice.reducer;