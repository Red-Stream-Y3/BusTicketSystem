import axios from "axios";
const BASE = "https://bus-ticket-system-ukkxew3r5q-uc.a.run.app";

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
