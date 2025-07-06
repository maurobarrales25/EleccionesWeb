import axios from "axios";

const BASE_URL = "http://localhost:8080/"

export const logIn = (data) => {
    return axios.post(BASE_URL + 'logIn', data)
}

export const getElecciones = () => {
    return axios.get(BASE_URL + 'eleccion/all')
}

export const getEleccionById = (eleccionId) => {
    return axios.get(`${BASE_URL}eleccion/${eleccionId}`);
}

export const updateEleccionHabilitado = (eleccionId, habilitado) => {
    return axios.post(BASE_URL + 'eleccion/updateHabilitado', null, { params: { eleccionId, habilitado } })
}

export const getAllCircuitosByEleccion = (eleccionId) => {
    return axios.get(BASE_URL + 'circuito/getAllByEleccion', { params: { eleccionId } });
}

export const getCircuitoByCredencialEleccion = (serie, numero, eleccionId) => {
    return axios.get(BASE_URL + `CredencialCircuito/${serie}/${numero}/${eleccionId}`)
}

export const setCredencialCircuito = (data) => {
    return axios.post(BASE_URL + `CredencialCircuito/save`, data)
}

export const getDepartamentoByCircuitoNumero = (numero) => {
    return axios.get(BASE_URL + `circuito/getDepartamentoByCircuitoNumero`, {params:{numero}})
}

export const saveEleccion = (nombre, tipoEleccion) => {
    return axios.post(BASE_URL + 'eleccion/save', null, { params: { nombre, tipoEleccion } })
}

export const getListasByEleccion = (eleccionId) => {
  return axios.get(`${BASE_URL}lista/all/${eleccionId}`)
}

export const getListasByEleccionAndDepartamento = (eleccionId, departamentoId) => {
    return axios.get(BASE_URL + `/listaPolitico/eleccion/${eleccionId}/departamento/${departamentoId}`)
}

export const saveCircuito = (eleccionId, numero, establecimientoId) => {
    return axios.post(BASE_URL + 'circuito/save', null, { params: { eleccionId, numero, establecimientoId } })
}

export const getCircuitoById = (eleccionId, numero) => {
    return axios.get(BASE_URL + 'circuito/getById', { params: { eleccionId, numero } });
}

export const updateCircuitoHabilitado = (eleccionId, numero, habilitado) => {
    return axios.post(BASE_URL + 'circuito/updateHabilitado', null, { params: { eleccionId, numero, habilitado } })
}

export const addMiembrosMesaToCircuito = (presidenteMesaCI, secretarioMesaCI, vocalMesaCI, eleccionId, numero) => {
    return axios.post(BASE_URL + 'circuito/addMiembrosMesa', null, { params: { presidenteMesaCI, secretarioMesaCI, vocalMesaCI, eleccionId, numero } })
}

export const getPresidenteMesaByCI = (cedulaIdentidad) => {
    return axios.get(BASE_URL + 'PresidenteMesa/getByCedulaIdentidad', { params: { cedulaIdentidad } });
}

export const getSecretarioMesaByCI = (cedulaIdentidad) => {
    return axios.get(BASE_URL + 'SecretarioMesa/getByCedulaIdentidad', { params: { cedulaIdentidad } });
}

export const getVocalMesaByCI = (cedulaIdentidad) => {
    return axios.get(BASE_URL + 'VocalMesa/getByCedulaIdentidad', { params: { cedulaIdentidad } });
}

export const savePolitico = (cedulaIdentidad, nombre, apellido, fechaNacimiento) => {
    return axios.post(BASE_URL + 'politico/save', { cedulaIdentidad, nombre, apellido, fechaNacimiento });
}

export const updateCargoPolitico = (cedulaIdentidad, cargoId) => {
  return axios.post(BASE_URL + 'politico/set-cargo', null, { params: { cedulaIdentidad, cargoId }});
}

export const updatePartidoDePolitico = (cedulaIdentidad, partidoId) => {
    return axios.post(BASE_URL + 'politico/panquequear' , null, { params: { cedulaIdentidad, partidoId } }) 
}

export const getPoliticos = () => {
    return axios.get(BASE_URL + 'politico/get-all')
}

export const getPartidos = () => {
    return axios.get(BASE_URL + 'partido/getAll')
}

export const savePartido = (nombre, calleSede, numeroSede, presidenteCI) => {
    return axios.post(BASE_URL + 'partido/save', null, { params: { nombre, calleSede, numeroSede, presidenteCI } })
}

export const getEstablecimientoById = (establecimientoId) => {
    return axios.get(BASE_URL + `establecimiento/getById/${establecimientoId}`);
}

export const getEstablecimientos = () => {
    return axios.get(BASE_URL + 'establecimiento/getAll');
}

export const saveLista = (eleccionId, departamentoId, numero) => {
    return axios.post(BASE_URL + 'lista/save', null, { params: { eleccionId, departamentoId, numero } });
}

export const getDepartamentos = () => {
    return axios.get(BASE_URL + 'departamento/all');
}

export const getListasPoliticos = (eleccionId) => {
    return axios.get(`${BASE_URL}listaPolitico/eleccion/${eleccionId}`);
};

export const saveListaPolitico = (eleccionId, numero, cedulaIdentidad, departamentoId) => {
    return axios.post(BASE_URL + "listaPolitico/save", null, {params: {eleccionId, numero, cedulaIdentidad,departamentoId} });
};

export const getListaPoliticoByEleccion = (eleccionId) => {
    return axios.get(`${BASE_URL}listaPolitico/eleccion/${eleccionId}`);
};

export const getCargos = () => {
    return axios.get(`${BASE_URL}cargo/getAll`);
}

export const saveVoto = (eleccionId, numeroCircuito, numeroLista, valor, cedulaPolitico, departamentoId) => {
    return axios.post(BASE_URL + 'voto', null, {params: {eleccionId, numeroCircuito, numeroLista, valor, cedulaPolitico, departamentoId}})
}

export const updateParticipacion = (serie, numero, eleccionId, circuitoNumero) => {
    return axios.put(BASE_URL + `CredencialCircuito/participacion/${serie}/${numero}/${eleccionId}/${circuitoNumero}`)
}

export const getParticipacionCredencialCircuito = (serie, numero, eleccionId) => {
    return axios.get(BASE_URL + `CredencialCircuito/participacion/${serie}/${numero}/${eleccionId}`)
}

export const saveCredencial = (serie, numero, validez) => {
    return axios.post(BASE_URL + "credencial/save", null, {params: { serie, numero, validez } } )
}

export const setCredencial = (serie, numero, cedulaIdentidad) => {
    return axios.post (BASE_URL + "ciudadano/addCredencial",  null, {params: {serie, numero, cedulaIdentidad} })
}

export const getCiudadanos = () => {
    return axios.get(BASE_URL + 'ciudadano/all');
}