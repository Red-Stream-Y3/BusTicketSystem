import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import ThemeButton from "./ThemeButton";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

const TripSummary = ({ trip, width, onClose, onDelete }) => {
    const { theme } = getThemeContext();
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const handleDeleteClick = () => {
        if (deleteConfirm) {
            onDelete(trip);
        } else {
            setDeleteConfirm(true);
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
        cancelContainer: {
            alignSelf: "center",
            marginTop: 10,
            alignItems: "center",
        },
    });

    return (
        <View style={styles.card}>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContentContainer}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderText}>Trip Summary</Text>

                    {/* qr code button */}
                    {trip?.state !== "cancelled" &&
                        trip?.state !== "completed" && (
                            <ThemeButton
                                title={"QR Code"}
                                onPress={onClose}
                                variant={"outlined"}>
                                <MaterialIcons
                                    name='qr-code'
                                    size={20}
                                    color={theme.colors.icon}
                                />
                            </ThemeButton>
                        )}
                </View>

                <View style={styles.hr} />

                <View style={styles.cardBody}>
                    {/* origin */}
                    <View style={styles.flexRowBetween}>
                        <View style={styles.flexRowCenter}>
                            <MaterialIcons
                                name='location-on'
                                size={20}
                                color={theme.colors.primary}
                            />
                            <Text style={styles.cardHeaderText}>Start:</Text>
                        </View>
                        <Text style={styles.title}>{trip?.origin?.name}</Text>
                    </View>

                    {/* destination */}
                    <View style={styles.flexRowBetween}>
                        <View style={styles.flexRowCenter}>
                            <MaterialIcons
                                name='location-on'
                                size={20}
                                color={theme.colors.primary}
                            />
                            <Text style={styles.cardHeaderText}>
                                Destination:
                            </Text>
                        </View>
                        <Text style={styles.title}>
                            {trip?.destination?.name}
                        </Text>
                    </View>

                    {/* fare */}
                    <View style={styles.flexRowBetween}>
                        <View style={styles.flexRowCenter}>
                            <MaterialIcons
                                name='monetization-on'
                                size={20}
                                color={theme.colors.primary}
                            />
                            <Text style={styles.cardHeaderText}>Fare:</Text>
                        </View>
                        <View style={styles.flexRowCenter}>
                            <Text style={styles.title}>Rs.{trip?.fare}</Text>
                            {trip?.paid ? (
                                <MaterialIcons
                                    name='check-circle'
                                    size={20}
                                    color={theme.colors.primary}
                                />
                            ) : (
                                <MaterialIcons
                                    name='pending'
                                    size={20}
                                    color={theme.colors.primary}
                                />
                            )}
                            {trip?.refunded && (
                                <MaterialIcons
                                    name='redo'
                                    size={20}
                                    color={theme.colors.primary}
                                />
                            )}
                        </View>
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
                            {trip?.driver
                                ? trip?.driver?.firstName +
                                  " " +
                                  trip?.driver?.lastName
                                : "Unavailable"}
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

                    {/* icon legend */}
                    <View style={styles.legendContainer}>
                        <View style={styles.flexRowCenter}>
                            <MaterialIcons
                                name='check-circle'
                                size={20}
                                color={theme.colors.primary}
                            />
                            <Text style={styles.cardBodyText}>Paid</Text>
                        </View>
                        <View style={styles.flexRowCenter}>
                            <MaterialIcons
                                name='pending'
                                size={20}
                                color={theme.colors.primary}
                            />
                            <Text style={styles.cardBodyText}>Pending</Text>
                        </View>
                        <View style={styles.flexRowCenter}>
                            <MaterialIcons
                                name='redo'
                                size={20}
                                color={theme.colors.primary}
                            />
                            <Text style={styles.cardBodyText}>Refunded</Text>
                        </View>
                    </View>

                    {/* cancel button */}
                    {trip?.state === "scheduled" && (
                        <View style={styles.cancelContainer}>
                            {deleteConfirm && (
                                <Animated.Text
                                    entering={FadeInDown}
                                    style={styles.textBold}>
                                    Are you sure you want to cancel this trip?
                                </Animated.Text>
                            )}

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
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default TripSummary;
