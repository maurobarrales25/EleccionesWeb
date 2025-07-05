import { getEleccionById, updateEleccionHabilitado } from "@/api/apiCalls";
import NavBar from "@/components/NavBar/NavBar";
import ButtonCustom from "@/components/atoms/ButtonCustom/ButtonCustom";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from "@/Components/ui/popover";

function ManageEleccion() {
  const { eleccionId } = useParams(); 
  const [habilitado, setHabilitado] = useState(false);
  const [eleccion, setEleccion] = useState({});
  
    const getEleccion = async () => {
      try {
        const eleccion = await getEleccionById(eleccionId);
        setEleccion(eleccion.data);
        setHabilitado(eleccion.data.habilitado);
      } 
      catch (e) {
        console.error("Error:", e);
      }
    };
  
    useEffect(() => {
      getEleccion();
    }, []);
  
    const handleToggleHabilitado = async (valor) => {
      try {
        await updateEleccionHabilitado(eleccionId, valor);
        setHabilitado(valor);
      } 
      catch (error) {
        console.error("Error:", error);
      }
    };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-around items-center mt-10 h-[60vh]">
      <h1 className="text-3xl font-bold text-center mt-6">{eleccion.nombre}</h1>
        <Link to={`/CircuitosPage/${eleccionId}`}>
            <ButtonCustom label="Gestionar Circuitos" size="large" disabled={habilitado !== true}/>
        </Link>
        <Link to ={`/ManageList/${eleccionId}`}>
          <ButtonCustom label="Gestionar Listas" size="large" disabled={habilitado !== true}/>
        </Link>
        <Link to={`/ManagePartidoPolitico/${eleccionId}`}>
          <ButtonCustom 
              label={
                  <label>
                  Gestionar Partidos <br /> Políticos
                  </label>
              }   
              size="large" 
              disabled={habilitado !== true}
            />
        </Link>
        <ButtonCustom label="Gestionar Candidatos" size="large" disabled={habilitado !== true}/>

        <Popover>
          <PopoverTrigger asChild>
            <ButtonCustom
              label="Iniciar Eleccion"
              size="large"
              disabled={habilitado === true || habilitado === false}
            />
          </PopoverTrigger>
          <PopoverContent className="w-80 flex flex-col items-center shadow-2xl border-2 border-blue-900">
            <p className="text-center mb-4">
              ¿Está seguro de que desea iniciar la eleccion?
            </p>
            <ButtonCustom
              label="Confirmar Inicio"
              onClick={() => handleToggleHabilitado(true)}
              size="small"
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <ButtonCustom
              label="Finalizar Eleccion"
              size="large"
              disabled={habilitado !== true}
            />
          </PopoverTrigger>
          <PopoverContent className="w-80 flex flex-col items-center shadow-2xl border-2 border-blue-900">
            <p className="text-center mb-4">
              ¿Está seguro de que desea finalizar la eleccion?
            </p>
            <ButtonCustom
              label="Confirmar Finalizacion"
              onClick={() => handleToggleHabilitado(false)}
              size="small"
            />
          </PopoverContent>
        </Popover>

      </div>
    </div>
  );
}

export default ManageEleccion;
