import axios from 'axios';

const API_URL = 'http://localhost:9120/api/staffschedules';

export const createStaffSchedule = async (staffSchedule) => {
    try {
        const response = await axios.post(API_URL, staffSchedule);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getAllStaffSchedules = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getStaffScheduleCount = async () => {
    try {
        const response = await axios.get(`${API_URL}/count`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getStaffScheduleById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const updateStaffScheduleById = async (id, staffSchedule) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, staffSchedule);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const deleteStaffScheduleById = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getStaffScheduleByStaffId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/staff/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getStaffScheduleByDate = async (date) => {
    try {
        const response = await axios.get(`${API_URL}/date/${date}`);
        return response.data;
    } catch (error) {
        return error;
    }
};
