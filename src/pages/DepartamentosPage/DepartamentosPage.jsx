import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "@/components/NavBar/NavBar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { getDepartamentos } from "@/api/apiCalls"; 

export default function DepartamentosPage() {
  const { eleccionId } = useParams();
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await getDepartamentos();
        setDepartamentos(response.data);
      } 
      catch (error) {
        console.error("Error fetching departamentos:", error);
      }
    };

    fetchDepartamentos(); 
  }, [eleccionId]); 

  return (
    <div>
      <NavBar />
       
            <div className="flex flex-col items-center justify-center h-[80vh] mt-20 px-4 max-h-[70vh] w-full">
                <Table className='flex flex-col w-full items-center'>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[30vh] text-2xl text-center' >Departamento</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {departamentos.map(({ departamentoId, nombre }) => (
                    <TableRow  key={ departamentoId}>
                        <TableCell className='w-[30vh] text-2xl text-center'>
                            <Link to={`/ResultadosByDepartamentoPage/${eleccionId}/${departamentoId}`}>
                                {nombre}
                            </Link>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
           
      </div>
    </div>
  );
}
