import axios from "axios";

const URL_BASE = "http://localhost:3001";

export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_DOG_BY_NAME = "GET_DOG_BY_NAME";
export const GET_DOG_BY_ID = "GET_DOG_BY_ID";
export const CLEAN_FILTER_STATE = "CLEAN_FILTER_STATE";
export const FILTER_DOGS = "FILTER_DOGS";
export const ORDER_DOGS = "ORDER_DOGS";


export const getDogs = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL_BASE}/dogs`);
            const dogs = response.data;
            dispatch({type: GET_DOGS, payload: dogs});
        } catch (error) {
            return alert('No hay conexión con el servidor, intenta más tarde')
        }
        
    };
};

export const getDogByID = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL_BASE}/dogs/${id}`);
            const dog = response.data;
            dispatch({type: GET_DOG_BY_ID, payload: dog});
        } catch (error) {
            alert(`Ocurrió un error. Status 404: Bad Request\nMensaje: ${error.response.data.error}`);
        }
        
    };
};

export const getDogByName = (name) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL_BASE}/dogs?name=${name}`);
            const dogs = response.data;
            if (dogs.length > 0) dispatch({type: GET_DOG_BY_NAME, payload: dogs})
            else (alert("No se encontró ninguna raza con el parámetro indicado"))     
        } catch (error) {
            alert(`Ocurrió un error. Status 404: Bad Request\nMensaje: ${error.response.data.error}`);
        }    
    };
}

export const filterDogs = (origin, temp) => {
    return async function (dispatch) {
        dispatch({type: FILTER_DOGS, payload: [origin,temp]});
    };
}


export const orderDogs = (type, order) => {
    return function (dispatch) {
        dispatch({type: ORDER_DOGS, payload: [type, order]})
    };
}

export const getTemperaments = () => {
    return async function (dispatch) {
        const response = await axios.get(`${URL_BASE}/temperaments`);
        const temperaments = response.data;
        dispatch({type: GET_TEMPERAMENTS, payload: temperaments})
    };
}

export const cleanFilterState = () => {
    return ({type: CLEAN_FILTER_STATE})
};