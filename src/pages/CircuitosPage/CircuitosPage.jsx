import NavBar from "@/components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { getAllCircuitosByEleccion, getEstablecimientos, saveCircuito } from "@/api/apiCalls";
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
import { Popover, PopoverTrigger, PopoverContent } from "@/Components/ui/popover";

function CircuitosPage() {
  const { eleccionId } = useParams();
  const [circuitos, setCircuitos] = useState([]);
  const [establecimientos, setEstablecimientos] = useState([]);
  const [establecimientoId, setEstablecimientoId] = useState("");
  const [numeroCircuito, setNumeroCircuito] = useState("");

  useEffect(() => {
    const fetchCircuitos = async () => {
      try {
        const response = await getAllCircuitosByEleccion(eleccionId);
        setCircuitos(response.data);
      } 
      catch (error) {
        console.error("Error fetching circuitos:", error);
      }
    };
    if (eleccionId) {
      fetchCircuitos();
    }
  }, [eleccionId]);

  useEffect(() => {
    const fetchEstablecimientos = async () => {
      try {
        const response = await getEstablecimientos();
        setEstablecimientos(response.data);
      } 
      catch (error) {
        console.error("Error fetching establecimientos:", error);
      }
    };
    fetchEstablecimientos();
  }, []);

  const handleCreateCircuito = async(e) => {
    e.preventDefault()
    try{
        const responseSave = await saveCircuito(eleccionId, numeroCircuito, establecimientoId )
        setCircuitos(prev => [...prev, responseSave.data])
        setNumeroCircuito("")
        setEstablecimientoId("")
    }
    catch(error){
        console.log("error", error)
    }
  }

  return (
    <div>
      <NavBar />

      <div className="flex flex-col items-center justify-center h-[80vh] mt-20 px-4 max-h-[70vh] overflow-auto">
        <Table className="max-w-4xl">
          <TableHeader>
            <TableRow>
              <TableHead>Numero</TableHead>
              <TableHead>Establecimiento</TableHead>
              <TableHead>Estado Votacion</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {circuitos.map(({ eleccionId, numero, establecimientoId, habilitado }) => (
              <TableRow key={eleccionId + numero}>
                <TableCell>
                  <Link to={`/ManageCircuito/${eleccionId}/${numero}`} className="text-blue-600 hover:underline">
                    {numero}
                  </Link>
                </TableCell>
                <TableCell>
                  {
                    establecimientos.find((est) => est.establecimientoId === establecimientoId)?.nombre || "Desconocido"
                  }
                </TableCell>
                <TableCell>
                  {habilitado === true ? (
                    <p className="text-green-600"> Iniciada </p>
                  ) : habilitado === false ? (
                    <p className="text-red-600"> Finalizada </p>
                  ) : (
                    <p className="text-amber-500"> Sin iniciar </p>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        
        </Table>

        <div className="mt-18 ">
          <Popover>
            <PopoverTrigger asChild>
              <ButtonCustom label="Crear Circuito" size="large" />
            </PopoverTrigger>

            <PopoverContent className="w-80 flex flex-col items-center shadow-2xl border-2 border-blue-900">
              <form onSubmit={handleCreateCircuito} className="w-full flex flex-col gap-2">
                <input 
                  value={numeroCircuito}  
                  id="numeroCircuito" 
                  onChange={(e) => setNumeroCircuito(e.target.value)} 
                  type="number" 
                  required 
                  placeholder="Ingrese numero del circuito" 
                  className="border-4 rounded-md p-2 outline-0"
                  />
                <select value={establecimientoId} onChange={(e) => setEstablecimientoId(e.target.value)} required className="border-4 rounded-md p-2 outline-0">

                  <option value="" disabled>Seleccione el establecimiento</option>
                  {establecimientos.map((est) => (
                    <option key={est.establecimientoId} value={est.establecimientoId}>
                      {est.nombre}
                    </option>
                  ))}

                </select>
                <ButtonCustom label="Crear" size="small"></ButtonCustom>
              </form>
            </PopoverContent>

          </Popover>
        </div>
        
      </div>
    </div>
  );
}

export default CircuitosPage;
