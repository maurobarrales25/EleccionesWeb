import ButtonCustom from "@/components/atoms/ButtonCustom/ButtonCustom";
import NavBar from "@/components/NavBar/NavBar";
import { Link } from "react-router-dom";

export default function ResultadosPage() {
    return(
        <div>
            <NavBar/>
            <div className="flex flex-col items-center justify-center h-[80vh] mt-20 w-max- px-4 max-h-[70vh] overflow-auto">
               <div className="flex flex-col justify-around h-[60vh] w-[35vh] ">
                <Link className="w-72">
                    <ButtonCustom label="Por Circuito" size="full"/>
                </Link>
                <Link className="w-72">
                    <ButtonCustom label="Por Partido en un Circuito" size="full"/>
                </Link>
                <Link className="w-72">
                    <ButtonCustom label="Por Candidato en un Circuito" size="full"/>
                </Link>
                <Link className="w-72">
                    <ButtonCustom label="Por Partido en un Departamento" size="full"/>
                </Link>
                <Link className="w-72">
                    <ButtonCustom label="Por Candidato en un Departamento" size="full"/>
                </Link>
                </div> 
            </div>
        </div>
    )
}