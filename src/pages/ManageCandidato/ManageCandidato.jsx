import NavBar from "@/Components/NavBar/NavBar";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/Components/ui/table";
import ButtonCustom from "@/Components/atoms/ButtonCustom/ButtonCustom";
import { Popover, PopoverTrigger, PopoverContent } from "@/Components/ui/popover";
import { getDepartamentos, getListaPoliticoByEleccion, getListasByEleccion, saveCredencial, saveListaPolitico, savePolitico, setCredencial, updateCargoPolitico, updatePartidoDePolitico } from "@/api/apiCalls";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPartidos, getPoliticos, getCargos, } from "@/api/apiCalls";

function ManageCandidato() {
    const { eleccionId } = useParams();
    
    const [cedula, setCedula] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");

    const [serieCredencial, setSerieCredencial] = useState("");
    const [numeroCredencial, setNumeroCredencial] = useState("");

    const [cargoId, setCargoId] = useState("");
    const [partidoId, setPartidoId] = useState("");

    const [listaNumero, setListaNumero] = useState("");
    const [listaDepartamento, setListaDepartamento] = useState("")
    const [cargos, setCargos] = useState([]);
    const [partidos, setPartidos] = useState([]);
    const [politicos, setPoliticos] = useState([]);
    const [listas, setListas] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [listasPolitico, setListasPolitico] = useState([]);
    

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const responseListas = await getListasByEleccion(eleccionId);
            const responsePartidos = await getPartidos();
            const responsePoliticos = await getPoliticos();
            const responseCargos = await getCargos();
            const responseListasPolitico = await getListaPoliticoByEleccion(eleccionId);
            const responseDepartamentos = await getDepartamentos();

            setDepartamentos(responseDepartamentos.data);
            setListasPolitico(responseListasPolitico.data);
            setListas(responseListas.data);
            setPartidos(responsePartidos.data);
            setPoliticos(responsePoliticos.data);
            setCargos(responseCargos.data);
        } 
        catch (error) {
            console.error("Error al cargar datos:", error);
        }
    };

    const handleCreatePolitico = async (e) => {
        e.preventDefault()
        try{
            const responsePoliticoSave = await savePolitico(cedula, nombre, apellido, fechaNacimiento);

            setCedula("");
            setNombre("");
            setApellido("");
            setFechaNacimiento("");

            const responsePoliticoCargo = await updateCargoPolitico(cedula, cargoId);
            setCargoId("");

            const responsePoliticoPartido = await updatePartidoDePolitico(cedula, partidoId);
            setPartidoId("");

            const responseCredencialSave = await saveCredencial(serieCredencial, numeroCredencial, true);
            const responseSetCredencial = await setCredencial(serieCredencial, numeroCredencial, cedula)
            setSerieCredencial("");
            setNumeroCredencial("");

            const updatedPoliticos = await getPoliticos();
            setPoliticos(updatedPoliticos.data);
                        
        }
        catch(error){
            console.log("error creating politico", error)
        }
    }

    const handleCreateListaEleccion = async (e) => {
        e.preventDefault()
        try{
            const responseListaPoliticoSave = await saveListaPolitico(eleccionId, listaNumero, cedula, listaDepartamento);
            setListasPolitico(prev => [...prev, responseListaPoliticoSave.data]);
            setListaNumero("");
            setCedula("")
        } 
        catch(error){
            console.log("error creating lista eleccion", error)
        }
    }

    return (
        <div>
            <NavBar />
            <div className="flex flex-col items-center justify-center h-[80vh] mt-20 w-max- px-4 max-h-[70vh] overflow-auto">
                <Table className="max-w-4xl mx-auto">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Político</TableHead>
                            <TableHead>Cargo</TableHead>
                            <TableHead>Partido</TableHead>
                            <TableHead>Lista</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {politicos.map((pol) => (
                            <TableRow key={pol.cedulaIdentidad}>
                                <TableCell>{pol.nombreCompleto}</TableCell>
                                <TableCell>
                                    {
                                        cargos.find((car) => car.cargoId === pol.cargoId)?.nombre || "Desconocido"
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        partidos.find((par) => par.partidoId === pol.partidoPoliticoId)?.nombre || "Desconocido"
                                    }
                                </TableCell>
                                <TableCell>
                                    <ul>
                                        {listasPolitico
                                        .filter(lista => lista.cedulaIdentidad === pol.cedulaIdentidad)
                                        .map(lista => {
                                            const deptoNombre = departamentos.find((d) => d.departamentoId === lista.departamentoId)?.nombre || "Desconocido";
                                            return (
                                            <li key={`${lista.numerolista}-${lista.departamentoId}-${lista.eleccionId}`}>
                                                {lista.numerolista} - {deptoNombre}
                                            </li>
                                            );
                                        })}
                                    </ul>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="mt-18 flex flex-row gap-4 justify-around">
                <Popover>
                    <PopoverTrigger asChild>
                        <ButtonCustom label="Crear Politico" size="large"/>
                    </PopoverTrigger>

                    <PopoverContent className="w-80 flex flex-col items-center shadow-2xl border-2 border-blue-900">
                    <form onSubmit={handleCreatePolitico} className="w-full flex flex-col gap-2">
                        <input 
                            value={cedula}  
                            id="cedula" 
                            onChange={(e) => setCedula(e.target.value)} 
                            type="number" 
                            required 
                            placeholder="Ingrese CI del politico" 
                            className="border-4 rounded-md p-2 outline-0"
                        />

                        <input 
                            value={nombre}  
                            id="nombre" 
                            onChange={(e) => setNombre(e.target.value)} 
                            type="text" 
                            required 
                            placeholder="Ingrese nombre del politico" 
                            className="border-4 rounded-md p-2 outline-0"
                        />

                        <input 
                            value={apellido}  
                            id="apellido" 
                            onChange={(e) => setApellido(e.target.value)} 
                            type="text" 
                            required 
                            placeholder="Ingrese apellido del politico" 
                            className="border-4 rounded-md p-2 outline-0"
                        />

                        <input 
                            value={fechaNacimiento}  
                            id="fecha" 
                            onChange={(e) => setFechaNacimiento(e.target.value)} 
                            type="date" 
                            required 
                            placeholder="Ingrese fecha de nacimiento del politico" 
                            className="border-4 rounded-md p-2 outline-0"
                        />

                        <input 
                            value={serieCredencial}  
                            id="serieCredencial" 
                            onChange={(e) => setSerieCredencial(e.target.value)} 
                            type="text" 
                            required 
                            placeholder="Ingrese la serie de la credencial del politico" 
                            className="border-4 rounded-md p-2 outline-0"
                        />

                        <input 
                            value={numeroCredencial}  
                            id="numeroCredencial" 
                            onChange={(e) => setNumeroCredencial(e.target.value)} 
                            type="number" 
                            required 
                            placeholder="Ingrese el numero de la credencial del politico" 
                            className="border-4 rounded-md p-2 outline-0"
                        />

                        <select value={cargoId} onChange={(e) => setCargoId(e.target.value)} required className="border-4 rounded-md p-2 outline-0">
                            <option value="" disabled>Seleccione el cargo</option>
                            {cargos.map((car) => (
                                <option key={car.cargoId} value={car.cargoId}>
                                {car.nombre}
                                </option>
                            ))}
                        </select>

                        <select value={partidoId} onChange={(e) => setPartidoId(e.target.value)} required className="border-4 rounded-md p-2 outline-0">
                            <option value="" disabled>Seleccione el partido politico</option>
                            {partidos.map((par) => (
                                <option key={par.partidoId} value={par.partidoId}>
                                {par.nombre}
                                </option>
                            ))}
                        </select>

                        <ButtonCustom label="Crear" size="small"></ButtonCustom>
                    </form>
                    </PopoverContent>

                </Popover>

                <Popover>
                    <PopoverTrigger asChild>
                        <ButtonCustom label="Asignar lista a politico" size="large" />
                    </PopoverTrigger>

                    <PopoverContent className="w-80 flex flex-col items-center shadow-2xl border-2 border-blue-900">
                    <form onSubmit={handleCreateListaEleccion} className="w-full flex flex-col gap-2">

                        <select value={cedula} onChange={(e) => setCedula(e.target.value)} required className="border-4 rounded-md p-2 outline-0">
                            <option value="" disabled>Seleccione el politico</option>
                            {politicos.map((pol) => (
                                <option key={pol.cedulaIdentidad} value={pol.cedulaIdentidad}>
                                {pol.nombreCompleto}
                                </option>
                            ))}
                        </select>

                        <select value={listaNumero} onChange={(e) => { 
                                const numero = e.target.value; 
                                const departamento = e.target.options[e.target.selectedIndex].dataset.departamento;
                                setListaNumero(numero);
                                setListaDepartamento(departamento);
                                }} 
                                required className="border-4 rounded-md p-2 outline-0">

                            <option value="" disabled>Seleccione la lista</option>
                            {listas.map((lis) => (
                                <option key={`${lis.numero}-${lis.departamentoId}-${lis.eleccionId}`} value={lis.numero} data-departamento={lis.departamentoId}>
                                    {lis.numero}
                                </option>
                            ))}
                        </select>

                        <ButtonCustom label="Asignar" size="small"></ButtonCustom>
                    </form>
                    </PopoverContent>

                </Popover>
                </div>
            </div>
        </div>
    );
}

export default ManageCandidato;
