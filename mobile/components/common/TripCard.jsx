import React from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";

const TripCard = ({ trip, onPress, width }) => {
    const { theme } = getThemeContext();

    const styles = StyleSheet.create({
        card: {
            borderWidth: theme.mode === "dark" ? 1 : 0,
            borderColor: "#666",
            backgroundColor: theme.colors.surface,
            borderRadius: 5,
            elevation: 5,
            width: width || Dimensions.get("window").width * 0.8,
        },
        pressableContainer: {
            paddingVertical: 10,
            paddingHorizontal: 10,
        },
        cardHeader: {
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 10,
        },
        cardHeaderText: {
            fontSize: 16,
            fontWeight: "bold",
            color: theme.colors.text,
        },
        cardBody: {
            flexDirection: "row",
            justifyContent: "space-between",
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
        ripple: {
            color: theme.colors.ripple,
        },
        hrStrip: {
            borderBottomColor:
                trip.state === "completed"
                    ? "green"
                    : trip.state === "cancelled"
                    ? "red"
                    : trip.state === "boarded"
                    ? "blue"
                    : trip.state === "scheduled"
                    ? "yellow"
                    : "black",
            borderBottomWidth: 5,
        },
    });

    return (
        <View style={styles.card}>
            <View style={styles.hrStrip} />
            <Pressable
                android_ripple={styles.ripple}
                style={styles.pressableContainer}
                onPress={onPress ? onPress : () => {}}>
                <View style={styles.cardHeader}>
                    <View style={styles.flexRowCenter}>
                        <MaterialIcons
                            name='location-on'
                            size={20}
                            color={theme.colors.text}
                        />
                        <Text style={styles.cardHeaderText}>
                            {trip.origin.name}
                        </Text>
                    </View>
                    <View style={styles.flexRowCenter}>
                        <MaterialIcons
                            name='arrow-forward'
                            size={20}
                            color={theme.colors.text}
                        />
                        <Text style={styles.cardHeaderText}>
                            {trip.destination.name}
                        </Text>
                    </View>
                </View>
                <View style={styles.cardBody}>
                    <Text style={styles.cardBodyText}>{trip.state}</Text>
                    <Text style={styles.cardBodyText}>
                        {new Date(trip.createdAt).toLocaleDateString()}{" "}
                        {new Date(trip.createdAt).toLocaleTimeString()}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};

export default TripCard;
