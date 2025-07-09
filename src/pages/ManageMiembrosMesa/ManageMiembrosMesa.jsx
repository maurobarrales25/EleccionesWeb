import NavBar from "@/components/NavBar/NavBar";
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
import {
  addMiembrosMesaToCircuito,
  getCircuitoById,
  getPresidenteMesaByCI,
  getSecretarioMesaByCI,
  getVocalMesaByCI,
} from "@/api/apiCalls";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ManageMiembrosMesa() {
  const { eleccionId, numero } = useParams();

  const [presidenteCI, setPresidenteCI] = useState("");
  const [secretarioCI, setSecretarioCI] = useState("");
  const [vocalCI, setVocalCI] = useState("");

  const [presidente, setPresidente] = useState(null);
  const [secretario, setSecretario] = useState(null);
  const [vocal, setVocal] = useState(null);

  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const fetchMiembrosMesa = async () => {
    try {
      const responseCircuito = await getCircuitoById(eleccionId, numero);
      const responsePresidente = await getPresidenteMesaByCI(
        responseCircuito.data.presidenteMesaCI
      );
      const responseSecretario = await getSecretarioMesaByCI(
        responseCircuito.data.secretarioMesaCI
      );
      const responseVocal = await getVocalMesaByCI(
        responseCircuito.data.vocalMesaCI
      );

      setPresidente(responsePresidente.data);
      setSecretario(responseSecretario.data);
      setVocal(responseVocal.data);
    } catch (error) {
      console.error("Error fetching Miembros Mesa:", error);
    }
  };

  useEffect(() => {
    fetchMiembrosMesa();
  }, [eleccionId, numero]);

  const handleAddMiembrosMesaToCircuito = async (e) => {
    e.preventDefault();

    if (
      presidenteCI === secretarioCI ||
      presidenteCI === vocalCI ||
      secretarioCI === vocalCI
    ) {
      setErrorDialogOpen(true);
      return;
    }

    try {
      await addMiembrosMesaToCircuito(
        presidenteCI,
        secretarioCI,
        vocalCI,
        eleccionId,
        numero
      );
      await fetchMiembrosMesa();
    } 
    catch (error) {
      console.error("Error al agregar miembros:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center h-[80vh] mt-20 w-max- px-4 max-h-[70vh] overflow-auto">
        <Table className="max-w-4xl">
          <TableHeader>
            <TableRow>
              <TableHead>Miembro</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead>CI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {presidente && (
              <TableRow>
                <TableCell>Presidente</TableCell>
                <TableCell>{presidente.nombre}</TableCell>
                <TableCell>{presidente.apellido}</TableCell>
                <TableCell>{presidente.cedulaIdentidad}</TableCell>
              </TableRow>
            )}
            {secretario && (
              <TableRow>
                <TableCell>Secretario</TableCell>
                <TableCell>{secretario.nombre}</TableCell>
                <TableCell>{secretario.apellido}</TableCell>
                <TableCell>{secretario.cedulaIdentidad}</TableCell>
              </TableRow>
            )}
            {vocal && (
              <TableRow>
                <TableCell>Vocal</TableCell>
                <TableCell>{vocal.nombre}</TableCell>
                <TableCell>{vocal.apellido}</TableCell>
                <TableCell>{vocal.cedulaIdentidad}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="mt-18">
          <Popover>
            <PopoverTrigger asChild>
              <ButtonCustom
                disabled={presidente && secretario && vocal}
                label="Agregar Miembros"
                size="large"
              />
            </PopoverTrigger>
            <PopoverContent className="w-80 flex flex-col items-center shadow-2xl border-2 border-blue-900">
              <form
                onSubmit={handleAddMiembrosMesaToCircuito}
                className="w-full flex flex-col gap-2"
              >
                <input
                  id="presidenteCI"
                  type="number"
                  required
                  placeholder="Ingrese CI del Presidente de Mesa"
                  className="border-4 rounded-md p-2 outline-0"
                  value={presidenteCI}
                  onChange={(e) => setPresidenteCI(e.target.value)}
                />
                <input
                  id="secretarioCI"
                  type="number"
                  required
                  placeholder="Ingrese CI del Secretario de Mesa"
                  className="border-4 rounded-md p-2 outline-0"
                  value={secretarioCI}
                  onChange={(e) => setSecretarioCI(e.target.value)}
                />
                <input
                  id="vocalCI"
                  type="number"
                  required
                  placeholder="Ingrese CI del Vocal de Mesa"
                  className="border-4 rounded-md p-2 outline-0"
                  value={vocalCI}
                  onChange={(e) => setVocalCI(e.target.value)}
                />
                <ButtonCustom label="Crear" size="small" />
              </form>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <AlertDialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error de Validacion</AlertDialogTitle>
            <AlertDialogDescription>
              Todos lass CI deben ser distintas entre si.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-red-500 cursor-pointer hover:bg-red-700"
              onClick={() => setErrorDialogOpen(false)}
            >
              Cerrar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ManageMiembrosMesa;
