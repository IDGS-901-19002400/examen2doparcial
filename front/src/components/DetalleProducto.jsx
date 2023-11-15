import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './detalle.css'
import { Link } from 'react-router-dom'

const DetalleProducto = () => {

  /* 
    "id":1,
      "title":"iPhone 9",
      "description":"An apple mobile which is nothing like apple",
      "price":549,
      "discountPercentage":12.96,
      "rating":4.69,
      "stock":94,
      "brand":"Apple",
      "category":"smartphones",
      "thumbnail":"https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      "images":[
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
      ]
  
  */
  const [categoria, setCategoria] = useState()


  const [productoDetalle, setProductoDetalle] = useState([])
  const [productsRelacionados, setProductsRelacionados] = useState([])

  const { id } = useParams()

  const getProducts = async () => {
    //https://ananavarro.pythonanywhere.com/products/1

    const response = await fetch('https://ananavarro.pythonanywhere.com/products/' + id)
    const data = await response.json()
    setProductoDetalle(data.product)
    console.log(data.product)

    const response2 = await fetch('https://ananavarro.pythonanywhere.com/products/search/' + data.product.category)
    const data2 = await response2.json()
    console.log(data2)
    setProductsRelacionados(data2.products)

  }


  const navigateTo = (id) => {
    window.open(`/detalle/${id}`, '_self')
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


  const compartir = (red, proucto) => {
    let url = window.location.href;
    let title = proucto.title;
    let descripcion = proucto.description;
    let precio = proucto.price;

    let text = `${title} ${descripcion} ${precio} ${url}`

    switch (red) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${text}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${text} ${url}`, '_blank');
        break;
      default:
        break;
    }


  }


  useEffect(() => {
    getProducts()
  }
    , [])

  return (
    <>
      <div className='container justify-content-center mt-5'>
        <div className='row justify-content-center'>
          <div className='col-md-6 mt-2'>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {productoDetalle.images && productoDetalle.images.map((imagen, index) =>
                  <div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                    <img src={imagen} className="d-block w-100" alt="..." style={{ height: '400px' }} />
                  </div>
                )}
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Anterior</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Siguiente</span>
                </button>

                <div className="carousel-indicators">
                  {productoDetalle.images && productoDetalle.images.map((imagen, index) =>
                    <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to={index} className={`active ${index === 0 ? 'active' : ''}`} aria-current="true" aria-label={`Slide ${index + 1}`}><img src={imagen} className="d-block w-100" alt="..." style={{ height: '50px' , width: '50px'}} /></button>
                    
                  )}
                  <br></br>
                </div>
              </div>
           

            </div>
          </div>
          <div className='col-md-6 mt-2'>
            <h1>{productoDetalle.title}</h1>
            <p><span class="badge bg-success">{productoDetalle.category}</span> <span class="badge bg-danger">{productoDetalle.brand}</span></p>
            <hr />
            <div className="row">
              <div className="col-6">

                <p>{productoDetalle.description}</p>

              </div>


              <div className="col-auto">
                {productoDetalle.discountPercentage > 0 ? <> <p> <span class="badge bg-danger"><del>De: ${productoDetalle.price} USD </del></span></p> <p><b>A: ${productoDetalle.price - (productoDetalle.price * productoDetalle.discountPercentage / 100)} USD</b></p> </> : <p className="text-success">{productoDetalle.price}</p>}
              </div>
              <div className="col-6">
                {renderEstrellas(productoDetalle)}
              </div>
              <div className="col-6">
                <button type="button" className="btn btn-primary">Comprar</button>
              </div>
              <div className="col-12">
                {productoDetalle.stock > 0 ? <h4><span class="badge bg-success">En Stock</span></h4> : <h4><span class="badge bg-danger">Sin Stock</span></h4>}
              </div>

              <div className="col-12">
                <h4>Compartir</h4>
                <a className="btn btn-primary mx-1" onClick={() => compartir('facebook', productoDetalle)}><i className="fa fa-facebook"></i></a>
                <a className="btn btn-success mx-1" onClick={() => compartir('whatsapp', productoDetalle)}><i className="fa fa-whatsapp"></i></a>
                <a className="btn btn-primary mx-1" onClick={() => compartir('twitter', productoDetalle)}><i className="fa fa-twitter"></i></a>

              </div>

            </div>


          </div>

          <div className='col-md-12 mt-5'>
            <h1>Productos Relacionados</h1>
            <div className='row'>
              <div className='gallery mt-5'>
                {productsRelacionados.map((producto) =>
                  <div className='gallery__item'>
                    <div className="card" style={{ width: '18rem', cursor: 'pointer' }} onClick={() => navigateTo(producto.id)} >
                      <img src={producto.thumbnail} className="card-img-top img" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{producto.title}</h5>
                        {producto.discountPercentage > 0 ? <> <p> <span class="badge bg-danger"><del>${producto.price} USD </del></span></p> <p>${producto.price - (producto.price * producto.discountPercentage / 100)} USD</p> </> : <p className="text-success">{producto.price}</p>}
                        <p className="card-text"><span class="badge bg-primary">{producto.category}</span> {producto.stock > 0 ? <span class="badge bg-success mx-1">En Stock</span> : <span class="badge bg-danger mx-1">Sin Stock</span>}</p>



                        {renderEstrellas(producto)}





                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  );
};


export default DetalleProducto
