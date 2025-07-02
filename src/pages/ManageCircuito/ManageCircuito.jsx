import NavBar from "@/components/NavBar/NavBar";
import ButtonCustom from "@/components/atoms/ButtonCustom/ButtonCustom";
import { useParams, useLocation, Link } from "react-router-dom";

function ManageCircuito() {
  const { circuitoId } = useParams(); 
  const location = useLocation(); 
  const numero = location.state?.numero || "Circuito sin numero";

  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-around items-center mt-10 h-[60vh]">
      <h1 className="text-3xl font-bold text-center mt-6">Circuito Nº {numero}</h1>
        <Link to={`/ManageMiembrosMesa/${circuitoId}`}>
            <ButtonCustom label={
                <label>
                    Gestionar Miembros <br /> de Mesa
                    </label>
                } 
                size="large" 
            />
        </Link>
        <ButtonCustom label="Iniciar Votacion" size="large" />
        <ButtonCustom label="Finalizar Votacion" size="large" />
      </div>
    </div>
  );
}
export default ManageCircuito;