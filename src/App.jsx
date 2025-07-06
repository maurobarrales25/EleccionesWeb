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
import ManagePartidoPolitico from './pages/ManagePartidoPolitico/ManagePartidoPolitico';
import ManageCandidato from './pages/ManageCandidato/ManageCandidato';
import ManageList from './pages/ManageList/ManageList';
import VotarPage from './pages/VotarPage/VotarPage';
import ResultadosPage from './pages/ResultadosPage/ResultadosPage';
import ResultadosByCircuitosPage from './pages/ResultadosByCircuitoPage/ResultadosByCircuito';
import ResultadosByListaCircuito from './pages/ResultadosByListaCircuitoPage/ResultadosByListaCircuito';
import ResultadosByPartidoCircuito from './pages/ResultadosByPartidoCircuitoPage/ResultadosByPartidoCircuito';
import ResultadosByCandidatoCircuito from './pages/ResultadosByCandidatoCircuitoPage/ResultadosByCandidatoCircuito';
import DepartamentosPage from './pages/DepartamentosPage/DepartamentosPage';
import ResultadosByDepartamento from './pages/ResultadosByDepartamentosPage/ResultadosByDepartamentos';
import ResultadosByPartidoDepartamento from './pages/ResultadosByDptoPartidoPage/ResultadosByDptoPartido';
import ResultadosByCandidatoDepartamento from './pages/ResultadosByDptoCandidato/ResultadosByDptoCandidato';
import GanadoresPage from './pages/GanadoresPage/GanadoresPage';

function App() {

  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/MainScreen" element={<MainScreen/>}/>
        <Route path='/Elecciones' element={<EleccionesPage/>}/>
        <Route path='/ManageEleccion/:eleccionId' element={<ManageEleccion />} />
        <Route path='/CircuitosPage/:eleccionId' element={<CircuitosPage/>}/>
        <Route path='/FindCircuitoPage/:eleccionId' element={<ManageSearchVotarPage/>} />
        <Route path='/ManageCircuito/:eleccionId/:numero' element={<ManageCircuito/>}/>
        <Route path='/ManageMiembrosMesa/:eleccionId/:numero' element={<ManageMiembrosMesa/>}/>
        <Route path='/ManagePartidoPolitico/:eleccionId' element={<ManagePartidoPolitico/>} />
        <Route path='/ManageCandidato/:eleccionId' element={<ManageCandidato/>} />
        <Route path='/ManageList/:eleccionId' element={<ManageList/>} />
        <Route path='/VotarPage/:eleccionId/:circuitoNumero' element={<VotarPage/>}/>
        <Route path='/ManageCircuito/:eleccionId/:numero' element={<ManageCircuito/>}/>
        <Route path='/ManageMiembrosMesa/:eleccionId/:numero' element={<ManageMiembrosMesa/>}/>
        <Route path='/ResultsPage/:eleccionId' element={<ResultadosPage/>}/>
        <Route path='/ResultadosByCircuitosPage/:eleccionId/:numero' element={<ResultadosByCircuitosPage/>}/>
        <Route path='/ResultadosByListaCircuito/:eleccionId/:numero' element={<ResultadosByListaCircuito/>}/>
        <Route path='/ResultadosByPartidoCircuito/:eleccionId/:numero' element={<ResultadosByPartidoCircuito/>}/>
        <Route path='/ResultadosByCandidatoCircuito/:eleccionId/:numero' element={<ResultadosByCandidatoCircuito/>}/>
        <Route path='/DepartamentosPage/:eleccionId' element={<DepartamentosPage/>}/>
        <Route path='/ResultadosByDepartamentoPage/:eleccionId/:departamentoId' element={<ResultadosByDepartamento/>}/>
        <Route path='/ResultadosByPartidoDepartamento/:eleccionId/:departamentoId' element={<ResultadosByPartidoDepartamento/>}/>
        <Route path='/ResultadosByCandidatoDepartamento/:eleccionId/:departamentoId' element={<ResultadosByCandidatoDepartamento/>}/>
        <Route path='/GanadoresPage/:eleccionId' element={<GanadoresPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
