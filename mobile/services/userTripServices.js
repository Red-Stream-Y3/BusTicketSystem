import axios from "axios";
const BASE = "https://bus-ticket-system-ukkxew3r5q-uc.a.run.app";

export const getUserTrips = async (limit, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${BASE}/api/usertrips/get/${limit}`, config);

    if (response.status !== 200) {
        throw new Error("Error fetching user trips");
    }
    return response.data;
};