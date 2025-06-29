import "./LoginScreen.css";
import Logo from './escudo.png'
import { Link } from "react-router-dom";
import MenuGestionarElecciones from "../GestionarElecciones/MenuGestionarElecciones.jsx";
import ButtonCustom from "../../Components/atoms/ButtonCustom.jsx";
import { MdLock } from "react-icons/md";
import NavBar from "../../Components/NavBar/NavBar.jsx";

function LoginElecciones() {
  return (
    <div>
      <NavBar />

      <div id="loginContainer">
        <div id="login">
          <input type="text" placeholder="Ingresar Serie Credencial" />
          <input type="text" placeholder="Ingresar Numero Credencial" />
          <button id="autenticacion">AUTENTICARSE</button>

          <Link to="/MenuGestionarElecciones" style={{ textDecoration: 'none' }}>
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
