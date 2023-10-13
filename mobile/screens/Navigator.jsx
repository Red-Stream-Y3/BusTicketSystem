import React from "react";
import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import HomeScreen from "./HomeScreen";
import ScannerScreen from "./ScannerScreen";
import getThemeContext from "../context/ThemeContext";
import LoginScreen from "./LoginScreen";
import { getAppContext } from "../context/AppContext";
import SplashScreen from "./SplashScreen";
import RechargeScreen from "./RechargeScreen";
import QRScreen from "./QRScreen";
import NewTripScreen from "./NewTripScreen";

const Stack = createNativeStackNavigator();

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
                        <Stack.Screen
                            name='Login'
                            component={LoginScreen}
                            options={{ title: "Sign in" }}
                        />
                    ) : (
                        <>
                            <Stack.Screen name='Home' component={HomeScreen} />
                            <Stack.Screen
                                name='Scanner'
                                component={ScannerScreen}
                            />
                            <Stack.Screen
                                name='Recharge'
                                component={RechargeScreen}
                                options={{ animation: "slide_from_right" }}
                            />
                            <Stack.Screen
                                name='QRscreen'
                                component={QRScreen}
                                options={{
                                    title: "QR Code",
                                    animation: "slide_from_bottom",
                                }}
                            />
                            <Stack.Screen
                                name='Book'
                                component={NewTripScreen}
                                options={{
                                    title: "New Trip",
                                    animation: "slide_from_left",
                                }}
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
