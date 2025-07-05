import NavBar from "@/components/NavBar/NavBar";
import ButtonCustom from "@/components/atoms/ButtonCustom/ButtonCustom";
import { useParams, Link } from "react-router-dom";
import { updateCircuitoHabilitado, getCircuitoById } from "@/api/apiCalls"; 
import { useState, useEffect } from "react";

function ManageCircuito() {
  const { eleccionId, numero } = useParams();
  const [habilitado, setHabilitado] = useState(null);
  const [circuito, setCircuito] = useState({});

  const getCircuito = async () => {
    try {
      const circuito = await getCircuitoById(eleccionId, numero);
      setCircuito(circuito);
      setHabilitado(circuito.data.habilitado);
    } 
    catch (e) {
      console.error("Error:", e);
    }
  };

  useEffect(() => {
    getCircuito();
  }, []);

  const handleToggleHabilitado = async (valor) => {
    try {
      await updateCircuitoHabilitado(eleccionId, numero, valor);
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
        <h1 className="text-3xl font-bold text-center mt-6">
          Circuito Nº {numero}
        </h1>

        <Link to={`/ManageMiembrosMesa/${eleccionId}/${numero}`} className="mb-4">
          <ButtonCustom
            label={
              <label>
                Gestionar Miembros <br /> de Mesa
              </label>
            }
            size="large"
          />
        </Link>

        <ButtonCustom
          label="Iniciar Votación"
          onClick={() => handleToggleHabilitado(true)}
          size="large"
          disabled={habilitado === true || habilitado === false} 
        />

        <ButtonCustom
          label="Finalizar Votación"
          onClick={() => handleToggleHabilitado(false)}
          size="large"
          disabled={habilitado !== true} 
        />
      </div>
    </div>
  );
}

export default ManageCircuito;
