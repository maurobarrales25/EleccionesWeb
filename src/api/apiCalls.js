import axios from "axios";

const BASE_URL = "http://localhost:8080/"

export const logIn = (data) => {
    return axios.post('logIn', data)
}

export const getElecciones = () => {
    return axios.get(BASE_URL + 'eleccion/all')
}

export const getCircuitosByEleccion = (eleccionId) => {
    return axios.get(BASE_URL + 'circuito/getByEleccion', {params: eleccionId})
}

export const saveEleccion = (nombre) => {
    return axios.post(BASE_URL + 'eleccion/save', null, {params: nombre, fecha: {}, tipoEleccion: 'PRESIDENCIAL'})
}

export const getListasByEleccion = (eleccionId) => {
    return axios.get(BASE_URL + 'lista/all', {params: eleccionId})
}

export const saveCircuito = (numero, establecimientoId) => {
    return axios.post(BASE_URL + 'circuito/save', null, {params: numero, establecimientoId})
}

export const setCircuitoToEleccion = () => {
    return axios.post(BASE_URL + 'circuito/eleccion-circuito', null, {params: eleccionId, circuitoId})
}

export const addMiembrosMesaToCircuito = () => {
    return axios.post(BASE_URL + 'circuito/addMiembrosMesa', null, {params: presidenteMesaCI, secretarioMesaCI, vocalMesaCI, circuitoId})
}

export const getPartidos = () => {
    return axios.get(BASE_URL + 'partido/getAll')
}

export const savePartido = () => {
    return axios.post(BASE_URL + 'partido/save', null, {params: nombre, calleSede, numeroSede, presidenteCI})
}