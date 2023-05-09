import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Link, TextField, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TextareaAutosize from '@mui/base/TextareaAutosize'; 
import { border } from '@mui/system';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { asignarTexto, selectTexto } from '../editor/editorSlice';
import { cuadricula, esCuadricula, letraColor, tableCompleta, textFormat } from './MutilineCode';
import ExpandIcon from '@mui/icons-material/Expand';


export function Salida(props) {
   
  const mensaje = useSelector(selectTexto);

  const dispatch = useDispatch();

  let Estado = 0;
  let MultilineCode = 0;
  let numeroOrden = 0;

const salidaControl = () => {
  let salidaProcesada = [];
  let oraciones = [];
  let oracionTempral = "";
  let cuadricula = [];
  let cuadriculaControl = 0;
  
  oraciones = mensaje.split('\n');
  //.map((x) => Mayuscula(x));


   for(let i = 0; i < oraciones.length; i++){
    if(!cuadriculaControl){
     if(salidaProcesada.length == 0){
       salidaProcesada = [Mayuscula(oraciones[i])];
     }else{
       salidaProcesada.push(Mayuscula(oraciones[i],oraciones[i - 1]));

       if(salidaProcesada.slice(-1,) == -1){
       
        cuadricula = [oraciones[i - 1]];
        salidaProcesada = salidaProcesada.slice(0,-2);
        cuadriculaControl = 1;

        if(i + 1 == oraciones.length){
          
          salidaProcesada.push(tableCompleta(cuadricula));
         }
       }
       
     }
    }else if(esCuadricula(oraciones[i])){
      cuadricula.push(oraciones[i]);

      if(i + 1 == oraciones.length){
          
        salidaProcesada.push(tableCompleta(cuadricula));
       }
    }else{
      
      salidaProcesada.push(tableCompleta(cuadricula));
      salidaProcesada.push(Mayuscula(oraciones[i]));
      cuadriculaControl = 0;
     
    }

     
   }

   return salidaProcesada;
};

const Mayuscula = (palabra, palabraAnterior) => {

  let calRegex = /^#+\s/; // Change this line
  let codeRegex = /^```/;

  let esMayuscula = palabra.match(calRegex);
  if(esMayuscula && Estado == 0){
    numeroOrden = 0;
    let tipo = esMayuscula[0].match(/#/g);
    if(tipo.length === 1){
      return <Box marginBottom={1}><Typography  display="flex" alignItems="center" flexWrap="wrap" variant='h3' style={{fontFamily: 'monospace', borderBottom: '3px solid black', paddingBottom: '5px'}}>{textFormat(palabra.slice(2, ))}</Typography></Box>; 
    }else if (tipo.length == 2){
      return <Box marginBottom={1}><Typography  display="flex" alignItems="center" flexWrap="wrap" variant='h4' style={{borderBottom: '3px solid black', paddingBottom: '5px'}}>{textFormat(palabra.slice(3, ))}</Typography></Box>;
    }else if (tipo.length == 3){
      return <Box marginBottom={1}><Typography  display="flex" alignItems="center" flexWrap="wrap" variant='h5' style={{borderBottom: '3px solid black', paddingBottom: '5px'}}>{textFormat(palabra.slice(4, ))}</Typography></Box>;
    }
  } else if(palabra.match(/^[>]{1}/)){
    numeroOrden = 0;
    return <Box marginLeft={3} marginBottom={1}  borderLeft='3px solid #224b4b'><Typography  display="flex" alignItems="center"  paddingLeft={1} flexWrap="wrap" >{textFormat(palabra.slice(1, ))}</Typography></Box>
  
  } else if(palabra.match(/^[\-]{1}\s/)){
    numeroOrden = 0;
    return <Box marginLeft={3} marginBottom={1} display="flex" alignItems='center'><Box borderRadius='100%' style={{width: '7px', height: '7px', backgroundColor: 'black'}}></Box><Typography  display="flex" alignItems="center"  paddingLeft={1} flexWrap="wrap" >{textFormat(palabra.slice(1, ))}</Typography></Box>
  
  } else if(palabra.match(/^\s+[\-]{1}\s/)){
    numeroOrden = 0;

    let espacios = palabra.match(/^\s+/)[0].length;

    let palabraSola = palabra.slice(espacios + 2,);

    if(espacios > 2){
      return <Box marginLeft={3 + espacios} marginBottom={1} display="flex" alignItems='center'><Box style={{width: '7px', height: '7px', backgroundColor: 'black'}}></Box><Typography  display="flex" alignItems="center"  paddingLeft={1} flexWrap="wrap" >{textFormat(palabraSola)}</Typography></Box>
    } else{
      return <Box marginLeft={3 + espacios} marginBottom={1} display="flex" alignItems='center'><Box borderRadius={100} style={{width: '7px', height: '7px', border: '1px solid black'}}></Box><Typography  display="flex" alignItems="center"  paddingLeft={1} flexWrap="wrap" >{textFormat(palabraSola)}</Typography></Box>
    }
  
  } else if(palabra.match(/^\d{1}[.]{1}\s/)){
    numeroOrden += 1;
    let marginleft = palabra.match(/^\d{1}[.]{1}\s+/)[0].length - 2;
    

    return <Box  marginBottom={1} display="flex" alignItems='center'><Box><Typography>{numeroOrden}.</Typography></Box><Typography marginLeft={marginleft} display="flex" alignItems="center"  paddingLeft={1} flexWrap="wrap" >{textFormat(palabra.slice(2,))}</Typography></Box>
  
  } else if(palabra.match(/^[-]+\s\|/)){
    numeroOrden = 0;
    if(!(palabra.match(/[A-Za-z0-9ñÑ\[\],._+><?'¿}{};:()¡!#$%&/]/))){
      
      let palitos = palabra.match(/\|/g).length;

        if(palabraAnterior.match(/\|/g) != null){
          if(palabraAnterior.match(/\|/g).length == palitos){
            return -1;
        }
      }

      

    }
    
    
    
  } else if(codeRegex.test(palabra) || Estado === 1){
    numeroOrden = 0;
     if(codeRegex.test(palabra)){
       if(Estado == 0 ){
         Estado = 1;
         return ;
     }else{
       Estado = 0;
       return <Box fontSize={4} color="white" backgroundColor="white" minHeight={1} marginBottom={1}>s</Box>;
     }
   }
   MultilineCode += 1;
    let multiline_code = /^\/\//;
    if(multiline_code.test(palabra)){
      return <Box><Typography fontWeight="bold" paddingLeft={1} paddingTop={MultilineCode == 1 ? 1 : 0} backgroundColor="white" color={"gray"} display="flex" flexWrap="wrap">{palabra}</Typography></Box>
    }else{
      numeroOrden = 0;
      let reget = /'[A-Za-z1-9() `<>&.+-?¿{};,:=|]+'/;
      let palabra2 = '';
      let espacioL = '';
      let espacioR = '';
      let palabraTotal = [];
      let comillas = '';
      let palabraCompuesta = [];

      while(reget.test(palabra)){
        comillas = palabra.match(reget);
        palabra2 = palabra.slice(0, comillas.index);
        
        espacioL = palabra2.match(/\s{0,}$/);

        palabra = palabra.slice(comillas.index + comillas[0].length, );
        espacioR = palabra.match(/^\s{0,}/);

        palabraCompuesta  = [...letraColor(palabra2), 
          <Box marginLeft={espacioL.length} marginRight={espacioR.length}>
          <Typography fontWeight="bold"  color="green">{comillas[0]}</Typography>
          </Box>
          , palabra];

        if(palabraTotal.length == 0){
          palabraTotal = [...palabraCompuesta];
        } else if(palabraTotal.length > 0){
          palabraTotal = [...palabraTotal.slice(0,-1),...palabraCompuesta];
        }
      
      }

      if(palabraTotal.length > 0){
        return <Box><Typography fontWeight="bold" paddingLeft={1} paddingTop={MultilineCode == 1 ? 1 : 0} backgroundColor="white" display="flex" flexWrap="wrap">{palabraTotal}</Typography></Box>
      }else{
        return <Box><Typography fontWeight="bold" paddingLeft={1} paddingTop={MultilineCode == 1 ? 1 : 0} backgroundColor="white" display="flex" flexWrap="wrap">{letraColor(palabra)}</Typography></Box>   
      }

    }
  }

  numeroOrden = 0;
  return <Box marginBottom={1}><Typography style={{fontSize: 17}}  display="flex" flexWrap="wrap">{textFormat(palabra)}</Typography></Box>
};

  
    return (
      <Box display="flex" alignItems="center" justifyContent="center"
        paddingTop={3} paddingBottom={3}
        >
        <Box width={"90%"} sx={{
            '& .MuiTextField-root': { m: 1, width: '100ch' },
            }
            }
          
            noValidate
            autoComplete="off">
          <Box height={45} backgroundColor="#2196f3" width={"100%"}
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
              >Previewer</Typography>
            </Box>
            <Box>
            {props.tipoIcon ? 
              <HighlightOffIcon onClick={ () => props.estadoSalida()} sx={{cursor: "pointer" ,":hover": {
                          color: "#e3f2fd", transitionDuration: '0ms'
                          }}}>
              </HighlightOffIcon> :
              <ExpandIcon onClick={ () => props.retornarEntrada()} sx={{cursor: "pointer" ,":hover": {
                          color: "#e3f2fd", transitionDuration: '0ms'
                          }}}>            
              </ExpandIcon>
              }
            </Box>
          </Box>

            <Box
              style={{  width: "100%", minHeight: "300px",
              padding: 0, 
              paddingRight: "10px", paddingLeft: "10px",
              paddingTop: "5px", borderColor: "#1d2f2f",
              boxShadow: "1px 1px 10px 2px #3a5f5f",
              backgroundColor: "#bbdefb"}}
              >
                {salidaControl()}
              </Box> 
            
        </Box>
      </Box>
    );
  }
  