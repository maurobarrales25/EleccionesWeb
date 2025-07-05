import ButtonCustom from "@/components/atoms/ButtonCustom/ButtonCustom";
import NavBar from "@/components/NavBar/NavBar";
import { Link } from "react-router-dom";

export default function ResultadosPage() {
    return(
        <div>
            <NavBar/>
            <div className="w-screen flex items-center justify-center">
               <div className="flex w-[35vh] mt-10 flex-col justify-around items-center h-[60vh]">
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