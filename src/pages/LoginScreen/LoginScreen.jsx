import { Link } from "react-router-dom";
import ButtonCustom from "../../components/atoms/ButtonCustom/ButtonCustom.jsx";
import { MdLock } from "react-icons/md";
import NavBar from "../../Components/NavBar/NavBar.jsx";

function LoginElecciones() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />
      <div className="flex items-center justify-center h-[80vh]">
        <div className="bg-[#3f3f4a] m-[6vh] p-[3vh] w-1/4 rounded-[2vh] flex flex-col gap-[2vh]">
          <input
            type="text"
            placeholder="Ingresar Serie Credencial"
            className="p-[1vh] text-[1.6vh] bg-[#d9d9d9] rounded"
          />
          <input
            type="text"
            placeholder="Ingresar Numero Credencial"
            className="p-[1vh] text-[1.6vh] bg-[#d9d9d9] rounded"
          />
          <button
            className="bg-[#4c5ba8] text-white font-bold p-[1vh] rounded-[1vh] cursor-pointer"
          >
            AUTENTICARSE
          </button>
          <Link to="/MainScreen" className="no-underline">
            <ButtonCustom
              label="Ingresar"
              size="medium"
              variant="primary"
              disabled={false}
              icon={<MdLock />}
              iconPosition="right"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginElecciones;