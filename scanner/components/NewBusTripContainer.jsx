/** @format */

import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Switch,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    KeyboardAvoidingView,
} from "react-native";
import ThemeButton from "./common/ThemeButton";
import getThemeContext from "../context/ThemeContext";
import { getAppContext } from "../context/AppContext";
import Toast from "react-native-toast-message";
import ThemeSearchInput from "./common/ThemeSearchInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    createBusJourney,
    getBusBySearch,
    getRouteBySearch,
} from "../services/busJourneyServices";

const NewBusTripContainer = ({ navigation }) => {
    const { theme } = getThemeContext();
    const { USER } = getAppContext();
    const [route, setRoute] = useState("");
    const [bus, setBus] = useState("");
    const [busList, setBusList] = useState([]);
    const [routeList, setRouteList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOriginalRoute, setIsOriginalRoute] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [selectedRoute, setSelectedRoute] = useState(null);
    const [selectedBus, setSelectedBus] = useState(null);

    const handleBusSearch = async (text) => {
        setBus(text);

        if (text === "") return;

        setLoading(true);
        try {
            const response = await getBusBySearch(text, USER.token);

            setBusList(response);
            setLoading(false);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.response?.data?.message || error.message,
            });
            setLoading(false);
        }
    };

    const handleBusItemPress = (item) => {
        const bus = busList.find((bus) => bus.busNumber === item);
        setSelectedBus(bus);
        setBus(bus.busNumber);
    };

    const handleRouteSearch = async (text) => {
        setRoute(text);

        if (text === "") return;

        setLoading(true);
        try {
            const response = await getRouteBySearch(text, USER.token);

            setRouteList(response);
            setLoading(false);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.response?.data?.message || error.message,
            });
            setLoading(false);
        }
    };

    const handleRouteItemPress = (item) => {
        const route = routeList.find(
            (route) => `${route.routeNumber} | ${route.routeName}` === item
        );
        setSelectedRoute(route);
        setRoute(route.routeName);
    };

    const handleIsOrignalRouteChange = () => {
        setIsOriginalRoute(!isOriginalRoute);
    };

    const handleStartTripPress = async () => {
        if (selectedBus === null) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Please select a bus",
            });
            return;
        }

        if (!isOriginalRoute && selectedRoute === null) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Please select a route",
            });
            return;
        }

        setSubmitting(true);
        try {
            const data = {
                bus: selectedBus._id,
                route: isOriginalRoute
                    ? selectedBus.busRoute._id
                    : selectedRoute._id,
                state: "scheduled",
            };

            const createdTrip = await createBusJourney(data, USER.token);

            setSubmitting(false);
            navigation.goBack();
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.response?.data?.message || error.message,
            });
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (isOriginalRoute) {
            setRoute(
                selectedBus
                    ? `${selectedBus?.busRoute?.routeNumber} | ${selectedBus?.busRoute?.routeName}`
                    : ""
            );
        } else {
            setRoute(
                selectedRoute
                    ? `${selectedRoute?.routeNumber} | ${selectedRoute?.routeName}`
                    : ""
            );
        }
    }, [bus, isOriginalRoute]);

    const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: theme.colors.surface,
            marginHorizontal: 10,
            borderRadius: 10,
            padding: 10,
            elevation: 5,
            flex: 1,
            maxHeight: Dimensions.get("window").height * 0.5,
        },
        scrollContainer: {
            flex: 1,
            maxHeight: "100%",
            overflow: "visible",
        },
        scrollContentContainer: {
            flexGrow: 1,
            justifyContent: "center",
        },
        flexRow: {
            flexDirection: "row",
            alignItems: "center",
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
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <ScrollView
                keyboardShouldPersistTaps='handled'
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContentContainer}>
                <ThemeSearchInput
                    placeholder='Search for your bus'
                    title='Bus'
                    value={bus}
                    setValue={setBus}
                    options={busList.map((bus) => bus.busNumber)}
                    loading={loading}
                    onChange={(text) => handleBusSearch(text)}
                    onPressitem={(item) => handleBusItemPress(item)}
                />

                <View style={styles.flexRow}>
                    <Text style={styles.text}>
                        Use the original route?{"    "}
                    </Text>
                    <View style={styles.flexRowCenter}>
                        <Text style={styles.text}>No{"  "}</Text>
                        <Switch
                            value={isOriginalRoute}
                            onValueChange={handleIsOrignalRouteChange}
                        />
                        <Text style={styles.text}>{"  "}Yes</Text>
                    </View>
                </View>

                <ThemeSearchInput
                    title='Route'
                    placeholder={"Select route"}
                    value={route}
                    setValue={setRoute}
                    options={routeList.map(
                        (route) => `${route.routeNumber} | ${route.routeName}`
                    )}
                    disabled={isOriginalRoute}
                    loading={loading}
                    onChange={(text) => handleRouteSearch(text)}
                    onPressitem={handleRouteItemPress}
                />

                <ThemeButton
                    title={submitting ? "" : "Start Trip"}
                    textSize={16}
                    onPress={handleStartTripPress}>
                    {submitting ? (
                        <ActivityIndicator
                            size={24}
                            color={theme.colors.primaryicon}
                        />
                    ) : (
                        <MaterialCommunityIcons
                            name='bus-side'
                            size={24}
                            color={theme.colors.primaryIcon}
                        />
                    )}
                </ThemeButton>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default NewBusTripContainer;
