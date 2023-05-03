import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import editorReducer from '../features/editor/editorSlice';
import salidaReducer from '../features/salida/salidaSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    editor: editorReducer,
    salida: salidaReducer,
  },
});
