import { Link, useParams } from 'react-router-dom'
import NavBar from "@/components/NavBar/NavBar";
import ButtonCustom from '@/Components/atoms/ButtonCustom/ButtonCustom';
import { useEffect, useState } from 'react';
import { Table, TableRow, TableHead, TableHeader, TableBody, TableCell } from '@/Components/ui/table';
import { getCircuitoByCredencialEleccion, getAllCircuitosByEleccion, getEstablecimientoById, getCircuitoById } from '@/api/apiCalls';
import { BsCircleFill } from "react-icons/bs";

export default function ManageSearchVotarPage() {
    const { eleccionId } = useParams()
    const [ inputSerieCredencial, setInputSerieCredencial ] = useState("")
    const [ circuito, setCircuito ] = useState({})
    const [ circuitosByEleccion, setCircuitosByEleccion ] = useState([])
    const [ inputNumeroCredencial, setInputNumeroCredencial ] = useState("")
    const [ establecimiento, setEstablecimiento ] = useState("")
    const [ estadoVotacionCircuito, setEstadoVotacionCircuito ] = useState(null)
    const [ buttonEnabled, setButtonEnabled ] = useState("disabled")

    useEffect(() => {
        handleGetCircuitosByEleccion()
    }, [])

    const handleSubmitCredencial = async(e) => {
        e.preventDefault()
        try {
            const responseCredencialCircuito = await getCircuitoByCredencialEleccion(inputSerieCredencial, inputNumeroCredencial, eleccionId)
            const response = await getCircuitoById(responseCredencialCircuito.data.eleccionId, responseCredencialCircuito.data.circuitoNumero);
            setCircuito(response.data)
            setEstadoVotacionCircuito(response.data.habilitado)
        }
        catch(e) {
            console.log(e, "ERROR")
            setButtonEnabled("disabled")
            setEstadoVotacionCircuito(null)
            setCircuito({})
            setEstablecimiento("")
        }
    }

    useEffect(() => {
        if (Object.keys(circuito).length > 0) {
            const encontrado = circuitosByEleccion.find(e => e.circuitoId === circuito.circuitoId)
            console.log("Circuito encontrado:", encontrado)
            setButtonEnabled("active")
            
            handleGetEstablecimiento()
        }
    }, [circuito])

    const handleGetCircuitosByEleccion = async() => {
        const response = await getAllCircuitosByEleccion(eleccionId)
        setCircuitosByEleccion(response.data)
    }

    const handleGetEstablecimiento = async() => {
        const responseEstablecimiento = await getEstablecimientoById(circuito.establecimientoId)
        setEstablecimiento(responseEstablecimiento.data)
    }

    return (
        <div>
            <NavBar />
            <div className='flex items-center justify-start mt-20'>
                <div className="flex flex-col justify-center items-start mx-5 h-[5vh]">
                    <form onSubmit={handleSubmitCredencial} className="flex gap-3">
                        <input
                            onChange={(e) => setInputSerieCredencial(e.target.value)}
                            required
                            type="text"
                            placeholder="Ingresar Serie Credencial"
                            className="p-[1vh] text-[1.6vh] bg-[#d9d9d9] w-60 h-full rounded"
                        />
                        <input
                            onChange={(e) => setInputNumeroCredencial(e.target.value)}
                            required
                            type="text"
                            placeholder="Ingresar Numero Credencial"
                            className="p-[1vh] text-[1.6vh] bg-[#d9d9d9] w-60 h-full rounded"
                        /> 
                        <ButtonCustom label="Buscar" size="medium" />                  
                    </form>
                </div>
            </div>
            <div className='mt-10 flex items-center justify-center'>
                <Table className="max-w-4xl mx-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead>Circuito</TableHead>
                        <TableHead>Establecimiento</TableHead>
                        <TableHead>Estado Votacion</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow key={circuito.eleccionId + circuito.numero}>
                        <TableCell>{circuito.numero}</TableCell>
                        <TableCell>{establecimiento.nombre}</TableCell>
                        {estadoVotacionCircuito !== null && (
                            <TableCell>
                            {
                                estadoVotacionCircuito === true ? 
                                    <BsCircleFill className='text-green-600'/>  
                                :
                                    <BsCircleFill className='text-red-600'/>
                            }
                            </TableCell>
                        )}
                        <TableCell>
                        </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </div>
            <div className="mt-20 flex items-center justify-center">
                {(buttonEnabled === "active" && estadoVotacionCircuito === true) ? 
                (
                    <Link to={`/VotarPage/${eleccionId}/${circuito.numero}`}>
                        <ButtonCustom label="Seleccionar Lista" size={buttonEnabled} />
                    </Link>    
                ): 
                (
                    <ButtonCustom label="Seleccionar Lista" size={"disabled"} />
                )}
            </div>
        </div>
  )
}