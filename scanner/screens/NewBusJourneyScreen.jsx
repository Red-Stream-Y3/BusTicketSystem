import React from "react";
import { View, StyleSheet } from "react-native";
import getThemeContext from "../context/ThemeContext";
import { NewBusTripContainer } from "../components";

const NewBusJourneyScreen = ({ navigation }) => {
    const { theme } = getThemeContext();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: theme.colors.background,
        },
    });

    return (
        <View style={styles.container}>
            <NewBusTripContainer navigation={navigation} />
        </View>
    );
};

export default NewBusJourneyScreen;
