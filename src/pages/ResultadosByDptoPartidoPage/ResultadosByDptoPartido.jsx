import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "@/components/NavBar/NavBar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { partidoResultsByDepartamento } from "@/api/apiCalls"; 

export default function ResultadosByPartidoDepartamento() {
  const { eleccionId, departamentoId } = useParams();
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const response = await partidoResultsByDepartamento(eleccionId, departamentoId);
        setResultados(response.data);
      } 
      catch (error) {
        console.error("Error fetching resultados:", error);
      }
    };

    fetchResultados(); 
  }, [departamentoId, eleccionId]); 

  return (
    <div>
      <NavBar />

      <div className="flex flex-col items-center justify-center h-[80vh] mt-20 px-4 max-h-[70vh] overflow-auto">
        <Table className="max-w-4xl">
          <TableHeader>
            <TableRow>
              <TableHead>Departamento</TableHead>
              <TableHead>Partido</TableHead>
              <TableHead>Cant Votos</TableHead>
              <TableHead>Porcentaje</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {resultados.map(({ departamento, partidoPolitico, cantidadVotos, porcentajeVotos }) => (
              <TableRow key={ departamento + partidoPolitico + cantidadVotos + porcentajeVotos}>
                <TableCell>{departamento}</TableCell>
                <TableCell>{partidoPolitico}</TableCell>
                <TableCell>{cantidadVotos}</TableCell>
                <TableCell>{porcentajeVotos}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
