import { useState, useEffect, createContext, useContext } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();

const LIGHT_THEME = {
    mode: "light",
    colors: {
        primary: "rgb(0, 142, 255)",
        primaryVariant: "#3700b3",
        text: "#000000",
        shadow: "#000000",

        primaryText: "#ffffff",
        primaryIcon: "#ffffff",

        buttonText: "#ffffff",
        ripple: "rgba(0, 0, 0, 0.1)",
        icon: "#000000",

        secondary: "#03dac6",
        secondaryVariant: "#018786",
        background: "#ffffff",
        surface: "#ffffff",
        error: "#b00020",
    },
};

const DARK_THEME = {
    mode: "dark",
    colors: {
        primary: "rgb(0, 137, 123)",
        primaryVariant: "#3700b3",
        text: "#d4d4d4",
        shadow: "#000000",

        primaryText: "#ffffff",
        primaryIcon: "#ffffff",

        buttonText: "#ffffff",
        ripple: "rgba(255, 255, 255, 0.1)",
        icon: "#ffffff",

        secondary: "#03dac6",
        secondaryVariant: "#03dac6",
        background: "#121212",
        surface: "rgb(40, 40, 40)",
        error: "#cf6679",
    },
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(LIGHT_THEME);
    const systemTheme = Appearance.getColorScheme();

    const getThemeFromStorage = async () => {
        try {
            const theme = await AsyncStorage.getItem("theme");
            if (theme) {
                setTheme(
                    JSON.parse(theme) === "light" ? LIGHT_THEME : DARK_THEME
                );
                return true;
            }
        } catch (error) {
            return false;
        }
    };

    useEffect(() => {
        if (getThemeFromStorage()) return;

        if (systemTheme === "dark") {
            setTheme(DARK_THEME);
        } else {
            setTheme(LIGHT_THEME);
        }
    }, [systemTheme]);

    const toggleTheme = async (mode) => {
        if (mode) {
            setTheme(mode === "light" ? LIGHT_THEME : DARK_THEME);
            await AsyncStorage.setItem("theme", JSON.stringify(mode));
            return;
        }

        await AsyncStorage.setItem(
            "theme",
            JSON.stringify(theme.mode === "light" ? "dark" : "light")
        );
        setTheme((prevTheme) =>
            prevTheme.mode === "light" ? DARK_THEME : LIGHT_THEME
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const getThemeContext = () => useContext(ThemeContext);

export default getThemeContext;
