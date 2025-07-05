import NavBar from "@/components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { getElecciones, saveEleccion } from "@/api/apiCalls";
import { Link, useLocation } from "react-router-dom";
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

function EleccionesPage() {
  const location = useLocation();
  const baseLink = location.state?.baseLink;

  const [elecciones, setElecciones] = useState([]);
  const [inputPopUpEleccion, setInputPopUpEleccion] = useState("");
  const [selectTipoEleccion, setSelectTipoEleccion] = useState("")

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

  const handleCreateEleccion = async(e) => {
    e.preventDefault()
    try{
        const response = await saveEleccion(inputPopUpEleccion, selectTipoEleccion)
        setElecciones(prev => [...prev, response.data])
        setInputPopUpEleccion("");
        setSelectTipoEleccion("");
    }
    catch(error){
        console.log("error", error)
    }
  }

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center h-[80vh] mt-20 w-max- px-4 max-h-[70vh] overflow-auto">
        <Table className="max-w-4xl">
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Habilitado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {elecciones.map(({ eleccionId, nombre, fecha, habilitado }) => (
              <TableRow key={eleccionId}>
                <TableCell>
                  {baseLink != "/FindCircuitoPage" ? (
                    <Link
                      to={{
                        pathname: `${baseLink}/${eleccionId}`,
                      }}
                      state={{ nombre }}
                      className="text-blue-600 hover:underline"
                    >
                      {nombre}
                    </Link>
                  ) : (
                    habilitado ? (
                      <Link
                        to={{
                          pathname: `${baseLink}/${eleccionId}`,
                        }}
                        state={{ nombre }}
                        className="text-blue-600 hover:underline"
                      >
                        {nombre}
                      </Link>
                    ) : (
                      nombre
                    )
                  )}
                </TableCell>
                <TableCell>{new Date(fecha).toLocaleDateString()}</TableCell>
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
        {baseLink === "/ManageEleccion" && (
        <div className="mt-18">
          <Popover>
            <PopoverTrigger asChild>
              <ButtonCustom label="Crear Eleccion" size="large" />
            </PopoverTrigger>

            <PopoverContent className="w-80 flex flex-col items-center shadow-2xl border-2 border-blue-900">
              <form onSubmit={handleCreateEleccion} className="w-full flex flex-col gap-2">
                <input id="nombreEleccion" value={inputPopUpEleccion}  onChange={(e) => setInputPopUpEleccion(e.target.value)} type="text" required placeholder="Ingrese nombre de la eleccion" className="border-4 rounded-md p-2 outline-0"/>

                <select value={selectTipoEleccion} onChange={(e) => setSelectTipoEleccion(e.target.value)} required className="border-4 rounded-md p-2 outline-0">
                  <option value="" disabled>Seleccione tipo de eleccion</option>
                  <option value="PRESIDENCIAL">PRESIDENCIAL</option>
                  <option value="BALLOTAGE">BALLOTAGE</option>
                </select>

                <ButtonCustom label="Crear" size="small"></ButtonCustom>
              </form>
            </PopoverContent>
            
          </Popover>
        </div>
       )}
      </div>
    </div>
  );
}

export default EleccionesPage;
