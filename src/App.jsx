import Home from './pages/Home' 
import Login from './pages/LoginScreen/LoginScreen'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
