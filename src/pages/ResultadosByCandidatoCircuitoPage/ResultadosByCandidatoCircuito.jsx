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
import { candidatoResultsByCircuito } from "@/api/apiCalls"; 

export default function ResultadosByCandidatoCircuito() {
  const { eleccionId, numero: circuitoId } = useParams();
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const response = await candidatoResultsByCircuito(eleccionId, circuitoId);
        setResultados(response.data);
      } 
      catch (error) {
        console.error("Error fetching resultados:", error);
      }
    };

    fetchResultados(); 
  }, [circuitoId, eleccionId]); 

  return (
    <div>
      <NavBar />

      <div className="flex flex-col items-center justify-center h-[80vh] mt-20 px-4 max-h-[70vh] overflow-auto">
        <Table className="max-w-4xl">
          <TableHeader>
            <TableRow>
              <TableHead>Nº Circuito</TableHead>
              <TableHead>Partido</TableHead>
              <TableHead>Candidato</TableHead>
              <TableHead>Cant Votos</TableHead>
              <TableHead>Porcentaje</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {resultados.map(({ partido, candidato, cantidadVotos, porcentajeVotos }) => (
              <TableRow key={partido + candidato + cantidadVotos + porcentajeVotos}>
                <TableCell>{circuitoId}</TableCell>
                <TableCell>{partido}</TableCell>
                <TableCell>{candidato}</TableCell>
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
