import ButtonCustom from "@/components/atoms/ButtonCustom/ButtonCustom";
import NavBar from "@/components/NavBar/NavBar";
import { Link, useParams } from "react-router-dom";

export default function ResultadosByDepartamento() {
    const { eleccionId, departamentoId } = useParams();

    return(
        <div>
            <NavBar/>
            <div className="flex flex-col items-center justify-center h-[80vh] mt-20 w-max- px-4 max-h-[70vh] overflow-auto">
               <div className="flex flex-col justify-around h-[60vh] w-[35vh] ">
                <Link className="w-50" to={`/ResultadosByPartidoDepartamento/${eleccionId}/${departamentoId}`}>
                    <ButtonCustom label="Resultados en el departamento por partido" size="xl"/>
                </Link>
                <Link className="w-50" to={`/ResultadosByCandidatoDepartamento/${eleccionId}/${departamentoId}`}>
                    <ButtonCustom label="Resultados en el departamento por candidato" size="xl"/>
                </Link>
                </div> 
            </div>
        </div>
    )
}