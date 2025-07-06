import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "@/components/NavBar/NavBar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { getGanadoresDepartamento } from "@/api/apiCalls"; 

export default function GanadoresPage() {
  const { eleccionId } = useParams();
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const response = await getGanadoresDepartamento(eleccionId);
        setResultados(response.data);
      } 
      catch (error) {
        console.error("Error fetching resultados:", error);
      }
    };

    fetchResultados(); 
  }, [eleccionId]); 

  return (
    <div>
      <NavBar />

      <div className="flex flex-col items-center justify-center h-[80vh] mt-20 px-4 max-h-[70vh] overflow-auto">
        <Table className="max-w-4xl">
          <TableHeader>
            <TableRow>
              <TableHead>Candidato</TableHead>
              <TableHead>Partido</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Cant Votos</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {resultados.map(({ nombreCandidato, nombrePartido, nombreDepartamento, cantidadVotos }) => (
              <TableRow key={nombreCandidato + nombrePartido + nombreDepartamento + cantidadVotos}>
                <TableCell>{nombreCandidato}</TableCell>
                <TableCell>{nombrePartido}</TableCell>
                <TableCell>{nombreDepartamento}</TableCell>
                <TableCell>{cantidadVotos}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
