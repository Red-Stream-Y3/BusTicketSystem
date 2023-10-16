import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import ThemeButton from "./ThemeButton";
import Animated, { FadeInDown } from "react-native-reanimated";
import { getAppContext } from "../../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import {
    cancelBusJourney,
    startBusJourney,
} from "../../services/busJourneyServices";
import Toast from "react-native-toast-message";
import ThemeOverlay from "./ThemeOverlay";

const TripSummary = ({ trip, width }) => {
    const { theme } = getThemeContext();
    const { USER } = getAppContext();
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleDeleteClick = async () => {
        if (deleteConfirm) {
            setLoading(true);
            try {
                // cancel trip
                const result = await cancelBusJourney(trip._id, USER.token);
                setDeleteConfirm(false);

                setLoading(false);
                navigation.goBack();
                // show success message
                Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: "Trip cancelled successfully",
                });
            } catch (error) {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: error.response?.data?.message || error.message,
                });
                setLoading(false);
            }
        } else {
            setDeleteConfirm(true);
        }
    };

    const handleStartClick = async () => {
        try {
            setLoading(true);
            // start trip
            const result = await startBusJourney(trip._id, USER.token);

            setLoading(false);
            navigation.reset({
                index: 0,
                routes: [
                    { name: "Home" },
                    { name: "BusTrip", params: { trip: result } },
                ],
            });
            // show success message
            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Trip Started!",
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.response?.data?.message || error.message,
            });
            setLoading(false);
        }
    };

    const styles = StyleSheet.create({
        card: {
            borderWidth: theme.mode === "dark" ? 1 : 0,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderColor: "#666",
            backgroundColor: theme.colors.surface,
            borderRadius: 5,
            elevation: 5,
            width: width || "80%",
        },
        scrollContainer: {},
        scrollContentContainer: {
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 20,
        },
        cardHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
        },
        cardHeaderText: {
            fontSize: 16,
            fontWeight: "bold",
            color: theme.colors.text,
        },
        cardBody: {
            alignItems: "flex-start",
            width: width * 0.9 || "90%",
        },
        cardBodyText: {
            fontSize: 14,
            color: theme.colors.text,
        },
        flexRowCenter: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        flexRowBetween: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        ripple: {
            color: theme.colors.ripple,
        },
        textBold: {
            fontSize: 14,
            fontWeight: "bold",
            color: theme.colors.primaryText,
            textTransform: "uppercase",
        },
        textWarning: {
            fontSize: 14,
            fontWeight: "bold",
            color: theme.colors.text,
        },
        title: {
            fontSize: 16,
            color: theme.colors.text,
        },
        hr: {
            borderBottomWidth: 1,
            borderBottomColor: "#666",
            width: width * 0.9 || "90%",
            marginBottom: 5,
        },
        stateContainer: {
            alignSelf: "center",
            padding: 5,
            borderRadius: 5,
            backgroundColor: theme.colors.primary,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
        },
        legendContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "center",
            marginTop: 10,
        },
        buttonContainer: {
            marginTop: 10,
            alignItems: "center",
        },
    });

    return (
        <View style={styles.card}>
            <ThemeOverlay visible={loading}>
                <View style={styles.flexRowCenter}>
                    <ActivityIndicator size={30} color={theme.colors.primary} />
                </View>
            </ThemeOverlay>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContentContainer}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderText}>Trip Summary</Text>
                </View>

                <View style={styles.hr} />

                <View style={styles.cardBody}>
                    {/* route */}
                    <View style={styles.flexRowBetween}>
                        <View style={styles.flexRowCenter}>
                            <MaterialIcons
                                name='location-on'
                                size={20}
                                color={theme.colors.primary}
                            />
                            <Text style={styles.cardHeaderText}>Route:</Text>
                        </View>
                        <Text style={styles.title}>
                            {trip?.route?.routeNumber} |{" "}
                            {trip?.route?.routeName}
                        </Text>
                    </View>

                    {/* departure time */}
                    <View style={styles.flexRowBetween}>
                        <View style={styles.flexRowCenter}>
                            <MaterialIcons
                                name='alarm'
                                size={20}
                                color={theme.colors.primary}
                            />
                            <Text style={styles.cardHeaderText}>
                                Departure Time:
                            </Text>
                        </View>
                        <Text style={styles.title}>
                            {trip?.departureTime
                                ? new Date(
                                      trip?.departureTime
                                  ).toLocaleTimeString()
                                : "Unavailable"}
                        </Text>
                    </View>

                    {/* arrival time */}
                    <View style={styles.flexRowBetween}>
                        <View style={styles.flexRowCenter}>
                            <MaterialIcons
                                name='alarm'
                                size={20}
                                color={theme.colors.primary}
                            />
                            <Text style={styles.cardHeaderText}>
                                Arrival Time:
                            </Text>
                        </View>
                        <Text style={styles.title}>
                            {trip?.arrivalTime
                                ? new Date(
                                      trip?.arrivalTime
                                  ).toLocaleTimeString()
                                : "Unavailable"}
                        </Text>
                    </View>

                    {/* bus info */}
                    <View style={styles.flexRowBetween}>
                        <View style={styles.flexRowCenter}>
                            <MaterialIcons
                                name='directions-bus'
                                size={20}
                                color={theme.colors.primary}
                            />
                            <Text style={styles.cardHeaderText}>Bus:</Text>
                        </View>
                        <Text style={styles.title}>
                            {trip?.bus?.busNumber || "Unavailable"}
                        </Text>
                    </View>

                    {/* driver name */}
                    <View style={styles.flexRowBetween}>
                        <View style={styles.flexRowCenter}>
                            <MaterialIcons
                                name='person'
                                size={20}
                                color={theme.colors.primary}
                            />
                            <Text style={styles.cardHeaderText}>Driver:</Text>
                        </View>
                        <Text style={styles.title}>
                            {USER?.firstName + " " + USER?.lastName ||
                                "Unavailable"}
                        </Text>
                    </View>

                    {/* created date */}
                    <View style={styles.flexRowCenter}>
                        <MaterialIcons
                            name='date-range'
                            size={20}
                            color={theme.colors.primary}
                        />
                        <Text style={styles.cardBodyText}>
                            {new Date(trip?.createdAt).toLocaleDateString()}
                        </Text>
                    </View>

                    {/* state */}
                    <View style={styles.stateContainer}>
                        <Text style={styles.textBold}>
                            Status : {trip?.state}
                        </Text>
                    </View>

                    {/* buttons */}
                    {trip?.state === "scheduled" && (
                        <View style={styles.buttonContainer}>
                            {deleteConfirm && (
                                <Animated.Text
                                    entering={FadeInDown}
                                    style={styles.textWarning}>
                                    Are you sure you want to cancel this trip?
                                </Animated.Text>
                            )}

                            <View style={styles.flexRowBetween}>
                                <ThemeButton
                                    title={
                                        deleteConfirm
                                            ? "Yes, Cancel Trip"
                                            : "Cancel Trip"
                                    }
                                    color={theme.colors.error}
                                    onPress={handleDeleteClick}>
                                    <MaterialIcons
                                        name='cancel'
                                        size={20}
                                        color={theme.colors.primaryIcon}
                                    />
                                </ThemeButton>
                                <ThemeButton
                                    title='Start Trip'
                                    onPress={handleStartClick}>
                                    <MaterialIcons
                                        name='play-arrow'
                                        size={20}
                                        color={theme.colors.primaryIcon}
                                    />
                                </ThemeButton>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default TripSummary;
