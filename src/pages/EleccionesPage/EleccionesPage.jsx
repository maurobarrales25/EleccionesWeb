import NavBar from "@/components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { getElecciones } from "@/api/apiCalls";
import { Link, useLocation } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

function EleccionesPage() {
  const location = useLocation();
  const baseLink = location.state?.baseLink;

  const [elecciones, setElecciones] = useState([]);

  useEffect(() => {
    const fetchElecciones = async () => {
      try {
        const response = await getElecciones();
        setElecciones(response.data);
      } catch (error) {
        console.error("Error fetching elecciones:", error);
      }
    };

    fetchElecciones();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="flex justify-center h-[80vh] mt-20 w-full px-4">
        <Table className="max-w-4xl">
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {elecciones.map(({ eleccionId, nombre, fecha }) => (
              <TableRow key={eleccionId}>
                <TableCell>
                  <Link to={`${baseLink}/${eleccionId}`} className="text-blue-600 hover:underline">
                    {nombre}
                  </Link>
                </TableCell>
                <TableCell>{new Date(fecha).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default EleccionesPage;
