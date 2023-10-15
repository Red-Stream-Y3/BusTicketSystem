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
import ThemeSearchInput from "./common/ThemeSearchInput";

const NewBusTripContainer = ({ navigation }) => {
    const { theme, toggleTheme } = getThemeContext();
    const [route, setRoute] = useState("");
    const [bus, setBus] = useState("");
    const [busList, setBusList] = useState([]);
    const [routeList, setRouteList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOriginalRoute, setIsOriginalRoute] = useState(true);

    const [selectedRoute, setSelectedRoute] = useState({});
    const [selectedBus, setSelectedBus] = useState({});

    const handleBusSearch = async (text) => {};

    const handleBusItemPress = (item) => {};

    const handleRouteSearch = async (text) => {};

    const handleRouteItemPress = (item) => {};

    const handleIsOrignalRouteChange = (value) => {};

    const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: theme.colors.surface,
            marginHorizontal: 10,
            borderRadius: 10,
            padding: 10,
            elevation: 5,
        },
        scrollContainer: {
            maxHeight: 500,
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
            <ScrollView style={styles.scrollContainer}>
                <ThemeSearchInput
                    placeholder='Search for your bus'
                    title='Bus'
                    value={bus}
                    setValue={setBus}
                    options={busList}
                    loading={loading}
                    onChange={(text) => handleBusSearch(text)}
                    onPressitem={handleBusItemPress}
                />

                <ThemeDropDownInput
                    title='Route'
                    placeholder={"Select route"}
                    value={route}
                    setValue={setRoute}
                    options={routeList}
                    loading={loading}
                    onChange={(text) => handleRouteSearch(text)}
                    onPressitem={handleRouteItemPress}
                />

                <Text style={styles.text}>Use the original route?</Text>
                <View style={styles.flexRowCenter}>
                    <Text style={styles.text}>No</Text>
                    <Switch
                        value={isOriginalRoute}
                        onValueChange={(value) =>
                            handleIsOrignalRouteChange(value)
                        }
                    />
                    <Text style={styles.text}>Yes</Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default NewBusTripContainer;
