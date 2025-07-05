import axios from "axios";

const BASE_URL = "http://localhost:8080/"

export const logIn = (data) => {
    return axios.post(BASE_URL + 'logIn', data)
}

export const getElecciones = () => {
    return axios.get(BASE_URL + 'eleccion/all')
}

export const getAllCircuitosByEleccion = (eleccionId) => {
  return axios.get(BASE_URL + 'circuito/getAllByEleccion', { params: { eleccionId } });
}

export const getCircuitoByCredencialEleccion = (serie, numero, eleccionId) => {
    return axios.get(BASE_URL + `CredencialCircuito/${serie}/${numero}/${eleccionId}`)
}

export const saveEleccion = (nombre, tipoEleccion) => {
    return axios.post(BASE_URL + 'eleccion/save', null, {params: {nombre, tipoEleccion}})
}

export const getListasByEleccion = (eleccionId) => {
    return axios.get(BASE_URL + `listaPolitico/eleccion/${eleccionId}`)
}

export const saveCircuito = (eleccionId, numero, establecimientoId) => {
    return axios.post(BASE_URL + 'circuito/save', null, {params: {eleccionId, numero, establecimientoId } })
}

export const getCircuitoById = (eleccionId, numero) => {
    return axios.get(BASE_URL + 'circuito/getById', {params: {eleccionId, numero} });
}

export const updateCircuitoHabilitado = (eleccionId, numero, habilitado) => {
    return axios.post(BASE_URL + 'circuito/updateHabilitado', null, {params: { eleccionId, numero, habilitado } })
}

export const addMiembrosMesaToCircuito = (presidenteMesaCI, secretarioMesaCI, vocalMesaCI, eleccionId, numero) => {
    return axios.post(BASE_URL + 'circuito/addMiembrosMesa', null, {params: { presidenteMesaCI, secretarioMesaCI, vocalMesaCI, eleccionId, numero } })
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
    return axios.get(BASE_URL + `establecimiento/getById/${establecimientoId}`);
}

export const getEstablecimientos = () => {
    return axios.get(BASE_URL + 'establecimiento/getAll');
}