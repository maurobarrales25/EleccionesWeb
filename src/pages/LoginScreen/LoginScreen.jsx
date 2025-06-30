import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../components/atoms/ButtonCustom/ButtonCustom.jsx";
import { MdLock } from "react-icons/md";
import NavBar from "../../Components/NavBar/NavBar.jsx";
import { logIn } from "@/api/apiCalls.js";
import { useState } from "react";
import { useUser } from "@/context/UserContext.jsx";

function LoginElecciones() {
  const navigate = useNavigate()
  const { setCiudadano } = useUser()

  const [ serieCredencial, setSerieCredencial ] = useState("")
  const [ numeroCredencial, setNumeroCredencial ] = useState(0)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await logIn({serie:serieCredencial, numero:numeroCredencial})
      setCiudadano(response.data)
      
      if (response.data.role === "user") {
        navigate("/admin")
      }

      navigate("/admin1")
    }
    catch(error){
      console.error("ERROR")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />
      <div className="flex items-center justify-center h-[80vh]">
        <div className="bg-[#3f3f4a] m-[6vh] p-[3vh] w-1/4 rounded-[2vh]">
        <form onSubmit={handleLogin} className="flex flex-col gap-[2vh]">
          <input
            type="text"
            onChange={(e) => setSerieCredencial(e.target.value)}
            placeholder="Ingresar Serie Credencial"
            className="p-[1vh] text-[1.6vh] bg-[#d9d9d9] rounded"
          />
          <input
            type="text"
            onChange={(e) => setNumeroCredencial(e.target.value)}
            placeholder="Ingresar Numero Credencial"
            className="p-[1vh] text-[1.6vh] bg-[#d9d9d9] rounded"
          />
          <ButtonCustom
            label="Ingresar"
            size="full"
            variant="primary"
            disabled={false}
            icon={<MdLock />}
            iconPosition="right"
          />
        </form>
        </div>
      </div>
    </div>
  );
}

export default LoginElecciones;
