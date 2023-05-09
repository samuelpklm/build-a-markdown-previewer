import React from 'react';
import { useState } from 'react';
import './App.css';

import { Editor } from './features/editor/Editor';
import { Salida } from './features/salida/Salida';
import { Box } from '@mui/material';

function App() {

  const [editorS, setEditorS] = useState(true);
  const [salidaS, setsalidaS] = useState(true);
  const [tipoIcon, settipoIcon] = useState(true);

  const mostrarEditor = () => {
    setEditorS(!editorS);
    settipoIcon(!tipoIcon);
  };

  const mostrarSalida = () => {
    setsalidaS(!salidaS);
    settipoIcon(!tipoIcon);
  };

  const devolverEditor = () => {
    setEditorS(!editorS);
    settipoIcon(!tipoIcon);
  };

  const devolverSalida = () => {
    setsalidaS(!salidaS);
   
    settipoIcon(!tipoIcon);
  };


  return (
    <Box backgroundColor="#90caf9" >
      { editorS && <Editor salidaCerrada={salidaS} retornarSalida={devolverSalida} tipoIcon={tipoIcon} estadoEditor={mostrarEditor}></Editor>}
      { salidaS && <Salida retornarEntrada={devolverEditor} tipoIcon={tipoIcon} estadoSalida={mostrarSalida}></Salida>}
      
    </Box>
  );
}

export default App;
