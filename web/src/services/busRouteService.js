import axios from 'axios';

const API_URL = 'http://localhost:9120/api/busroutes';

export const createBusRoute = async (busRoute) => {
    try {
        const response = await axios.post(API_URL, busRoute);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getAllBusRoutes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getBusRouteCount = async () => {
    try {
        const response = await axios.get(`${API_URL}/count`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getBusRouteById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const updateBusRouteById = async (id, busRoute) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, busRoute);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const deleteBusRouteById = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getBusRoutesBySearch = async (term) => {
    try {
        const response = await axios.get(`${API_URL}/search/${term}`);
        return response.data;
    } catch (error) {
        return error;
    }
};
