import React from 'react';
import { Box, Link, Typography } from '@mui/material';


export function  letraColor(palabra){
    let palabraEspecial = ['for', 'if', 'else', 'let', 'break', 'case',
          'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do',
          'else', 'export', 'extends', 'finally', 'function', 'import', 'in',
          'instanceof', 'new', 'return', 'super', 'switch', 'this', 'throw', 'try', 
          'typeof', 'var', 'void', 'while', 'with', 'yield'];
      let simboloEspecial = ['===','==','=', '||', '|','&&'];
      let simboloDeCierre = ['(', ')', '{', '}',';',','];

      let palabraCompuesta = [];
      let pasaje = "";
      let palabraTotal = [];
      let plabraFuncion = "";
      let primerPalabraEs = [];
      let primerPalabradic = [];
      let minimo = 0;
      let minimoIndice = 0;
      let colores = '';
      let palabraFuncion = '';
      let palabraind = 0;
      let palabraEspacio = '';
      let palabraEspacioRight= '';
      let funciontParentesis = false;
      let regetLetra = new RegExp(`\w`);


    while(minimo >= 0){
        primerPalabraEs = [];
        primerPalabradic = [];

        for(let i = 0; i < palabraEspecial.length; i++){
          let reget = new RegExp(`(?!(\\^|\\s))${palabraEspecial[i]}(?=(\$|\\s))`, 'g');
          
          
          if(palabra.search(reget) >= 0){
            primerPalabraEs.push(palabraEspecial[i]);
            primerPalabradic.push(palabra.search(reget));
          }
        }

        for(let j = 0; j < simboloEspecial.length; j++){
          let regetSim = simboloEspecial[j];

          if(palabra.indexOf(regetSim) >= 0){
            primerPalabraEs.push(simboloEspecial[j]);
            primerPalabradic.push(palabra.indexOf(regetSim));
          }
        }

        for(let k = 0; k < simboloDeCierre.length; k++){
          let regetSim = simboloDeCierre[k];

          if(palabra.indexOf(regetSim) >= 0){
            primerPalabraEs.push(simboloDeCierre[k]);
            primerPalabradic.push(palabra.indexOf(regetSim));
          }
        }
        

        minimo = Math.min(...primerPalabradic);
        minimoIndice = primerPalabradic.indexOf(minimo);
        
         
        
        if(minimoIndice >= 0 && minimo != Infinity){
            palabraCompuesta = palabra.slice(0, minimo);
            pasaje = palabra.slice(minimo + primerPalabraEs[minimoIndice].length, );

            if(simboloEspecial.indexOf(primerPalabraEs[minimoIndice]) != -1){
              colores = "#795548";
            } else if(simboloDeCierre.indexOf(primerPalabraEs[minimoIndice]) != -1){
              colores = "#009688";
            } else if(palabraCompuesta.match(/\w$/) != null){
              colores = "#263238";
            }else{
              colores = "#03a9f4";
            }

            if(primerPalabraEs[minimoIndice] == '('){

              palabraFuncion = palabraCompuesta.match(/[A-Za-z]+\s{0,}$/);
              if(palabraFuncion != null){

                for(let k = 0; k < palabraEspecial.length; k++){
                  plabraFuncion = palabraEspecial[k];

                  if(palabraFuncion == plabraFuncion){
                    funciontParentesis = true;
                    break;
                  }
                }

                

                  palabraind = palabraCompuesta.match(/[A-Za-z]+\s{0,}$/).index;

                  palabraCompuesta = palabra.slice(0, palabraind);
                
                  palabraEspacio = palabraCompuesta.match(/\s{0,}$/)[0];

                  
                    palabraCompuesta = [palabraCompuesta,
                      <Box marginLeft={palabraEspacio.length} marginRight={palabraFuncion[0].match(/\s{0,}$/)[0].length}>
                    <Typography fontWeight="bold"  color={funciontParentesis ? "#03a9f4" : "#f44336"}>{palabraFuncion}</Typography>
                    </Box>];
                
                funciontParentesis = false;
              }
            }

            palabraEspacio = palabra.slice(0,minimo);
            palabraEspacio = palabraEspacio.match(/\s{0,}$/)[0];
            palabraEspacioRight = pasaje.match(/^\s{0,}/)[0];

            palabraCompuesta = [palabraCompuesta,
            <Box marginLeft={ palabraEspacio.length} marginRight={palabraEspacioRight.length}>
            <Typography fontWeight="bold"  color={colores}>{primerPalabraEs[minimoIndice]}</Typography>
            </Box>, pasaje
            ]; 
            
            
            

            palabra = pasaje.slice(palabraEspacioRight.length);
            
            
              if(palabraTotal.length == 0){
              palabraTotal = [...palabraCompuesta];
            } else if(palabraTotal.length > 0){
              palabraTotal = [...palabraTotal.slice(0,-1),...palabraCompuesta];
            }
           
        }else{
          minimo = -1;
        }
       
    }


    if(palabraTotal.length > 0){
          
        return palabraTotal;
      }else{
        return palabra;
      }

}


