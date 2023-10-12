import 'react-native-gesture-handler';
import { ThemeProvider } from "./context/ThemeContext";
import { AppContextProvider } from "./context/AppContext";
import { Navigator } from "./screens";

export default function App() {
    return (
        <ThemeProvider>
            <AppContextProvider>
                <Navigator />
            </AppContextProvider>
        </ThemeProvider>
    );
}
