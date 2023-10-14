import { Dimensions, StyleSheet, Text, View } from "react-native";
import getThemeContext from "../context/ThemeContext";
import { NewTripContainer } from "../components";

const NewTripScreen = ({ navigation }) => {
    const { theme } = getThemeContext();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            padding: 10,
            justifyContent: "center",
        },
        text: {
            color: theme.colors.text,
        },
    });

    return (
        <View style={styles.container}>
            <NewTripContainer />
        </View>
    );
};

export default NewTripScreen;
