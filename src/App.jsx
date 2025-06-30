import Login from './pages/LoginScreen/LoginScreen'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import MainScreen from './pages/MainScreen/MainScreen';
import EleccionesPage from './pages/EleccionesPage/EleccionesPage';

function App() {

  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/MainScreen" element={<MainScreen/>}/>
        <Route path='/Elecciones' element={<EleccionesPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
