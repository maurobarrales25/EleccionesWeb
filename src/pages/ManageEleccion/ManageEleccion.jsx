import NavBar from "@/components/NavBar/NavBar";
import ButtonCustom from "@/components/atoms/ButtonCustom/ButtonCustom";
import { useParams, useLocation, Link } from "react-router-dom";

function ManageEleccion() {
  const { eleccionId } = useParams(); 
  const location = useLocation(); 
  const nombre = location.state?.nombre || "Elección sin nombre";

  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-around items-center mt-10 h-[60vh]">
      <h1 className="text-3xl font-bold text-center mt-6">{nombre}</h1>
        <Link to={`/CircuitosPage/${eleccionId}`}>
            <ButtonCustom label="Gestionar Circuitos" size="large" />
        </Link>
        <ButtonCustom label="Gestionar Listas" size="large" />
        <Link to={`/ManagePartidoPolitico/${eleccionId}`}>
        <ButtonCustom 
            label={
                <label>
                Gestionar Partidos <br /> Políticos
                </label>
            } 
            size="large" 
            />
        </Link>
        <ButtonCustom label="Gestionar Candidatos" size="large" />
      </div>
    </div>
  );
}

export default ManageEleccion;
