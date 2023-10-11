import { createContext, useContext, useEffect, useState } from "react";
import getThemeContext from "./ThemeContext";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const SERVER_URL = "https://pet-shop-backend-ukkxew3r5q-uc.a.run.app";
    //TODO: remove temp user
    const USER = {
        _id: "6522eb801e769f489af3d727",
    };

    return (
        <AppContext.Provider
            value={{ SERVER_URL, USER }}>
            {children}
        </AppContext.Provider>
    );
};

export const getAppContext = () => useContext(AppContext);
