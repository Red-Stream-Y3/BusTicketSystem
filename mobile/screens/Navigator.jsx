import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Switch } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { getAppContext } from "../context/AppContext";
import getThemeContext from "../context/ThemeContext";
import HistoryScreen from "./HistoryScreen";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import NewTripScreen from "./NewTripScreen";
import QRScreen from "./QRScreen";
import RechargeScreen from "./RechargeScreen";
import ScannerScreen from "./ScannerScreen";
import SplashScreen from "./SplashScreen";
import { ThemeOverlay, ThemeButton } from "../components";

const Stack = createNativeStackNavigator();

const Navigator = () => {
    const { theme, toggleTheme } = getThemeContext();
    const { USER, loadingUser, removeUser } = getAppContext();
    const [showOverlay, setShowOverlay] = useState(false);

    if (loadingUser) {
        return <SplashScreen />;
    }

    const styles = StyleSheet.create({
        mainCon: {
            justifyContent: "center",
            alignItems: "center",
            width: 300,
            height: 350,
            borderRadius: 8,
            backgroundColor: theme.colors.surface,
        },
        settingsButton: {
            flexDirection: "row",
            alignItems: "center",
            marginRight: 22,
        },
        labelText: {
            fontSize: 14,
            marginRight: 8,
            fontWeight: "bold",
            color: theme.colors.primaryText,
        },
        logoutIcon: {
            fontSize: 30,
        },
        btnContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 6,
            borderRadius: 8,
            marginVertical: 10,
            elevation: 3,
            backgroundColor: theme.colors.primary,
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            marginVertical: 20,
            color: theme.colors.text,
        },
    });

    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) {
            return "Good Morning";
        } else if (currentHour >= 12 && currentHour < 17) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    };
    const onClickBg = () => {
        setShowOverlay(false);
    };

    const getHeaderRight = () => {
        return (
            <>
                <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={() => setShowOverlay(true)}>
                    <MaterialIcons
                        name='settings'
                        size={28}
                        color={theme.colors.text}
                    />
                    <ThemeOverlay visible={showOverlay} onPressBg={onClickBg}>
                        <View style={styles.mainCon}>
                            <Text style={styles.title}>Settings</Text>
                            <ThemeButton
                                title={
                                    "Switch To " +
                                    (theme.mode === "dark"
                                        ? "Light Mode"
                                        : "Dark Mode")
                                }
                                onPress={() => {
                                    setShowOverlay(false);
                                    toggleTheme();
                                }}
                            />
                            <ThemeButton
                                title='Sign Out'
                                onPress={() => {
                                    removeUser();
                                }}
                                variant={"outlined"}
                                textSize={16}>
                                <MaterialIcons
                                    name='logout'
                                    color={theme.colors.icon}
                                    style={styles.logoutIcon}
                                />
                            </ThemeButton>
                        </View>
                    </ThemeOverlay>
                </TouchableOpacity>
            </>
        );
    };

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
                            <Stack.Screen
                                name='Home'
                                component={HomeScreen}
                                options={{
                                    title: "",
                                    headerLeft: () => (
                                        <Text
                                            style={{
                                                marginLeft: 14,
                                                marginBottom: 1,
                                                fontSize: 18,
                                                fontWeight: "bold",
                                                color: theme.colors.text,
                                            }}>
                                            {`${getGreeting()}, ${
                                                USER.firstName
                                            }`}
                                        </Text>
                                    ),
                                    headerRight: () => getHeaderRight(),
                                }}
                            />
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
                            <Stack.Screen
                                name='History'
                                component={HistoryScreen}
                                options={{
                                    title: "History",
                                    animation: "slide_from_bottom",
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
