import { StyleSheet, Text, View } from "react-native";
import getThemeContext from "../context/ThemeContext";
import { HistoryContainer } from "../components";

const HistoryScreen = ({ navigation }) => {
    const { theme } = getThemeContext();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
    });

    return (
        <View style={styles.container}>
            <HistoryContainer navigation={navigation} />
        </View>
    );
};

export default HistoryScreen;
