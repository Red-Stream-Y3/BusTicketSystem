import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, ScrollView } from "react-native";
import ThemeButton from "./common/ThemeButton";
import ThemeChip from "./common/ThemeChip";
import ThemeOverlay from "./common/ThemeOverlay";
import getThemeContext from "../context/ThemeContext";
import ThemeTextInput from "./common/ThemeTextInput";
import ThemeDropDownInput from "./common/ThemeDropDownInput";
import { getAppContext } from "../context/AppContext";
import Toast from "react-native-toast-message";

const NewBusTripContainer = ({ navigation }) => {
    const { theme, toggleTheme } = getThemeContext();

    const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: theme.colors.surface,
            marginHorizontal: 10,
            padding: 10,
            elevation: 5,
        },
        flexRowCenter: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        flexRowBetween: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        text: {
            color: theme.colors.text,
        },
    });

    return <View style={styles.container}></View>;
};

export default NewBusTripContainer;
