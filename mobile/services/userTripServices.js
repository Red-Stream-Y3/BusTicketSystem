import axios from "axios";
const BASE = "https://bus-ticket-system-ukkxew3r5q-uc.a.run.app";

export const getUserTrips = async (limit, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(`${BASE}/api/usertrips/get/${limit}`, config);

    return data;
};