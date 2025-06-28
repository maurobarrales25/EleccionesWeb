import "./LoginScreen.css";
import Logo from './escudo.png'

function LoginElecciones() {
  return (
    
    <div id="container">
      <div id="header">
        <img src={Logo} alt="UCU Logo"/>
        <h1>SISTEMA ELECTORAL</h1>
      </div>
      <div id="loginContainer">
        <div id="login">
          <input type="text" placeholder="Ingresar Serie Credencial" />
          <input type="text" placeholder="Ingresar Numero Credencial" />
          <button id="autenticacion">
            AUTENTICARSE 
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginElecciones;
