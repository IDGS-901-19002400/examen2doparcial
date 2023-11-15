import { useState } from 'react'
import Buscador from './components/Buscador'
import Home from './components/home'
import DetalleProducto from './components/DetalleProducto'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>


      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item" element={<Buscador />} />
          <Route path="/detalle/:id" element={<DetalleProducto />} />

        </Routes>
      </Router>


    </>
  )
}

export default App
