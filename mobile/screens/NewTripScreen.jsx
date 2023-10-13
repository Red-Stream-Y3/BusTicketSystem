import { StyleSheet, Text, View } from "react-native";
import getThemeContext from "../context/ThemeContext";

const NewTripScreen = ({ navigation }) => {
    const { theme } = getThemeContext();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.background,
            marginHorizontal: 10,
            padding: 10,
        },
        text: {
            color: theme.colors.text,
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>New Trip Screen</Text>
        </View>
    );
};

export default NewTripScreen;
