import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const SERVER_URL = "https://busticketsystem-ukkxew3r5q-uc.a.run.app";
    const [USER, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const getUser = async () => {
        setLoadingUser(true);
        try {
            const savedUser = await AsyncStorage.getItem("user");
            if (savedUser) {
                setUser(JSON.parse(savedUser));
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
                getUser,
                storeUser,
                removeUser,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export const getAppContext = () => useContext(AppContext);
