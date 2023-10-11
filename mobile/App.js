import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "./context/ThemeContext";
import { AppContextProvider } from "./context/AppContext";
import { Navigator } from "./screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";

export default function App() {
    const systemTheme = useColorScheme();

    return (
        <ThemeProvider>
            <AppContextProvider>
                <NavigationContainer theme={systemTheme==='dark'? DarkTheme : DefaultTheme}>
                    <SafeAreaProvider>
                        <StatusBar style="auto" />
                        <Navigator />
                    </SafeAreaProvider>
                </NavigationContainer>
            </AppContextProvider>
        </ThemeProvider>
    );
}
