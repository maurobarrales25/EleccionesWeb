import Login from './pages/LoginScreen/LoginScreen'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import MainScreen from './pages/MainScreen/MainScreen';
import EleccionesPage from './pages/EleccionesPage/EleccionesPage';
import ManageEleccion from './pages/ManageEleccion/ManageEleccion';
import CircuitosPage from './pages/CircuitosPage/CircuitosPage';
import ManageSearchVotarPage from './pages/ManageSearchVotarPage/ManageSearchVotarPage';
import ManageCircuito from './pages/ManageCircuito/ManageCircuito';
import ManageMiembrosMesa from './pages/ManageMiembrosMesa/ManageMiembrosMesa';
import VotarPage from './pages/VotarPage/VotarPage';
import ResultadosPage from './pages/ResultadosPage/ResultadosPage';

function App() {

  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/MainScreen" element={<MainScreen/>}/>
        <Route path='/Elecciones' element={<EleccionesPage/>}/>
        <Route path='/ManageEleccion/:eleccionId' element={<ManageEleccion />} />
        <Route path='/CircuitosPage/:eleccionId' element={<CircuitosPage/>}/>
        <Route path='/FindCircuitoPage/:eleccionId' element={<ManageSearchVotarPage/>}></Route>
        <Route path='/ManageCircuito/:eleccionId/:numero' element={<ManageCircuito/>}/>
        <Route path='/ManageMiembrosMesa/:eleccionId/:numero' element={<ManageMiembrosMesa/>}/>
        <Route path='/VotarPage/:circuitoId' element={<VotarPage/>}/>
        <Route path='/ManageCircuito/:eleccionId/:numero' element={<ManageCircuito/>}/>
        <Route path='/ManageMiembrosMesa/:eleccionId/:numero' element={<ManageMiembrosMesa/>}/>
        <Route path='/ResultsPage/:eleccionId' element={<ResultadosPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
