import NavBar from "@/components/NavBar/NavBar";
import ButtonCustom from "@/components/atoms/ButtonCustom/ButtonCustom";
import { useParams, Link } from "react-router-dom";
import { updateCircuitoHabilitado, getCircuitoById, getCredenciales, getCredencialesBySerie, saveCredencialCircuito } from "@/api/apiCalls"; 
import { useState, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/Components/ui/popover";

function ManageCircuito() {
  const { eleccionId, numero } = useParams();
  const [habilitado, setHabilitado] = useState(false);
  const [circuito, setCircuito] = useState({});
  const [credenciales, setCredenciales] = useState([]);
  const [credencialesBySerie, setCredencialesBySerie] = useState([]);
  const [serieCredencial, setSerieCredencial] = useState("");
  const [numeroCredencial, setNumeroCredencial] = useState("");

  const getCircuito = async () => {
    try {
      const circuito = await getCircuitoById(eleccionId, numero);
      setCircuito(circuito);
      setHabilitado(circuito.data.habilitado);
    } 
    catch (e) {
      console.error("Error:", e);
    }
  };

  const fetchData = async () => {
    try {
      const responseCredencial = await getCredenciales();
      setCredenciales(responseCredencial.data);
    }
    catch (e) {
      console.error("Error:", e);
    }
  }

  const handleSaveCredencialCircuito = async(e) => {
      e.preventDefault()
      try{
          const response = await saveCredencialCircuito(serieCredencial, numeroCredencial, eleccionId, numero, false)
          setSerieCredencial("");
          setNumeroCredencial("");
      }
      catch(error){
          console.log("error", error)
      }
    }

  useEffect(() => {
  const fetchBySerie = async () => {
    if (serieCredencial !== "") {
      try {
        const response = await getCredencialesBySerie(serieCredencial);
        setCredencialesBySerie(response.data || []);
      } 
      catch (e) {
        console.error("Error cargando credenciales por serie:", e);
        setCredencialesBySerie([]);
      }
    } else {
      setCredencialesBySerie([]);
    }
  };

  fetchBySerie();
}, [serieCredencial]);

  useEffect(() => {
    getCircuito();
    fetchData();
  }, []);

  const handleToggleHabilitado = async (valor) => {
    try {
      await updateCircuitoHabilitado(eleccionId, numero, valor);
      setHabilitado(valor);
    } 
    catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-around items-center mt-10 h-[60vh]">
        <h1 className="text-3xl font-bold text-center mt-6">
          Circuito Nº {numero}
        </h1>

        <Link to={`/ManageMiembrosMesa/${eleccionId}/${numero}`} className="mb-4">
          <ButtonCustom
            label={
              <label>
                Gestionar Miembros <br /> de Mesa
              </label>
            }
            size="large"
          />
        </Link>

        <Popover>
          <PopoverTrigger asChild>
            <ButtonCustom
              label="Iniciar Votación"
              size="large"
              disabled={habilitado === true || habilitado === false || circuito.data.presidenteMesaCI === 0 || circuito.data.secretarioMesaCI === 0 || circuito.data.vocalMesaCI === 0}
            />
          </PopoverTrigger>
          <PopoverContent className="w-80 flex flex-col items-center shadow-2xl border-2 border-blue-900">
            <p className="text-center mb-4">
              ¿Está seguro de que desea iniciar la votación para este circuito?
            </p>
            <ButtonCustom
              label="Confirmar Inicio"
              onClick={() => handleToggleHabilitado(true)}
              size="small"
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <ButtonCustom
              label="Finalizar Votación"
              size="large"
              disabled={habilitado !== true || circuito.data.presidenteMesaCI === 0 || circuito.data.secretarioMesaCI === 0 || circuito.data.vocalMesaCI === 0}
            />
          </PopoverTrigger>
          <PopoverContent className="w-80 flex flex-col items-center shadow-2xl border-2 border-blue-900">
            <p className="text-center mb-4">
              ¿Está seguro de que desea finalizar la votación?
            </p>
            <ButtonCustom
              label="Confirmar Finalización"
              onClick={() => handleToggleHabilitado(false)}
              size="small"
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <ButtonCustom
              label={
              <label>
                Asignar credencial a <br /> circuito
              </label>
              }
              size="large"
              disabled={habilitado !== true || circuito.data.presidenteMesaCI === 0 || circuito.data.secretarioMesaCI === 0 || circuito.data.vocalMesaCI === 0}
            />
          </PopoverTrigger>
          <PopoverContent className="w-80 flex flex-col items-center shadow-2xl border-2 border-blue-900">
              <form onSubmit={handleSaveCredencialCircuito}  className="w-full flex flex-col gap-2">

                <select value={serieCredencial} onChange={(e) => setSerieCredencial(e.target.value)} required className="border-4 rounded-md p-2 outline-0">
                  <option value="" disabled>Seleccione la serie de credencial</option>
                    {credenciales.map((cre) => (
                      <option key={cre.serie + cre.numero} value={cre.serie}>
                        {cre.serie}
                      </option>
                    ))}
                </select>

                <select value={numeroCredencial} onChange={(e) => setNumeroCredencial(e.target.value)} required className="border-4 rounded-md p-2 outline-0">
                  <option value="" disabled>Seleccione el numero de credencial</option>
                    {credencialesBySerie.map((cre) => (
                      <option key={cre.serie + cre.numero} value={cre.numero}>
                        {cre.numero}
                      </option>
                    ))}
                </select>

                <ButtonCustom
                  label="Asignar"
                  
                  size="small"
                />
              </form>

            
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default ManageCircuito;
