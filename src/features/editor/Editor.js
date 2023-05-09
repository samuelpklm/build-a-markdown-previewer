import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Link, TextField, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TextareaAutosize from '@mui/base/TextareaAutosize'; 
import { border } from '@mui/system';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ExpandIcon from '@mui/icons-material/Expand';
import './Editor.css'

import { asignarTexto, selectTexto } from './editorSlice';

export function Editor(props) {

  const mensaje = useSelector(selectTexto);
  const dispatch = useDispatch();

  const [texto, setTexto] = useState(mensaje);
  

  const handleChange = (event) => {
   
    setTexto(event.target.value);
    
  }

  useEffect(() => {
    dispatch(asignarTexto(texto));
  }, [texto]);

    return (
        <Box display="flex" alignItems="center" justifyContent="center"
        paddingTop={3}
        >
        <Box width={props.salidaCerrada ? "70%" : "90%"} sx={{
            '& .MuiTextField-root': { m: 1, width: '100ch' },
            }
            }
          
            noValidate
            autoComplete="off">
          <Box height={ 45 } backgroundColor="#2196f3" width={"100%"}
            sx={{borderTop: "1px solid black",
                            borderRight: "1px solid black",
                            borderLeft: "1px solid black",
                            borderBottom: "1px solid black",
                            borderColor: "#1d2f2f",
                            boxShadow: "1px 1px 10px 2px #3a5f5f"}}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding={2}
            >
            <Box display="flex" alignItems="center" justifyContent="center" 
              gap={0.5}
              >
              <LocalFireDepartmentIcon></LocalFireDepartmentIcon>
              <Typography variant='h6' 
              style={{fontFamily: "Gajraj One, cursive"}}
              >Editor</Typography>
            </Box>
            <Box>
            {props.tipoIcon ? 
              <HighlightOffIcon onClick={ () => props.estadoEditor()} sx={{cursor: "pointer" ,":hover": {
                          color: "#e3f2fd", transitionDuration: '0ms'
                          }}}>
              </HighlightOffIcon> :
              <ExpandIcon onClick={ () => props.retornarSalida()} sx={{cursor: "pointer" ,":hover": {
                          color: "#e3f2fd", transitionDuration: '0ms'
                          }}}>            
              </ExpandIcon>
              }
                
            </Box>
          </Box>
          
            <textarea
            className={props.salidaCerrada ? 'height-300' : 'height-600'}
             
             value={texto}
            
              style={{  width: "100%",
               resize: "vertical", padding: 0, outline: "none",
                borderTop: "none", paddingLeft: "5px",
                paddingTop: "5px", borderColor: "#1d2f2f",
                boxShadow: "1px 1px 10px 2px #3a5f5f",
                backgroundColor: "#bbdefb"}}
                
                onChange={handleChange}
                />
          
        </Box>
      </Box>
    );
  }
  