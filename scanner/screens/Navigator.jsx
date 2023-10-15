/** @format */

import React, { useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { styles } from "../Styles/NavigatorStyles";
import { Text, View, TouchableOpacity, Switch } from "react-native";
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
import NewBusJourneyScreen from "./NewBusJourneyScreen";
import ThemeOverlay from "../components/common/ThemeOverlay";

const Stack = createStackNavigator();

const Navigator = () => {
  const { theme, toggleTheme } = getThemeContext();
  const { USER, loadingUser, removeUser } = getAppContext();
  const [showOverlay, setShowOverlay] = useState(false);
  const [themeSwitch, setThemeSwitch] = useState(theme.mode === "dark");

  if (loadingUser) {
    return <SplashScreen />;
  }

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

  return (
    <NavigationContainer
      theme={theme.mode === "dark" ? DarkTheme : DefaultTheme}
    >
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Stack.Navigator>
          {!USER?.token ? (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Sign in" }}
            />
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  title: "",

                  headerLeft: () => (
                    <Text
                      style={{
                        marginLeft: 16,
                        marginBottom: 1,
                        fontSize: 20,
                        fontWeight: "bold",
                        color: theme.colors.text,
                      }}
                    >
                      {`${getGreeting()}, ${USER.firstName}`}
                    </Text>
                  ),
                  headerRight: () => (
                    <TouchableOpacity
                      style={styles.settingsButton}
                      onPress={() => setShowOverlay(true)}
                    >
                      <MaterialIcons
                        name="settings"
                        size={28}
                        color={theme.colors.text}
                      />
                      <ThemeOverlay
                        visible={showOverlay}
                        onPressBg={() => setShowOverlay(false)}
                      >
                        <View
                          style={[
                            styles.mainCon,
                            { backgroundColor: theme.colors.surface },
                          ]}
                        >
                          <Text
                            style={[styles.title, { color: theme.colors.text }]}
                          >
                            Settings
                          </Text>
                          <View
                            style={[
                              styles.btnContainer,
                              { backgroundColor: theme.colors.primary },
                            ]}
                          >
                            <Text
                              style={[
                                styles.labelText,
                                { color: theme.colors.text },
                              ]}
                            >
                              Light{" "}
                            </Text>
                            <Switch
                              value={themeSwitch}
                              onValueChange={() => {
                                setThemeSwitch(!themeSwitch);
                                toggleTheme();
                              }}
                            />
                            <Text
                              style={[
                                styles.labelText,
                                { color: theme.colors.text },
                              ]}
                            >
                              Dark{" "}
                            </Text>
                          </View>

                          <TouchableOpacity
                            onPress={() => {
                              removeUser();
                            }}
                          >
                            <View
                              style={[
                                styles.btnContainer,
                                { backgroundColor: theme.colors.primary },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.labelText,
                                  { color: theme.colors.text },
                                ]}
                              >
                                Log Out
                              </Text>
                              <FontAwesome
                                name="sign-out"
                                color={theme.colors.text}
                                style={styles.logoutIcon}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      </ThemeOverlay>
                    </TouchableOpacity>
                  ),
                }}
              />
              <Stack.Screen name="Scanner" component={ScannerScreen} />
              <Stack.Screen
                name="NewTrip"
                component={NewBusJourneyScreen}
                options={{ title: "New Trip" }}
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
