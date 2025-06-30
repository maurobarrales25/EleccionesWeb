import NavBar from "@/components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { getCircuitosByEleccion } from "@/api/apiCalls";
import { Link, useParams } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import ButtonCustom from "@/components/atoms/ButtonCustom/ButtonCustom";

function CircuitosPage() {
  const { eleccionId } = useParams();
  const [circuitos, setCircuitos] = useState([]);

  useEffect(() => {
    const fetchCircuitos = async () => {
      try {
        const response = await getCircuitosByEleccion(eleccionId);
        setCircuitos(response.data);
      } 
      catch (error) {
        console.error("Error fetching circuitos:", error);
      }
    };

    if (eleccionId) fetchCircuitos();
  }, [eleccionId]);

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center h-[80vh] mt-20 w-max- px-4 max-h-[70vh] overflow-auto">
        <Table className="max-w-4xl">
          <TableHeader>
            <TableRow>
              <TableHead>Numero</TableHead>
              <TableHead>Establecimiento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {circuitos.map(({ circuitoId, numero, establecimientoId }) => (
              <TableRow key={circuitoId}>
                <TableCell>
                  <Link to={`/ManageCircuito/${eleccionId}/${circuitoId}`} className="text-blue-600 hover:underline">
                    {numero}
                  </Link>
                </TableCell>
                <TableCell>{establecimientoId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-18">
          <ButtonCustom label="Crear Circuito" size="large" />
        </div>
      </div>
    </div>
  );
}

export default CircuitosPage;
