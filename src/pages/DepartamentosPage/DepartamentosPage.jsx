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
                        <TableHead className="text-xl font-bold" >Departamento</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {departamentos.map(({ departamentoId, nombre }) => (
                    <TableRow key={ departamentoId}>
                        <Link to={`/ResultadosByDepartamentoPage/${eleccionId}/${departamentoId}`}>
                            <TableCell className="text-xl">{nombre}</TableCell>
                        </Link>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
           
      </div>
    </div>
  );
}
