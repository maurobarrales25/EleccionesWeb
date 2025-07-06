import { getDepartamentoByCircuitoNumero, getListasByEleccionAndDepartamento, getParticipacionCredencialCircuito, saveVoto, updateParticipacion } from "@/api/apiCalls";
import ButtonCustom from "@/components/atoms/ButtonCustom/ButtonCustom";
import NavBar from "@/components/NavBar/NavBar";
import { Table, TableRow, TableHead, TableHeader, TableBody, TableCell } from '@/Components/ui/table';
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VotarPage() {

    const { ciudadano } = useUser()
    const [ selectedVote, setSelectedVote ] = useState(null)
    const [ lists, setLists ] = useState([])
    const [ participacion, setParticipacion ] = useState(false)
    const [ departamento, setDepartamento ] = useState({})
    const { eleccionId, circuitoNumero } = useParams()

    useEffect(() => {
        handleGetLists()
        setTimeout(() => {handleParticipacion()},400)
    },[])

    const handleGetLists = async() => {
        try {
            const responseDepartamento = await getDepartamentoByCircuitoNumero(circuitoNumero)
            setDepartamento(responseDepartamento.data)

            const response = await getListasByEleccionAndDepartamento(eleccionId, responseDepartamento.data.departamentoId)
            setLists(response.data)
        
        }
        catch(e) {
            console.error(e)
        }
    }

    const handleParticipacion = async() => { 
        try{
            const response = await getParticipacionCredencialCircuito(ciudadano.serieCredencial, ciudadano.numeroCredencial, eleccionId)
            setParticipacion(response.data)
        }
        catch(e){
            console.error(e)
        }
    }

    const handleVotar = async() => {
        const listaSeleccionada = lists[selectedVote]
        if (selectedVote === "blanco") {
            await saveVoto(eleccionId, circuitoNumero, null, true, null, departamento.departamentoId)
            await updateParticipacion(ciudadano.serieCredencial, ciudadano.numeroCredencial, eleccionId, circuitoNumero)
        }
        else {
            const numeroLista = listaSeleccionada.numeroLista
            await saveVoto(eleccionId, circuitoNumero, numeroLista, null, listaSeleccionada.cedulaIdentidad, departamento.departamentoId)
            await updateParticipacion(ciudadano.serieCredencial, ciudadano.numeroCredencial, eleccionId, circuitoNumero)
        }
    }

    return(
        <div>
            <NavBar />
            {!ciudadano ? (
                <div className="mt-20 text-center text-red-600 font-semibold">
                    No estás autorizado para votar.
                </div>
                ) : participacion === true ? 
                (
                <div className="mt-20 text-center text-red-600 font-semibold">
                    Ya participaste en esta elección.
                </div>
                ) : (
                <div className='mt-10 relative flex flex-col items-center justify-center'>
                    <Table className="max-w-4xl mx-auto">
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-12 text-center"></TableHead>
                        <TableHead>Político</TableHead>
                        <TableHead>Partido Político</TableHead>
                        <TableHead>Lista</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lists.map(({ nombrePartido, nombrePolitico, numeroLista }, index) => (
                        <TableRow key={index}>
                            <TableCell>
                            <label className="flex cursor-pointer group">
                                <input
                                type="radio"
                                name="lista"
                                checked={selectedVote == index}
                                value={index}
                                onChange={(e) => setSelectedVote(Number(e.target.value))}
                                className="hidden peer"
                                />
                                <div className="w-5 h-5 rounded-full border-2 border-gray-400 peer-checked:border-blue-600 flex items-center justify-center transition">
                                <div className="w-2.5 h-2.5 bg-blue-600 rounded-full scale-0 peer-checked:scale-100 transition-transform duration-200"></div>
                                </div>
                            </label>
                            </TableCell>
                            <TableCell>{nombrePolitico}</TableCell>
                            <TableCell>{nombrePartido}</TableCell>
                            <TableCell>{numeroLista}</TableCell>
                        </TableRow>
                        ))}
                        <TableRow key={"blanco"}>
                        <TableCell>
                            <label className="flex cursor-pointer group">
                            <input
                                type="radio"
                                name="lista"
                                value={"blanco"}
                                checked={selectedVote === "blanco"}
                                className="hidden peer"
                                onChange={() => setSelectedVote("blanco")}
                            />
                            <div className="w-5 h-5 rounded-full border-2 border-gray-400 peer-checked:border-blue-600 flex items-center justify-center transition">
                                <div className="w-2.5 h-2.5 bg-blue-600 rounded-full scale-0 peer-checked:scale-100 transition-transform duration-200"></div>
                            </div>
                            </label>
                        </TableCell>
                        <TableCell colSpan={3}>Voto en blanco</TableCell>
                        </TableRow>
                    </TableBody>
                    </Table>
                    <div className={`absolute left-80 top-20 transition-opacity duration-300 ${selectedVote !== null ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    {selectedVote !== null && (
                        <ButtonCustom onClick={() => setSelectedVote(null)} label="Limpiar Voto" size="small" />
                    )}
                    </div>
                    <div className="mt-20 flex items-center justify-center">
                    <ButtonCustom onClick={handleVotar} label="Votar" size={selectedVote === null ? "disabled" : ""} />
                    </div>
                </div>
                )}
            </div>
    )
}