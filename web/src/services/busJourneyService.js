import axios from 'axios';

const API_URL = 'http://localhost:9120/api/busjourneys';

export const createBusJourney = async (busJourney) => {
    try {
        const response = await axios.post(API_URL, busJourney);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getAllBusJourneys = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getBusJourneyCount = async () => {
    try {
        const response = await axios.get(`${API_URL}/count`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getBusJourneyById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const updateBusJourneyById = async (id, busJourney) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, busJourney);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const deleteBusJourneyById = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};
