import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

import { Editor } from './features/editor/Editor';
import { Salida } from './features/salida/Salida';
import { Box } from '@mui/material';

function App() {
  return (
    <Box backgroundColor="#90caf9">
      <Editor></Editor>
      <Salida></Salida>
    </Box>
  );
}

export default App;
