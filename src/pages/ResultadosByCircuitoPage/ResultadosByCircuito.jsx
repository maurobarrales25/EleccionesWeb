import ButtonCustom from "@/components/atoms/ButtonCustom/ButtonCustom";
import NavBar from "@/components/NavBar/NavBar";
import { Link, useParams } from "react-router-dom";

export default function ResultadosByCircuitosPage() {
    const { eleccionId, numero } = useParams();

    return(
        <div>
            <NavBar/>
            <div className="flex flex-col items-center justify-center h-[80vh] mt-20 w-max- px-4 max-h-[70vh] overflow-auto">
               <div className="flex flex-col justify-around h-[60vh] w-[35vh] ">
                <Link className="w-50" to={`/ResultadosByListaCircuito/${eleccionId}/${numero}`}>
                    <ButtonCustom label="Resultados en el circuito por listas" size="xl"/>
                </Link>
                <Link className="w-50" to={`/ResultadosByPartidoCircuito/${eleccionId}/${numero}`}>
                    <ButtonCustom label="Resultados en el circuito por partido" size="xl"/>
                </Link>
                <Link className="w-50" to={`/ResultadosByCandidatoCircuito/${eleccionId}/${numero}`}>
                    <ButtonCustom label="Resultados en el circuito por candidato" size="xl"/>
                </Link>
                </div> 
            </div>
        </div>
    )
}