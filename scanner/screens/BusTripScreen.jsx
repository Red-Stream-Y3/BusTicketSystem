import React from "react";
import { View, Text, StyleSheet } from "react-native";
import getThemeContext from "../context/ThemeContext";

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
        logo: {
            width: 150,
            height: 150,
            resizeMode: "contain",
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 20,
            color: theme.colors.text,
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{trip?._id}</Text>
        </View>
    );
};

export default BusTripScreen;
