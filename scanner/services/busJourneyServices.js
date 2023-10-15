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

export const updateBusJourney = async (busJourney, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(
        `${BASE}/api/busjourneys/${busJourney._id}`,
        busJourney,
        config
    );

    if (response.status !== 200) {
        throw new Error(
            response.error.response.data.message || response.error.message
        );
    }

    return response.data;
};

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

export const getRouteBySearch = async (searchterm, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(
        `${BASE}/api/busroutes/search/${searchterm}`,
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

export const endBusJourney = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(
        `${BASE}/api/busjourneys/${id}`,
        {
            state: "completed",
        },
        config
    );

    if (response.status !== 200) {
        throw new Error(
            response.data.error.message ||
                response.data.message ||
                "Error ending bus journey"
        );
    }
    return response.data;
};

export const cancelBusJourney = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(
        `${BASE}/api/busjourneys/${id}`,
        {
            state: "cancelled",
        },
        config
    );

    if (response.status !== 200) {
        throw new Error(
            response.data.error.message ||
                response.data.message ||
                "Error cancelling bus journey"
        );
    }
    return response.data;
};

export const startBusJourney = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(
        `${BASE}/api/busjourneys/${id}`,
        {
            state: "departed",
        },
        config
    );

    if (response.status !== 200) {
        throw new Error(
            response.data.error.message ||
                response.data.message ||
                "Error starting bus journey"
        );
    }
    return response.data;
};

export const getBusJourneyById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${BASE}/api/busjourneys/${id}`, config);

    if (response.status !== 200) {
        throw new Error(
            response.data.error.message ||
                response.data.message ||
                "Error getting bus journey"
        );
    }
    return response.data;
};
