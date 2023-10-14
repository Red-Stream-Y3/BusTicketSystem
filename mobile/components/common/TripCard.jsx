import React from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";

const TripCard = ({ origin, destination, state, date, onPress, width }) => {
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
            flexDirection: "row",
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
    });

    return (
        <View style={styles.card}>
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
                        <Text style={styles.cardHeaderText}>{origin}</Text>
                    </View>
                    <View style={styles.flexRowCenter}>
                        <MaterialIcons
                            name='arrow-forward'
                            size={20}
                            color={theme.colors.text}
                        />
                        <Text style={styles.cardHeaderText}>{destination}</Text>
                    </View>
                </View>
                <View style={styles.cardBody}>
                    <Text style={styles.cardBodyText}>{state}</Text>
                    <Text style={styles.cardBodyText}>
                        {new Date(date).toLocaleDateString()}{" "}
                        {new Date(date).toLocaleTimeString()}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};

export default TripCard;
