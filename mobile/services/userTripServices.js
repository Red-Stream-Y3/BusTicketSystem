import axios from "axios";
const BASE = "http://192.168.1.175:9120"; //"https://bus-ticket-system-ukkxew3r5q-uc.a.run.app";
const FARE_ID = "652aa3db13470991d964f167";

export const getUserTrips = async (limit, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(
        `${BASE}/api/usertrips/get/${limit}`,
        config
    );

    if (response.status !== 200) {
        throw new Error(
            response.data.error.message ||
                response.data.message ||
                "Error cancelling user trip"
        );
    }
    return response.data;
};

export const cancelUserTrip = async (tripId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const data = {
        state: "cancelled",
    };

    const response = await axios.put(
        `${BASE}/api/usertrips/${tripId}`,
        data,
        config
    );

    if (response.status !== 200) {
        throw new Error(
            response.data.error.message ||
                response.data.message ||
                "Error cancelling user trip"
        );
    }
    return response.data;
};

export const searchBusRoutes = async (searchTerm, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(
        `${BASE}/api/busroutes/search/${searchTerm}`,
        config
    );

    if (response.status !== 200) {
        throw new Error(
            response.data.error.message ||
                response.data.message ||
                "Error searching bus routes"
        );
    }
    return response.data;
};

export const createUserTrip = async (tripData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(
        `${BASE}/api/usertrips`,
        tripData,
        config
    );

    if (response.status !== 201) {
        throw new Error(response.data.message || "Error creating user trip");
    }
    return response.data;
};

export const getFareRates = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${BASE}/api/fares/${FARE_ID}`, config);

    if (response.status !== 200) {
        throw new Error(response.data.message || "Error getting fare rates");
    }
    return response.data;
};
