import axios from "axios";

const BASE_URL = "http://localhost:8080/"

export const logIn = (data) => {
    return axios.post(BASE_URL + 'logIn', data)
}

const getElecciones = () => {
    return axios.get(BASE_URL + 'eleccion/all')
}

const getCircuitosByEleccion = (eleccionId) => {
    return axios.get(BASE_URL + 'circuito/getByEleccion', {params: eleccionId})
}

const saveEleccion = (nombre) => {
    return axios.post(BASE_URL + 'eleccion/save', null, {params: nombre, fecha: {}, tipoEleccion: 'PRESIDENCIAL'})
}

const saveCircuito = (numero, establecimientoId) => {
    return axios.post(BASE_URL + 'circuito/save', null, {params: numero, establecimientoId})
}