import { getListasByEleccion } from "@/api/apiCalls";
import ButtonCustom from "@/components/atoms/ButtonCustom/ButtonCustom";
import NavBar from "@/components/NavBar/NavBar";
import { Table, TableRow, TableHead, TableHeader, TableBody, TableCell } from '@/Components/ui/table';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VotarPage() {

    const [ selectedVote, setSelectedVote ] = useState("disabled")
    const [ lists, setLists ] = useState([])
    const { eleccionId, circuitoNumero } = useParams()

    useEffect(() => {
        handleGetLists()
    },[])

    const handleGetLists = async() => {
        try {
            const response = await getListasByEleccion(eleccionId)
            console.log(response.data)
            setLists(response.data)
        }
        catch(e) {
            console.error(e)
        }
    }

    return(
        <div>
            <NavBar />
            <div className='mt-10 flex flex-col items-center justify-center'>
                <Table className="max-w-4xl mx-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead>Politico</TableHead>
                        <TableHead>Partido Politico</TableHead>
                        <TableHead>Lista</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>{}</TableCell>
                        <TableCell>{}</TableCell>
                        <TableCell>

                        </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
                <div className="mt-20 flex items-center justify-center">
                    <ButtonCustom label="Votar" size={selectedVote}/>  
                </div>
            </div>
        </div>
    )
}