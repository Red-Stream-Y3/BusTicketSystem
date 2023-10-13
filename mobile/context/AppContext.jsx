import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const SERVER_URL = "https://bus-ticket-system-ukkxew3r5q-uc.a.run.app";
    const [USER, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [credits, setCredits] = useState(0);
    const APP_NAME = "Bus Ticket System";

    const fetchCredits = async () => {
        try {
            let header = {
                headers: { Authorization: `Bearer ${USER.token}` },
            };
            // console.log(`Bearer ${USER.token}`);

            const response = await axios.get(
                `${SERVER_URL}/api/users/credits/${USER.username}`,
                header
            );

            if (response.status === 200) {
                setCredits(response.data[0].credits);
            } else {
                throw new Error(
                    response.error ||
                        response.error?.message ||
                        response.data?.message ||
                        "Error fetching credits"
                );
            }
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.response?.data?.error || error.message,
            });
        }
    };

    const updateCredits = async (amount) => {
        try {
            let header = {
                headers: { Authorization: `Bearer ${USER.token}` },
            };
            // console.log(`Bearer ${USER.token}`);

            const response = await axios.put(
                `${SERVER_URL}/api/users/credits/${USER.username}`,
                { credits: parseInt(credits) + parseInt(amount) },
                header
            );

            if (response.status === 200) {
                setCredits(response.data.credits);
            } else {
                throw new Error(
                    response.error ||
                        response.error?.message ||
                        response.data?.message ||
                        "Error fetching credits"
                );
            }
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.response?.data?.error || error.message,
            });
        }
    };

    useEffect(() => {
        fetchCredits();
    }, []);

    const getUser = async () => {
        setLoadingUser(true);
        try {
            const savedUser = await AsyncStorage.getItem("user");
            if (savedUser) {
                setUser(JSON.parse(savedUser));
                // console.log("UserToken: ", JSON.parse(savedUser).token);
            } else {
                setUser({});
            }
            setLoadingUser(false);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Could not get user data",
            });
            setLoadingUser(false);
        }
    };

    const storeUser = async (userData) => {
        try {
            setUser(userData);
            await AsyncStorage.setItem("user", JSON.stringify(userData));
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Could not store user data",
            });
        }
    };

    const removeUser = async () => {
        try {
            await AsyncStorage.removeItem("user");
            setUser(null);
            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Signed out!",
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Could not remove user data",
            });
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <AppContext.Provider
            value={{
                SERVER_URL,
                USER,
                loadingUser,
                APP_NAME,
                getUser,
                storeUser,
                removeUser,
                credits,
                setCredits,
                fetchCredits,
                updateCredits,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export const getAppContext = () => useContext(AppContext);
