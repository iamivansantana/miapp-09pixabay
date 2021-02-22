import React, { useState } from 'react'
import Error from './Error';

const Formulario = ({guardarBusqueda}) => {

    const [tema,guardarTema]=useState('');
    const [error,guardarError]=useState(false);

    const buscarImagenes = e =>{
        e.preventDefault();

        //Validar
        if(tema.trim()===''){
            guardarError(true);
            return;
        }
        guardarError(false);

        //Enviar tema de busqueda hacia el componente principal
        guardarBusqueda(tema);



    }

    return (
        <>
            <form
                onSubmit={buscarImagenes}
            >
                <div className="row">
                    <div className="form-group col-md-8">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Busca una imagen, ejemplo: Futbol o café"
                            onChange={e=>guardarTema(e.target.value)}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <input
                            type="submit"
                            className="btn btn-lg btn-danger btn-block"
                            value="Buscar"
                        />
                    </div>
                </div>
                {error?<Error mensaje='Agrega un termino de busqueda'/>:null}
            </form>  
        </>
    )
}

export default Formulario
