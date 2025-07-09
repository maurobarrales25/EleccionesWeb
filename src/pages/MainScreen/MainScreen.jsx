import OptionButton from "@/components/atoms/OptionButton/OptionButton";
import NavBar from "@/components/NavBar/NavBar";
import { useUser } from "@/context/UserContext";

function MainScreen() {
  const { ciudadano } = useUser()

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center h-[80vh] gap-15">
      {ciudadano?.role === "admin" ? 
      (
        <>
          <OptionButton texto="GESTIONAR ELECCIONES" navigateTo="/Elecciones" state={{ baseLink: "/ManageEleccion" }} />
          <OptionButton texto="VOTAR" navigateTo="/Elecciones" state={{ baseLink: "/FindCircuitoPage" }} />
          <OptionButton texto="RESULTADOS" navigateTo="/Elecciones" state={{ baseLink: "/ResultsPage" }} />
        </>
      )
      :
      (
        <>
          <OptionButton texto="VOTAR" navigateTo="/Elecciones" state={{ baseLink: "/FindCircuitoPage" }} />
          <OptionButton texto="RESULTADOS" navigateTo="/Elecciones" state={{ baseLink: "/ResultsPage" }} />
        </>
      )}
      </div>
    </div>
  );
}

export default MainScreen;
