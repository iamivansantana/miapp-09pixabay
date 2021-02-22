import React, { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';


function App() {

  const[busqueda,guardarBusqueda]=useState('');
  const[imagenes,guardarImagenes]=useState([]);
  const[paginaactual,guardarPaginaActual]=useState(1);
  const[totalpaginas,guardaTotalPaginas]=useState(1);

  useEffect(()=>{
    if(busqueda==='')return;

      const consultarAPI = async()=>{
        const imagenesxpagina= 30;
        const key= '18584834-b8939c3a0661f41d9c3094cbd';
        const url=`https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesxpagina}&page=${paginaactual}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarImagenes(resultado.hits);
        //calcula el total de paginas 
        const calcularTotalPaginar = Math.ceil(resultado.totalHits / imagenesxpagina);

        
        guardaTotalPaginas(calcularTotalPaginar);

        //Mover Pantalla Hacia arriba
        const jumbotron = document.querySelector('.jumbotron');
        jumbotron.scrollIntoView({behavior:'smooth'});

      }
      consultarAPI();
  },[busqueda,paginaactual]);

  //definir la pagina anterior
  const volverAnterior = ()=>{
    const nuevaPaginaActual = paginaactual -1;
    if(nuevaPaginaActual === 0)return;
    guardarPaginaActual(nuevaPaginaActual);

  }

  //definir pagina siguiente
  const irSiguiente = ()=>{
    const nuevaPaginaSiguiente = paginaactual + 1;
    if(nuevaPaginaSiguiente > totalpaginas)return;
    guardarPaginaActual(nuevaPaginaSiguiente);
  }

  

  return (
    <>
      <div className="container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>
          <Formulario 
            guardarBusqueda={guardarBusqueda}
          />
        </div>
        <div className="row justify-content-center">
        <ListadoImagenes 
            imagenes ={imagenes}
          />
          {(paginaactual===1)?null
          :
          <button
            type="button"
            className="bbtn btn-info mr-2 mb-5"
            onClick={volverAnterior}
            >&laquo; Anterior            
          </button>
          }
          {(paginaactual === totalpaginas)?null
          :
          <button
            type="button"
            className="bbtn btn-info mb-5"
            onClick={irSiguiente}
          >Siguiente &raquo;           
          </button>
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
