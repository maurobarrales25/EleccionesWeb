import Home from './pages/Home' 
import Login from './pages/LoginScreen/LoginScreen'
import MenuGestionarElecciones from './pages/GestionarElecciones/MenuGestionarElecciones.jsx'

import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/MenuGestionarElecciones" element={<MenuGestionarElecciones />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
