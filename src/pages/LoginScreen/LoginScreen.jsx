import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../components/atoms/ButtonCustom/ButtonCustom.jsx";
import { MdLock } from "react-icons/md";
import { logIn } from "@/api/apiCalls.js";
import { useState } from "react";
import { useUser } from "@/context/UserContext.jsx";
import coats from "@/assets/Coat_of_arms_of_Uruguay.svg.png";

function LoginScreen() {
  const navigate = useNavigate()
  const { login } = useUser()

  const [ serieCredencial, setSerieCredencial ] = useState("")
  const [ numeroCredencial, setNumeroCredencial ] = useState(0)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await logIn({serie:serieCredencial, numero:numeroCredencial})
      login(response.data)
      navigate("/MainScreen")
    }
    catch(error){
      console.error("ERROR")
    }
  }

  return (
    <div className="flex flex-col items-center max-h-screen min-h-screen bg-blue-900">

      <div className="flex flex-col items-center gap-4 mt-8">
        <img src={coats} alt="Escudo de armas" className="h-32 sm:h-40 md:h-52 lg:h-60" />
        <h1 className="text-4xl md:text-6xl font-bold text-white font-sans mt-4">
          CORTE ELECTORAL
        </h1>
      </div>
      
      <div className="flex items-center justify-center w-full">
        <div className="bg-[#3f3f4a] m-[6vh] p-[3vh] w-full max-w-md rounded-[2vh]">
          <form onSubmit={handleLogin} className="flex flex-col gap-[2vh]">
            <input
              required
              type="text"
              onChange={(e) => setSerieCredencial(e.target.value)}
              placeholder="Ingresar Serie Credencial"
              className="p-[1vh] text-[1.6vh] bg-[#d9d9d9] rounded"
            />
            <input
              required
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

export default LoginScreen;