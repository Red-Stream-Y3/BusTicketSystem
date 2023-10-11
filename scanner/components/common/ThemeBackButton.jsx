import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import getThemeContext from "../../context/ThemeContext";
import ThemeButton from "./ThemeButton";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from "react-native";

const ThemebackButton = ({ navigation }) => {
    const { theme } = getThemeContext();

    const styles = StyleSheet.create({
        buttonContainer: {
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 100,
            elevation: 50,
        }
    });

    return (
        <Animated.View style={styles.buttonContainer}
            entering={FadeInLeft.delay(700).springify()}
            exiting={FadeOutLeft.delay(100).springify()}
        >
            <ThemeButton borderRadius={50}>
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color={theme.colors.primaryIcon}
                    onPress={() => navigation.goBack()}
                />
            </ThemeButton>
        </Animated.View>
    );
};

export default ThemebackButton;