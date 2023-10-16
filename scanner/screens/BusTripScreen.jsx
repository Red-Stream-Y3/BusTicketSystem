import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import getThemeContext from "../context/ThemeContext";
import BusTripContainer from "../components/BusTripContainer";

const BusTripScreen = ({ navigation, route }) => {
    const { theme } = getThemeContext();
    const { trip } = route.params;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.background,
        },
    });

    return (
        <View style={styles.container}>
            <BusTripContainer navigation={navigation} selectedTrip={trip} />
        </View>
    );
};

export default BusTripScreen;
