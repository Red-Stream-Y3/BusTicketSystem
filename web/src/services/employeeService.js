import axios from 'axios';

const API_URL = 'http://localhost:9120/api/employees';

export const createEmployee = async (employee) => {
    try {
        const response = await axios.post(API_URL, employee);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getAllEmployees = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getEmployeeById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const updateEmployee = async (id, employee) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, employee);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const deleteEmployee = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getEmployeesByRole = async (role) => {
    try {
        const response = await axios.get(`${API_URL}/role/${role}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getEmployeesByRoleAndDepot = async (role, depot) => {
    try {
        const response = await axios.get(`${API_URL}/role/${role}/depot/${depot}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getEmployeesByDepot = async (depot) => {
    try {
        const response = await axios.get(`${API_URL}/depot/${depot}`);
        return response.data;
    } catch (error) {
        return error;
    }
};
