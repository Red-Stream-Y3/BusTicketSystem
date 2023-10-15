import axios from 'axios';

const API_URL = 'http://localhost:9120/api/busstops';

export const createBusStop = async (busStop) => {
    try {
        const response = await axios.post(API_URL, busStop);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getAllBusStops = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getBusStopCount = async () => {
    try {
        const response = await axios.get(`${API_URL}/count`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getBusStopById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const updateBusStopById = async (id, busStop) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, busStop);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const deleteBusStopById = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};
