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
import { getListasByEleccion } from "@/api/apiCalls";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListasPoliticos, getPartidos, getPoliticos, saveListaPolitico, getCargos, getDepartamentos } from "@/api/apiCalls";

function ManageCandidato() {
    const { eleccionId } = useParams();
    const [listas, setListas] = useState([]);
    const [numeroLista, setNumeroLista] = useState("");
    const [cedula, setCedula] = useState("");
    const [partidos, setPartidos] = useState([]);
    const [politicos, setPoliticos] = useState([]);
    const [listaPoliticos, setListaPoliticos] = useState([]);
    const [cargos, setCargos] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [departamentoId, setDepartamentoId] = useState("");
    const [cargoNombre, setCargoNombre] = useState("");
    const [partidoId, setPartidoId] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const responseListasPolitico = await getListasPoliticos(eleccionId);
            const responseListas = await getListasByEleccion(eleccionId);
            const responsePartidos = await getPartidos();
            const responsePoliticos = await getPoliticos();
            const responseCargos = await getCargos();
            const responseDepartamentos = await getDepartamentos();

            setListaPoliticos(responseListasPolitico.data);
            setListas(responseListas.data);
            setPartidos(responsePartidos.data);
            setPoliticos(responsePoliticos.data);
            setCargos(responseCargos.data);
            setDepartamentos(responseDepartamentos.data);
        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
    };

    const handleAddListaPolitico = async (e) => {
        e.preventDefault();

        const listaDTO = {
            eleccionId: parseInt(eleccionId),
            numeroLista: parseInt(numeroLista),
            cedulaIdentidad: parseInt(cedula),
            departamentoId: parseInt(departamentoId),
            cargoNombre: cargoNombre,
            partidoId: parseInt(partidoId),
        };

        try {
            await saveListaPolitico(listaDTO);
            await fetchData();
        } catch (error) {
            console.error("Error al agregar lista política:", error);
        }
    };

    const getNombrePolitico = (ci) => {
        const p = politicos.find((c) => c.cedulaIdentidad === ci);
        return p ? `${p.nombre} ${p.apellido}` : "Desconocido";
    };

    return (
        <div>
            <NavBar />
            <Table className="max-w-4xl mx-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead>Político</TableHead>
                        <TableHead>Número Lista</TableHead>
                        <TableHead>Partido</TableHead>
                        <TableHead>Departamento</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {listaPoliticos.map((lista) => (
                        <TableRow key={`${lista.numeroLista}-${lista.cedulaIdentidad}`}>
                            <TableCell>{getNombrePolitico(lista.cedulaIdentidad)}</TableCell>
                            <TableCell>{lista.numeroLista}</TableCell>
                            <TableCell>{lista.partido?.nombre || "Desconocido"}</TableCell>
                            <TableCell>{lista.departamento?.nombre || "Desconocido"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="mt-10 flex justify-center">
                <Popover>
                    <PopoverTrigger asChild>
                        <ButtonCustom label="Agregar Candidato" size="large" disable={false} />
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <form onSubmit={handleAddListaPolitico} className="w-full flex flex-col gap-2">
                            <input
                                type="number"
                                required
                                placeholder="CI del político"
                                className="border-4 rounded-md p-2 outline-0"
                                value={cedula}
                                onChange={(e) => setCedula(e.target.value)}
                            />
                            <select
                                onChange={(e) => setCargoNombre(e.target.value)}
                                required
                                className="border-4 rounded-md p-2"
                            >
                                <option value="">Seleccionar cargo</option>
                                {cargos.map((cargo) => (
                                    <option key={cargo.nombre} value={cargo.nombre}>
                                        {cargo.nombre}
                                    </option>
                                ))}
                            </select>
                            <select
                                onChange={(e) => setPartidoId(e.target.value)}
                                required
                                className="border-4 rounded-md p-2"
                            >
                                <option value="">Seleccionar partido</option>
                                {partidos.map((partido) => (
                                    <option key={partido.partidoId} value={partido.partidoId}>
                                        {partido.nombre}
                                    </option>
                                ))}
                            </select>
                            <select
                                onChange={(e) => setNumeroLista(e.target.value)}
                                required
                                className="border-4 rounded-md p-2"
                            >
                                <option value="">Seleccionar lista</option>
                                {listas.map((lista) => (
                                    <option key={lista.listaId} value={lista.numeroLista}>
                                        {lista.numeroLista}
                                    </option>
                                ))}
                            </select>
                            <select
                                onChange={(e) => setDepartamentoId(e.target.value)}
                                required
                                className="border-4 rounded-md p-2"
                            >
                                <option value="">Seleccionar departamento</option>
                                {departamentos.map((dep) => (
                                    <option key={dep.departamentoId} value={dep.departamentoId}>
                                        {dep.nombre}
                                    </option>
                                ))}
                            </select>
                            <ButtonCustom type="submit" className="w-full">Agregar Candidato</ButtonCustom>
                        </form>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}

export default ManageCandidato;
