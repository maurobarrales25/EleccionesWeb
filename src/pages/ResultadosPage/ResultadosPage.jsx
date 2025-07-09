import ButtonCustom from "@/components/atoms/ButtonCustom/ButtonCustom";
import NavBar from "@/components/NavBar/NavBar";
import { Link, useParams } from "react-router-dom";

export default function ResultadosPage() {
    const { eleccionId } = useParams();

    return(
        <div>
            <NavBar/>
            <div className="flex flex-col items-center justify-center h-[80vh] mt-20 w-max- px-4 max-h-[70vh] overflow-auto">
               <div className="flex flex-col justify-around h-[60vh] w-[35vh] ">
                <Link className="w-50" to={`/CircuitosPage/${eleccionId}`} state={{ baseLink: "/ResultadosByCircuitosPage" }}>
                    <ButtonCustom label="Resultados por Circuito" size="xl"/>
                </Link>
                <Link className="w-50" to={`/DepartamentosPage/${eleccionId}`}>
                    <ButtonCustom label="Resultados por Departamento" size="xl"/>
                </Link>
                <Link className="w-50" to={`/GanadoresPage/${eleccionId}`}>
                    <ButtonCustom label="Ganadores Departamentales" size="xl"/>
                </Link>
                </div> 
            </div>
        </div>
    )
}