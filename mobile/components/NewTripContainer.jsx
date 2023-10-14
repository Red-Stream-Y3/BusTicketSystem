import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import getThemeContext from "../context/ThemeContext";
import ThemeSearchInput from "./common/ThemeSearchInput";
import ThemeTextInput from "./common/ThemeTextInput";
import ThemeDropDownInput from "./common/ThemeDropDownInput";
import ThemeButton from "./common/ThemeButton";
import { MaterialIcons } from "@expo/vector-icons";

const NewTripContainer = () => {
    const { theme } = getThemeContext();

    const [route, setRoute] = useState("");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(null);

    const handleSubmit = () => {
        // Handle form submission here
    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.background,
            marginHorizontal: 10,
            padding: 10,
            borderRadius: 10,
        },
    });

    return (
        <View style={styles.container}>
            <ThemeSearchInput
                title='Route'
                value={route}
                options={[]}
                onChange={() => {}}
                setValue={setRoute}
                placeholder='Route'
            />
            <ThemeDropDownInput
                title='Start'
                value={origin}
                options={[]}
                onChange={() => {}}
                setValue={setOrigin}
                placeholder='Select staring bus stop'
            />
            <ThemeDropDownInput
                title='Destination'
                value={destination}
                options={[]}
                onChange={() => {}}
                setValue={setDestination}
                placeholder='Select destination bus stop'
            />
            <ThemeButton title='Add New Trip' onPress={handleSubmit}>
                <MaterialIcons
                    name='add'
                    size={24}
                    color={theme.colors.primaryIcon}
                />
            </ThemeButton>
        </View>
    );
};

export default NewTripContainer;
