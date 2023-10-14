import axios from 'axios';

const API_URL = 'http://localhost:9120/api/depots';

export const createDepot = async (depot) => {
    try {
        const response = await axios.post(API_URL, depot);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getAllDepots = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getDepotById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const updateDepotById = async (id, depot) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, depot);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const deleteDepotById = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getDepotByDepotName = async (name) => {
    try {
        const response = await axios.get(`${API_URL}/name/${name}`);
        return response.data;
    } catch (error) {
        return error;
    }
};
