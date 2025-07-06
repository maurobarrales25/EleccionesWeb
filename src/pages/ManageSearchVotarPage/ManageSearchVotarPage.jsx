import { Link, useNavigate, useParams } from 'react-router-dom'
import NavBar from "@/components/NavBar/NavBar";
import ButtonCustom from '@/Components/atoms/ButtonCustom/ButtonCustom';
import { useEffect, useState } from 'react';
import { Table, TableRow, TableHead, TableHeader, TableBody, TableCell } from '@/Components/ui/table';
import { getCircuitoByCredencialEleccion, getAllCircuitosByEleccion, getEstablecimientoById, getCircuitoById } from '@/api/apiCalls';
import { BsCircleFill } from "react-icons/bs";
import { useUser } from '@/context/UserContext';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function ManageSearchVotarPage() {
    const { ciudadano } = useUser()
    const { eleccionId } = useParams()
    const [ circuito, setCircuito ] = useState({})
    const [ circuitosByEleccion, setCircuitosByEleccion ] = useState([])
    const [ establecimiento, setEstablecimiento ] = useState("")
    const [ estadoVotacionCircuito, setEstadoVotacionCircuito ] = useState(null)
    const [ buttonEnabled, setButtonEnabled ] = useState("disabled")
    const [ errorCredenciales, setErrorCredenciales ] = useState(false)
    

    const navigate = useNavigate()

    useEffect(() => {
        handleGetCircuitosByEleccion()
    }, [])

    useEffect(() => {
        if (ciudadano) {
            handleSubmitCredencial();
        }
    }, [ciudadano]);

    const handleSubmitCredencial = async() => {
        try {
            const responseCredencialCircuito = await getCircuitoByCredencialEleccion(ciudadano.serieCredencial, ciudadano.numeroCredencial, eleccionId)
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
            setErrorCredenciales(true)
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
            <AlertDialog open={errorCredenciales}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Credenciales no válidas</AlertDialogTitle>
                    <AlertDialogDescription>
                    No estás habilitado para votar en esta elección con las credenciales ingresadas.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction className="bg-red-500 cursor-pointer hover:bg-red-700" onClick={() => {setErrorCredenciales(false), navigate("/Elecciones", {state:{baseLink:"/FindCircuitoPage"}})}}>
                    Aceptar
                    </AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

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
                    <TableRow key={circuito.numero}>
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