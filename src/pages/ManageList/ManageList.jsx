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
import { getListasByEleccion, getDepartamentos, saveLista } from "@/api/apiCalls";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ManageList() {
    const { eleccionId } = useParams();
    const [listas, setListas] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [numeroLista, setNumeroLista] = useState("");
    const [departamentoId, setDepartamentoId] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await getListasByEleccion(eleccionId);
            const responseDepartamentos = await getDepartamentos();
            console.log("depto: " + responseDepartamentos)
            setListas(response.data);
            setDepartamentos(responseDepartamentos.data);
        } catch (error) {
            console.error("Error al cargar listas:", error);
        }
    };

    const handleAddLista = async (e) => {
        e.preventDefault();
        try {
            const responseSave = await saveLista(eleccionId, departamentoId, numeroLista);
            setListas(prev => [...prev, responseSave.data])
        } 
        catch (error) {
            console.error("Error al agregar lista:", error);
        }
    };

    const getDepartamentoNombre = (departamentoId) => {
        const departamento = departamentos.find((d) => d.departamentoId === departamentoId);
        return departamento ? departamento.nombre : "Desconocido";
    };

    return (
        <div>
            <NavBar />
            <div className="flex flex-col items-center justify-center h-[80vh] mt-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Numero de Lista</TableHead>
                            <TableHead>Departamento</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {listas.map((lista) => (
                            
                            <TableRow key={`${lista.eleccionId}-${lista.departamentoId}-${lista.numero}`}>
                                <TableCell>{lista.numero}</TableCell>
                                <TableCell>{getDepartamentoNombre(lista.departamentoId)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="mt-18">
                    <Popover>
                        <PopoverTrigger asChild>
                            <ButtonCustom label="Agregar Lista" size="large" disable={false} />
                        </PopoverTrigger>
                        <PopoverContent className="w-80 flex flex-col items-center shadow-2xl border-2 border-blue-900">
                            <form onSubmit={handleAddLista} className="w-full flex flex-col gap-2">
                                <input
                                    id="numeroLista"
                                    type="number"
                                    placeholder="Número de Lista"
                                    className="border-4 rounded-md p-2 outline-0"
                                    value={numeroLista}
                                    onChange={(e) => setNumeroLista(e.target.value)}
                                />
                                <select value={departamentoId} onChange={(e) => setDepartamentoId(e.target.value)} required className="border-4 rounded-md p-2 outline-0">
                                    <option value="" disabled>Seleccione el departamento</option>
                                    {departamentos.map((dep) => (
                                        <option key={dep.departamentoId} value={dep.departamentoId}>
                                        {dep.nombre}
                                        </option>
                                    ))}
                                </select>

                                <ButtonCustom label="Agregar" size="medium" disable={false} />
                            </form>
                        </PopoverContent>
                    </Popover>
                </div>

            </div>
        </div>
    );
}
export default ManageList;