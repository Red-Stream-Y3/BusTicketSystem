import React, { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    ActivityIndicator,
    Dimensions,
    ScrollView,
    Platform,
} from "react-native";
import getThemeContext from "../context/ThemeContext";
import ThemeSearchInput from "./common/ThemeSearchInput";
import ThemeDropDownInput from "./common/ThemeDropDownInput";
import ThemeButton from "./common/ThemeButton";
import { MaterialIcons } from "@expo/vector-icons";
import { createUserTrip, searchBusRoutes } from "../services/userTripServices";
import { getAppContext } from "../context/AppContext";
import Toast from "react-native-toast-message";
import { getFareRates } from "./../services/userTripServices";

const NewTripContainer = ({ navigation }) => {
    const { theme } = getThemeContext();
    const { USER } = getAppContext();

    const [route, setRoute] = useState("");
    const [origin, setOrigin] = useState("");
    const [originList, setOriginList] = useState([]);
    const [destination, setDestination] = useState("");
    const [destinationList, setDestinationList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [selectedRoute, setSelectedRoute] = useState({});
    const [selectedOrigin, setSelectedOrigin] = useState({});
    const [selectedDestination, setSelectedDestination] = useState({});

    const [fareRate, setFareRate] = useState(0);
    const [fare, setFare] = useState(0);

    const fetchFareRate = async () => {
        try {
            const response = await getFareRates(USER.token);
            setFareRate(response.fareAmount);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.message,
            });
        }
    };

    useEffect(() => {
        fetchFareRate();
    }, []);

    const handleSubmit = async () => {
        if (route === "" || origin === "" || destination === "") {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Please fill all fields",
            });
            return;
        }

        if (origin === destination) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Start and destination cannot be the same",
            });
            return;
        }

        try {
            setSubmitting(true);

            const data = {
                user: USER.id,
                route: selectedRoute._id,
                origin: selectedOrigin._id,
                destination: selectedDestination._id,
                state: "scheduled",
                fare: fare,
            };

            const response = await createUserTrip(data, USER.token);

            if (response._id) {
                Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: "Trip added successfully",
                });
                navigation.goBack();
            }
            setSubmitting(false);
        } catch (error) {
            console.log(error);
            Toast.show({
                type: "error",
                text1:
                    error.response?.data?.message ||
                    error.message ||
                    "Something went wrong",
            });
            setSubmitting(false);
        }
    };

    const handleSearch = async (value) => {
        setRoute(value);

        if (value === "" || value === null) return;

        setLoading(true);
        try {
            const results = await searchBusRoutes(value, USER.token);
            // console.log(results);
            setSearchResults(results);

            setLoading(false);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.message,
            });
            setLoading(false);
        }
    };

    const handleRouteItemPress = (item) => {
        setSelectedRoute(item);
        setRoute(item.routeNumber);
        setOriginList(item.stops);
        setDestinationList(item.stops);
    };

    const handleOriginItemPress = (item) => {
        setSelectedOrigin(item);
        setOrigin(item.name);
    };

    const handleDestinationItemPress = (item) => {
        setSelectedDestination(item);
        setDestination(item.name);
    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.surface,
            marginHorizontal: 10,
            padding: 20,
            borderRadius: 10,
            elevation: 5,
            maxHeight: Dimensions.get("window").height * 0.8,
        },
        title: {
            fontSize: 16,
            fontWeight: "bold",
            color: theme.colors.text,
            alignSelf: "center",
        },
        text: {
            fontSize: 14,
            marginBottom: 10,
            color: theme.colors.text,
            alignSelf: "center",
        },
        scrollContainer: {
            backgroundColor: theme.colors.surface,
        },
        scrollContentContainer: {
            flexGrow: 1,
            paddingBottom: 10,
        },
    });

    //calculate fare when origin and destination changes
    useEffect(() => {
        if (origin === "" || destination === "") return;

        const originIndex = selectedRoute.stops.findIndex(
            (stop) => stop.name === origin
        );
        const destinationIndex = selectedRoute.stops.findIndex(
            (stop) => stop.name === destination
        );

        const distance = Math.abs(destinationIndex - originIndex);
        const fare = distance * parseInt(fareRate || selectedRoute.fareRate);

        setFare(fare);
    }, [origin, destination]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <ScrollView
                style={styles.scrollContainer}
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.scrollContentContainer}>
                <ThemeSearchInput
                    title='Route'
                    value={route}
                    options={searchResults}
                    loading={loading}
                    onChange={(text) => handleSearch(text)}
                    onPressitem={handleRouteItemPress}
                    setValue={setRoute}
                    placeholder='Search for route'
                />
                <ThemeDropDownInput
                    title='Start'
                    value={origin}
                    loading={loading}
                    options={originList}
                    onPressitem={handleOriginItemPress}
                    onChange={(text) => setOrigin(text)}
                    setValue={setOrigin}
                    placeholder='Select staring bus stop'
                />
                <ThemeDropDownInput
                    title='Destination'
                    value={destination}
                    loading={loading}
                    options={destinationList}
                    onPressitem={handleDestinationItemPress}
                    onChange={(text) => setDestination(text)}
                    setValue={setDestination}
                    placeholder='Select destination bus stop'
                />

                <Text style={styles.title}>Calculated Fare : Rs.{fare}</Text>
                <Text style={styles.text}>
                    {`Fare Rate : Rs.${fareRate || selectedRoute.fareRate}`}
                </Text>

                <ThemeButton
                    title={submitting ? "" : "Add New Trip"}
                    onPress={handleSubmit}>
                    {submitting ? (
                        <ActivityIndicator
                            size={24}
                            color={theme.colors.primaryIcon}
                        />
                    ) : (
                        <MaterialIcons
                            name='add'
                            size={24}
                            color={theme.colors.primaryIcon}
                        />
                    )}
                </ThemeButton>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default NewTripContainer;
