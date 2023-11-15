import React from "react";
import { useState, useEffect } from "react";
import DetalleProducto from "./DetalleProducto";
import { Link } from "react-router-dom";

const ListaProductos = ({ producto }) => {

    const [detalle, setDetalle] = useState([false])



    const navigateTo = (id) => {
        
        window.open(`/detalle/${id}` , '_blank')
    }

    const renderEstrellas = (producto) => {
        const estrellas = [];
        const entero = Math.floor(producto.rating);
        const decimal = producto.rating - entero;
      
        // Dibujar estrellas enteras
        for (let i = 1; i <= entero; i++) {
          estrellas.push(<i key={i} className="fa fa-star checked"></i>);
        }
      
        // Si hay decimal mayor a 0.5, agregar media estrella
        if (decimal > 0.5) {
          estrellas.push(<i key={entero + 1} className="fa fa-star-half checked"></i>);
        } else if (decimal > 0) {
          // Si hay decimal menor a 0.5, agregar una estrella vacía
          estrellas.push(<i key={entero + 1} className="fa fa-star"></i>);
        }
      
        // Rellenar con estrellas vacías hasta llegar a 5
        while (estrellas.length < 5) {
          estrellas.push(<i key={estrellas.length + 1} className="fa fa-star"></i>);
        }
      
        return estrellas;
      };

    return (
        <>
            <div className="card" onClick={() => navigateTo(producto.id)} style={{ cursor: 'pointer' }}>
                <div className="row">
                    <div className="col-auto">
                        <img src={producto.thumbnail} className="img-fluid" alt="..." />
                    </div>
                    <div className="col">
                        <div className="card-body">
                            <h5 className="card-title"><b>{producto.title}</b></h5>
                            <p className="card-text">{producto.description}</p>
                            {producto.discountPercentage > 0 ? <> <p> <span class="badge bg-danger"><del>${producto.price} USD </del></span></p> <p>${producto.price - (producto.price * producto.discountPercentage / 100)} USD</p> </> : <p className="text-success">{producto.price}</p>}
                            <p className="card-text"><span class="badge bg-primary">{producto.category}</span> {producto.stock > 0 ? <span class="badge bg-success mx-1">En Stock</span>: <span class="badge bg-danger mx-1">Sin Stock</span>}</p>
                                {renderEstrellas(producto)}
                            <br className="mb-2" />
                        </div>


                    </div>

                </div>

            </div>








        </>
    )
}

export default ListaProductos
