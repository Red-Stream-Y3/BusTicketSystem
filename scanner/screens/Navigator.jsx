import React from "react";
import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import HomeScreen from "./HomeScreen";
import ScannerScreen from "./ScannerScreen";
import getThemeContext from "../context/ThemeContext";
import LoginScreen from "./LoginScreen";
import { getAppContext } from "../context/AppContext";
import SplashScreen from "./SplashScreen";

const Stack = createStackNavigator();

const Navigator = () => {
    const { theme } = getThemeContext();
    const { USER, loadingUser } = getAppContext();

    if (loadingUser) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer
            theme={theme.mode === "dark" ? DarkTheme : DefaultTheme}>
            <SafeAreaProvider>
                <StatusBar style='auto' />
                <Stack.Navigator>
                    {!USER?.token ? (
                        <Stack.Screen name='Login' component={LoginScreen} />
                    ) : (
                        <>
                            <Stack.Screen name='Home' component={HomeScreen} />
                            <Stack.Screen
                                name='Scanner'
                                component={ScannerScreen}
                            />
                        </>
                    )}
                </Stack.Navigator>
                <Toast />
            </SafeAreaProvider>
        </NavigationContainer>
    );
};

export default Navigator;
