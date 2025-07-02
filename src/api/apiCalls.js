import axios from "axios";

const BASE_URL = "http://localhost:8080/"

export const logIn = (data) => {
    return axios.post(BASE_URL + 'logIn', data)
}

export const getElecciones = () => {
    return axios.get(BASE_URL + 'eleccion/all')
}

export const getCircuitosByEleccion = (eleccionId) => {
  return axios.get(BASE_URL + 'circuito/getByEleccion', { params: { eleccionId } });
}

export const getCircuitoByCredencial = (serie, numero) => {
    return axios.get(BASE_URL + 'credencial/circuito', { params: { serie, numero } })
}

export const saveEleccion = (nombre, tipoEleccion) => {
    return axios.post(BASE_URL + 'eleccion/save', null, {params: {nombre, tipoEleccion}})
}

export const getListasByEleccion = (eleccionId) => {
    return axios.get(BASE_URL + 'lista/all', {params: { eleccionId } })
}

export const saveCircuito = (numero, establecimientoId) => {
    return axios.post(BASE_URL + 'circuito/save', null, {params: { numero, establecimientoId } })
}

export const setCircuitoToEleccion = (eleccionId, circuitoId) => {
    return axios.post(BASE_URL + 'circuito/eleccion-circuito', null, {params: { eleccionId, circuitoId } })
}

export const getCircuitoById = (circuitoId) => {
    return axios.get(`${BASE_URL}circuito/getById/${circuitoId}`);
}

export const addMiembrosMesaToCircuito = (presidenteMesaCI, secretarioMesaCI, vocalMesaCI, circuitoId) => {
    return axios.post(BASE_URL + 'circuito/addMiembrosMesa', null, {params: { presidenteMesaCI, secretarioMesaCI, vocalMesaCI, circuitoId } })
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

export const getPartidos = () => {
    return axios.get(BASE_URL + 'partido/getAll')
}

export const savePartido = () => {
    return axios.post(BASE_URL + 'partido/save', null, {params: { nombre, calleSede, numeroSede, presidenteCI } })
}

export const getEstablecimientoById = (establecimientoId) => {
    return axios.get(`${BASE_URL}establecimiento/getById/${establecimientoId}`);
}

export const getEstablecimientos = () => {
    return axios.get(BASE_URL + 'establecimiento/getAll');
}