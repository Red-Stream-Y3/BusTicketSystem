import axios from 'axios';

const API_URL = 'http://localhost:9120/api/users';

export const createUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/create`, user);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const editUser = async (id, user) => {
    try {
        const response = await axios.put(`${API_URL}/edit/${id}`, user);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get('http://localhost:9120/api/users/all');
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};
