import Login from './pages/LoginScreen/LoginScreen'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import MainScreen from './pages/MainScreen/MainScreen';
import EleccionesPage from './pages/EleccionesPage/EleccionesPage';
import ManageEleccion from './pages/ManageEleccion/ManageEleccion';
import CircuitosPage from './pages/CircuitosPage/CircuitosPage';
import ManageCircuito from './pages/ManageCircuito/ManageCircuito';
import ManageMiembrosMesa from './pages/ManageMiembrosMesa/ManageMiembrosMesa';

function App() {

  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/MainScreen" element={<MainScreen/>}/>
        <Route path='/Elecciones' element={<EleccionesPage/>}/>
        <Route path='/ManageEleccion/:eleccionId' element={<ManageEleccion />} />
        <Route path='/CircuitosPage/:eleccionId' element={<CircuitosPage/>}/>
        <Route path='/ManageCircuito/:eleccionId/:numero' element={<ManageCircuito/>}/>
        <Route path='/ManageMiembrosMesa/:eleccionId/:numero' element={<ManageMiembrosMesa/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
