import axios from "axios";

const BASE = "https://bus-ticket-system-ukkxew3r5q-uc.a.run.app";

export const getBusJourneys = async (limit, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(
        `${BASE}/api/busjourneys/user/${limit}`,
        config
    );

    if (response.status !== 200) {
        throw new Error(
            response.error.response.data.message || response.error.message
        );
    }

    return response.data;
};

export const createBusJourney = async (busJourney, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(
        `${BASE}/api/busjourneys`,
        busJourney,
        config
    );

    if (response.status !== 201) {
        throw new Error(
            response.error.response.data.message || response.error.message
        );
    }

    return response.data;
};

export const updateBusJourney = async (busJourney, token) => {};

export const getBusBySearch = async (searchterm, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(
        `${BASE}/api/buses/search/${searchterm}`,
        config
    );

    if (response.status !== 200) {
        throw new Error(
            response.error.response.data.message || response.error.message
        );
    }

    return response.data;
};
