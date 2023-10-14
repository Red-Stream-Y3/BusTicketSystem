import axios from 'axios';

const API_URL = 'http://localhost:9120/api/fares';

export const createFare = async (fare) => {
    try {
        const response = await axios.post(API_URL, fare);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getAllFares = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getFareById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const updateFareById = async (id, fare) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, fare);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const deleteFareById = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getFareByFareName = async (name) => {
    try {
        const response = await axios.get(`${API_URL}/name/${name}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getFareByRoute = async (route) => {
    try {
        const response = await axios.get(`${API_URL}/route/${route}`);
        return response.data;
    } catch (error) {
        return error;
    }
};
