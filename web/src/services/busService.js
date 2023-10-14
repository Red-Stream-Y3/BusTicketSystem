import axios from 'axios';

const API_URL = 'http://localhost:9120/api/buses';

export const createBus = async (bus) => {
    try {
        const response = await axios.post(API_URL, bus);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getAllBuses = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getBusCount = async () => {
    try {
        const response = await axios.get(`${API_URL}/count`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getBusById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const updateBusById = async (id, bus) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, bus);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const deleteBusById = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getBusByBusNumber = async (number) => {
    try {
        const response = await axios.get(`${API_URL}/number/${number}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getBusesByType = async (type) => {
    try {
        const response = await axios.get(`${API_URL}/type/${type}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getBusesByCapacity = async (capacity) => {
    try {
        const response = await axios.get(`${API_URL}/capacity/${capacity}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getBusesByRoute = async (routeId) => {
    try {
        const response = await axios.get(`${API_URL}/route/${routeId}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getBusesByRouteAndType = async (routeId, type) => {
    try {
        const response = await axios.get(`${API_URL}/route/${routeId}/type/${type}`);
        return response.data;
    } catch (error) {
        return error;
    }
};