export function textFormat(palabra){
  let palabra2 = palabra;

  let molde = moldeIndPalabra(palabra2); //Debe devolver un Arreglo [indice, palabra]
  let italic = italicIndPalabra(palabra2);
  let white = whiteIndPalabra(palabra2);
  let moldeItalic = italicMoldeIndPalabra(palabra2);
  let linear = linearPalabra(palabra2);
  let link = linkPalabra(palabra2);

  let palabraTotal = [];
  let palabraCompuesta = "";
  let pasaje = "";
  let palabraEspacio = "";
  let palabraEspacioRight = "";

  while(palabra2.length > 2 && (molde[0] != null || italic[0] != null || white[0] != null || moldeItalic[0] != null || linear[0] != null || link[0] != null)){

    if(molde[0] == null)
      molde[0] = Number.POSITIVE_INFINITY;
    if(italic[0] == null)
      italic[0] = Number.POSITIVE_INFINITY;
    if(white[0] == null)
      white[0] = Number.POSITIVE_INFINITY;
    if(moldeItalic[0] == null)
      moldeItalic[0] = Number.POSITIVE_INFINITY;
    if(linear[0] == null)
      linear[0] = Number.POSITIVE_INFINITY;
    if(link[0] == null)
      link[0] = Number.POSITIVE_INFINITY;


    if(molde[0] < italic[0] && molde[0] < white[0] && molde[0] < moldeItalic[0] && molde[0] < linear[0] && molde[0] < link[0]){

      palabraCompuesta = palabra2.slice(0, molde[0]);
      pasaje = palabra2.slice(molde[0] + molde[1].length, );

      palabraEspacio = palabra2.slice(0,molde[0]);
      palabraEspacio = palabraEspacio.match(/\s{0,}$/)[0];
      palabraEspacioRight = pasaje.match(/^\s{0,}/)[0];

      palabraCompuesta = [palabraCompuesta,
      <Box marginLeft={ palabraEspacio.length} marginRight={palabraEspacioRight.length}>
      <Typography style={{fontWeight: 'bold', fontSize: '100%'}}>{molde[1].replace(/[**]/g, ' ')}</Typography>
      </Box>, pasaje
      ]; 

      palabra2 = pasaje.slice(palabraEspacioRight.length); 
    } else if(italic[0] < molde[0] && italic[0] < white[0] && italic[0] < moldeItalic[0] && italic[0] < linear[0] && italic[0] < link[0]){

      palabraCompuesta = palabra2.slice(0, italic[0]);
      pasaje = palabra2.slice(italic[0] + italic[1].length, );

      palabraEspacio = palabra2.slice(0,italic[0]);
      palabraEspacio = palabraEspacio.match(/\s{0,}$/)[0];
      palabraEspacioRight = pasaje.match(/^\s{0,}/)[0];

      palabraCompuesta = [palabraCompuesta,
      <Box marginLeft={ palabraEspacio.length} marginRight={palabraEspacioRight.length}>
      <Typography style={{fontStyle: 'oblique', fontSize: '100%'}}>{italic[1].replace(/[_]/g, ' ').replace(/[_]/g, ' ')}</Typography>
      </Box>, pasaje
      ]; 

      palabra2 = pasaje.slice(palabraEspacioRight.length); 
    } else if(moldeItalic[0] <= molde[0] && moldeItalic[0] < white[0] && moldeItalic[0] < italic[0] && moldeItalic[0] < linear[0] && moldeItalic[0] < link[0]){

      palabraCompuesta = palabra2.slice(0, moldeItalic[0]);
      pasaje = palabra2.slice(moldeItalic[0] + moldeItalic[1].length, );

      palabraEspacio = palabra2.slice(0,moldeItalic[0]);
      palabraEspacio = palabraEspacio.match(/\s{0,}$/)[0];
      palabraEspacioRight = pasaje.match(/^\s{0,}/)[0];

      palabraCompuesta = [palabraCompuesta,
      <Box marginLeft={ palabraEspacio.length} marginRight={palabraEspacioRight.length}>
      <Typography style={{fontWeight: 'bold', fontStyle: 'oblique', fontSize: '100%'}}>{moldeItalic[1].replace(/[**_]/g, ' ').replace(/[_**]/g, ' ')}</Typography>
      </Box>, pasaje
      ]; 

      palabra2 = pasaje.slice(palabraEspacioRight.length); 
    }else if(white[0] < molde[0] && white[0] < italic[0] && white[0] < moldeItalic[0] && white[0] < linear[0] && white[0] < link[0]){

      palabraCompuesta = palabra2.slice(0, white[0]);
      pasaje = palabra2.slice(white[0] + white[1].length, );

      palabraEspacio = palabra2.slice(0,white[0]);
      palabraEspacio = palabraEspacio.match(/\s{0,}$/)[0];
      palabraEspacioRight = pasaje.match(/^\s{0,}/)[0];

      palabraCompuesta = [palabraCompuesta,
      <Box marginLeft={ palabraEspacio.length} borderRadius={1} marginRight={palabraEspacioRight.length} backgroundColor="white" paddingLeft={1} paddingRight={1}>
      <Typography style={{fontWeight: 'bold', fontSize: '100%'}}>{white[1].replace(/[`]/g, ' ')}</Typography>
      </Box>, pasaje
      ]; 

      palabra2 = pasaje.slice(palabraEspacioRight.length); 
    }else if(linear[0] < molde[0] && linear[0] < italic[0] && linear[0] < moldeItalic[0] && linear[0] < white[0] && linear[0] < link[0]){

      palabraCompuesta = palabra2.slice(0, linear[0]);
      pasaje = palabra2.slice(linear[0] + linear[1].length, );

      palabraEspacio = palabra2.slice(0,linear[0]);
      palabraEspacio = palabraEspacio.match(/\s{0,}$/)[0];
      palabraEspacioRight = pasaje.match(/^\s{0,}/)[0];

      palabraCompuesta = [palabraCompuesta,
      <Box marginLeft={ palabraEspacio.length}  marginRight={palabraEspacioRight.length} >
      <Typography style={{textDecoration: 'line-through', fontSize: '100%'}}>{linear[1].replace(/[~]/g, ' ')}</Typography>
      </Box>, pasaje
      ]; 

      palabra2 = pasaje.slice(palabraEspacioRight.length); 
    }else if(link[0] < molde[0] && link[0] < italic[0] && link[0] < moldeItalic[0] && link[0] < white[0] && link[0] < linear[0]){

      palabraCompuesta = palabra2.slice(0, link[0]);
      pasaje = palabra2.slice(link[0] + link[1].length, );

      palabraEspacio = palabra2.slice(0,link[0]);
      palabraEspacio = palabraEspacio.match(/\s{0,}$/)[0];
      palabraEspacioRight = pasaje.match(/^\s{0,}/)[0];

      palabraCompuesta = [palabraCompuesta,
      <Box marginLeft={ palabraEspacio.length}  marginRight={palabraEspacioRight.length} >
      <Link target='_blank' href={link[1].match(/\([A-Za-z0-9 ñÑ,.*_+\-><?'\¡¿}{};:!|#$%&/]+\)/)[0].replace(/\(/, '').replace(/\)/, '')}><Typography color="#d81b60" style={{textDecoration: 'underline', cursor: 'pointer' , fontSize: '100%'}}>{link[1].replace(/\[/g, ' ').replace(/\]/g, ' ').replace(/\([A-Za-z0-9 ñÑ,.*_+\-><?'\¡¿}{};:!|#$%&/]+\)/, ' ')}</Typography></Link>
      </Box>, pasaje
      ]; 

      palabra2 = pasaje.slice(palabraEspacioRight.length); 
    }

    if(palabraTotal.length == 0){
      palabraTotal = [...palabraCompuesta];
    } else if(palabraTotal.length > 0){
      palabraTotal = [...palabraTotal.slice(0,-1),...palabraCompuesta];
    }

    molde = moldeIndPalabra(palabra2); //Debe devolver un Arreglo [indice, palabra]
    italic = italicIndPalabra(palabra2);
    white = whiteIndPalabra(palabra2);
    moldeItalic = italicMoldeIndPalabra(palabra2);
    linear = linearPalabra(palabra2);
    link = linkPalabra(palabra2);

  }
  if(palabraTotal.length == 0){
    return palabra;
  } else {
    return palabraTotal;
  }
}

const moldeIndPalabra = (palabra) => {

  let reget = /[*]{2}[A-Za-z0-9 ñÑ\[\],._+\-><?'\¡¿}{};:()!|#$%&/]+[*]{2}/;
  let extraccion = [];

  if(reget.test(palabra)){
       
    extraccion =  palabra.match(reget);
    
    return [extraccion.index , extraccion[0]];
  } else {
    return [null, null];
  }
  
}

const italicIndPalabra = (palabra) => {

  let reget = /_[A-Za-z0-9 ñÑ\[\],.*_+\-><?'\¡¿}{};:()!|#$%&/]+_/;
  let extraccion = [];

  if(reget.test(palabra)){
       
    extraccion =  palabra.match(reget);
    
    return [extraccion.index , extraccion[0]];
  } else {
    return [null, null];
  }
  
}

const italicMoldeIndPalabra = (palabra) => {

  let reget = /[*]{2}_[A-Za-z0-9 ñÑ\[\],.*_+\-><?'\¡¿}{};:()!|#$%&/]+_[*]{2}/;
  let extraccion = [];

  if(reget.test(palabra)){
       
    extraccion =  palabra.match(reget);
    
    return [extraccion.index , extraccion[0]];
  } else {
    return [null, null];
  }
  
}

const whiteIndPalabra = (palabra) => {

  let reget = /`[A-Za-z0-9 ñÑ\[\],.*_+\-><?'\¡¿}{};:()!|#$%&/]+`/;
  let extraccion = [];

  if(reget.test(palabra)){
       
    extraccion =  palabra.match(reget);
    
    return [extraccion.index , extraccion[0]];
  } else {
    return [null, null];
  }
  
}

const linearPalabra = (palabra) => {

  let reget = /~~[A-Za-z0-9 ñÑ\[\],.*_+\-><?'\¡¿}{};:()!|#$%&/]+~~/;
  let extraccion = [];

  if(reget.test(palabra)){
       
    extraccion =  palabra.match(reget);
    
    return [extraccion.index , extraccion[0]];
  } else {
    return [null, null];
  }
  
}

const linkPalabra = (palabra) => {

  let reget = /\[[A-Za-z0-9 ñÑ,.*_+\-><?'\¡¿}{};:()!|#$%&/]+\]\([A-Za-z0-9 ñÑ,.*_+\-><?'\¡¿}{};:!|#$%&/]+\)/;
  let extraccion = [];

  if(reget.test(palabra)){
       
    extraccion =  palabra.match(reget);
    
    return [extraccion.index , extraccion[0]];
  } else {
    return [null, null];
  }
  
}