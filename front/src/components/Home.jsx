import React from "react";
import { useState, useEffect } from "react";
import Buscador from "./Buscador";
import {Link} from 'react-router-dom'
const Home = () => {


    const [categoria, setCategoria] = useState()
    const [list, setListView] = useState([false])






    return (
        <>



                
                    <div className='container d-flex align-items-center justify-content-center vh-100'>
                        <div className='row justify-content-center'>
                            <div className='col-md-12'>
                                    <h1 className='text-center'>B A Z A R </h1>
                                    <h2 className='text-center'>O N L I N E </h2>

                                    <p className='text-center mt-3'>Bienvenido al Bazar Online de Ana, el mejor lugar para encontrar lo que necesitas</p>
                                    <hr />
                                    <p className='text-center'>¿Qué estás buscando?</p>
                                    <div className='row justify-content-center'>
                                        <div className='col-auto mt-2' style={{ width: '80%' }}>
                                            <form>
                                                <div className='form-group'>
                                                    <input type='text' className='form-control' placeholder='Busca tu producto' onChange={(e) => setCategoria(e.target.value)} />
                                                </div>
                                            </form>
                                        </div>
                                        <div className='col m> setListView(!list)}> <i className="fa fa-search"></i></button>t-2'>
                                            <Link to={`/item?search=${categoria}`} className='btn btn-primary'>Buscar</Link>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>



           




        </>
    )
}

export default Home
