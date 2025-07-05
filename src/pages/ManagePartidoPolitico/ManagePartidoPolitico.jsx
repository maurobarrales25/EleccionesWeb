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
import { getPartidos, getCiudadanos, savePartido } from "@/api/apiCalls";
import { useEffect, useState } from "react";


function ManagePartidoPolitico() {
    const [partidosPoliticos, setPartidosPoliticos] = useState([]);
    const [ciudadanos, setCiudadanos] = useState([]);

    const [nombrePartido, setNombrePartido] = useState("");
    const [calleSede, setCalleSede] = useState("");
    const [numeroSede, setNumeroSede] = useState("");
    const [presidenteCI, setPresidenteCI] = useState("");


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const responsePartido = await getPartidos();
            const responseCiudadanos = await getCiudadanos();
            setPartidosPoliticos(responsePartido.data);
            setCiudadanos(responseCiudadanos.data);
        } catch (error) {
            console.error("Error al cargar partidos o presidentes", error);
        }
    };

    const handleAddPartidoPolitico = async (e) => {
        e.preventDefault();
        try {
            await savePartido(nombrePartido, calleSede, numeroSede, presidenteCI);
            await fetchData();
        } catch (error) {
            console.error("Error al agregar partido político:", error);
        }
    };

    const getNombrePresidente = (ci) => {
        const ciudadano = ciudadanos.find((c) => c.cedulaIdentidad === ci);
        return ciudadano ? `${ciudadano.nombre} ${ciudadano.apellido}` : "Desconocido";
    };

    return (
        <div>
            <NavBar />
            <div className="flex flex-col items-center justify-center h-[80vh] mt-2">
                <Table className="max-w-4xl">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre Partido</TableHead>
                            <TableHead>Presidente</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {partidosPoliticos.map((partido) => (
                            <TableRow key={partido.partidoId}>
                                <TableCell>{partido.nombre}</TableCell>
                                <TableCell>{getNombrePresidente(partido.presidenteCI)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="mt-18">
                    <Popover>
                        <PopoverTrigger asChild>
                            <ButtonCustom label="Agregar Partido" size="large" disabled={false} />
                        </PopoverTrigger>
                        <PopoverContent className="w-80 flex flex-col items-center shadow-2xl border-2 border-blue-900">
                            <form onSubmit={handleAddPartidoPolitico} className="w-full flex flex-col gap-2">
                                <input
                                    id="nombrePartido"
                                    type="text"
                                    required
                                    placeholder="Nombre del partido"
                                    className="border-4 rounded-md p-2 outline-0"
                                    value={nombrePartido}
                                    onChange={(e) => setNombrePartido(e.target.value)}
                                />
                                <input
                                    id="calleSede"
                                    type="text"
                                    required
                                    placeholder="Calle de la sede"
                                    className="border-4 rounded-md p-2 outline-0"
                                    value={calleSede}
                                    onChange={(e) => setCalleSede(e.target.value)}
                                />
                                <input
                                    id="numeroSede"
                                    type="number"
                                    required
                                    placeholder="Número de la sede"
                                    className="border-4 rounded-md p-2 outline-0"
                                    value={numeroSede}
                                    onChange={(e) => setNumeroSede(e.target.value)}
                                />
                                <input
                                    id="presidenteCI"
                                    type="number"
                                    required
                                    placeholder="CI del Presidente"
                                    className="border-4 rounded-md p-2 outline-0"
                                    value={presidenteCI}
                                    onChange={(e) => setPresidenteCI(e.target.value)}
                                />
                                <ButtonCustom label="Crear" size="small" />
                            </form>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
}

export default ManagePartidoPolitico;
