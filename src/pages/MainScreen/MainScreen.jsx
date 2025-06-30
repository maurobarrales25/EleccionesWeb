import OptionButton from "@/components/atoms/OptionButton/OptionButton";
import NavBar from "@/components/NavBar/NavBar";

function MainScreen() {
  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center h-[80vh] gap-15">
        <OptionButton texto="GESTIONAR ELECCIONES" navigateTo="/Elecciones" state={{ baseLink: "/ManageEleccion" }} />
        <OptionButton texto="VOTAR" navigateTo="/Elecciones" state={{ baseLink: "/FindCircuitoPage" }} />
        <OptionButton texto="RESULTADOS" navigateTo="/Elecciones" state={{ baseLink: "/ResultsPage" }} />
      </div>
    </div>
  );
}

export default MainScreen;
