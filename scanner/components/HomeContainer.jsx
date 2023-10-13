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

const HomeContainer = ({ navigation }) => {
    const { theme, toggleTheme } = getThemeContext();
    const { removeUser } = getAppContext();
    const [showOverlay, setShowOverlay] = useState(false);
    const [themeSwitch, setThemeSwitch] = useState(theme.mode === "dark");
    const [value, setValue] = useState("example");

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

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.text}>Welcome to the Home Screen!</Text>

                <View style={styles.flexRowBetween}>
                    <View style={styles.flexRowCenter}>
                        <Text style={styles.text}>Light </Text>
                        <Switch
                            value={themeSwitch}
                            onValueChange={() => {
                                setThemeSwitch(!themeSwitch);
                                toggleTheme();
                            }}
                        />
                        <Text style={styles.text}>Dark </Text>
                    </View>
                    <ThemeButton
                        title={"Sign Out"}
                        onPress={() => removeUser()}
                    />
                </View>

                <ThemeButton title='example' />

                <ThemeChip text='example' />

                <ThemeButton
                    title={"Show Overlay"}
                    onPress={() => setShowOverlay(true)}
                />

                <ThemeOverlay
                    visible={showOverlay}
                    onPressBg={() => setShowOverlay(false)}>
                    <Text style={styles.text}>Overlay body</Text>
                </ThemeOverlay>

                <ThemeTextInput title={"example"} placeholder={"example"} />

                <ThemeDropDownInput
                    title={"example"}
                    value={value}
                    options={["example1", "example2", "example3"]}
                    setValue={setValue}
                    placeholder={"Select example"}
                />

                <ThemeButton
                    title='Go to Scanner'
                    onPress={() => navigation.navigate("Scanner")}
                />
            </ScrollView>
        </View>
    );
};

export default HomeContainer;
