import React from 'react'
import { useState, useEffect } from 'react'
import '../../products.json'
import ListaProductos from './ListaProductos'
import { useParams } from 'react-router-dom'
const Buscador = () => {

    const [list, setListView] = useState([false])
    const [products, setProducts] = useState([])
    const [categoria2, setCategoria] = useState()




    const getProducts = async () => {
        let url = window.location.href
        let categoria2 = url.split('=')[1]

        categoria2 = categoria2.replace(/%20/g, ' ')
        setCategoria(categoria2)




        console.log(categoria2)
        const prueba = await fetch('https://ananavarro.pythonanywhere.com/products/search/' + categoria2)
        const data2 = await prueba.json()
        console.log(data2)
        //data2.products = data2.products.filter(producto => producto.category === categoria)
        setProducts(data2.products)
    }

    useEffect(() => {
        getProducts()
    }, [])


    const handleSearch = (e) => {
        window.history.replaceState(null, '', `?search=${e}`)
        setCategoria(e)
        getProducts()
    }


    return (


        <div className='container justify-content-center mt-5 mb-5'>
            <h1 className='text-center' >B U S C A R</h1>
            <div className='row justify-content-center'>
                <div className='col-11 mt-2' >
                    <form>
                        <div className='form-group'>
                            <input type='text' className='form-control' placeholder='Busca tu producto' onChange={(e) => handleSearch(e.target.value)} />
                        </div>
                    </form>
                </div>

                <div className='col-md-12 mt-2'>
                    <p>Resultado de la busqueda de  {categoria2} : {products.length}</p>
                </div>



                {products.length === 0 && <div className='col-md-12 mt-2'> <p>No se encontraron resultados</p></div>}


                {!list ? products.map((producto) =>
                    <>
                        <div className='col-md-12 mt-2'>
                            <ListaProductos producto={producto} />
                            /</div></>) : products.map((producto) =>
                                <>  <div className='col-md-12 mt-2'>
                                    <ListaProductos producto={producto} />
                                </div></>)}

            </div>
        </div>
    )
}

export default Buscador
