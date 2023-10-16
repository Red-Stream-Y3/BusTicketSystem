/** @format */

import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import ThemeButton from "./common/ThemeButton";
import getThemeContext from "../context/ThemeContext";
import { getAppContext } from "../context/AppContext";
import Toast from "react-native-toast-message";
import { Entypo } from "@expo/vector-icons";
import TripCard from "./common/TripCard";
import { getBusJourneys } from "../services/busJourneyServices";

const HomeContainer = ({ navigation }) => {
    const { theme } = getThemeContext();
    const { USER } = getAppContext();
    const [recent, setRecent] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleTimeString()
    );

    const fetchRecent = async () => {
        try {
            const data = await getBusJourneys(4, USER.token);
            setRecent(data);
        } catch (error) {
            console.log(error.response?.data?.message);
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.response?.data?.message || error.message,
            });
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        //refresh recent trips every 5 minutes
        const interval2 = setInterval(() => {
            handleRefresh();
        }, 300000);

        return () => {
            clearInterval(interval);
            clearInterval(interval2);
        };
    }, []);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.background,
        },
        card: {
            backgroundColor: theme.colors.surface,
            marginVertical: 10,
            padding: 15,
            borderRadius: 10,
            elevation: 5,
        },
        cardRow: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.colors.surface,
            marginVertical: 10,
            padding: 15,
            borderRadius: 10,
            elevation: 5,
        },
        center: {
            justifyContent: "center",
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
        title: {
            fontSize: 18,
            fontWeight: "bold",
            color: theme.colors.text,
        },
        subtitle: {
            fontSize: 14,
            fontWeight: "bold",
            color: theme.colors.text,
        },
        qrCodeContainer: {
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            backgroundColor: "#fff",
            borderRadius: 10,
            height: 150,
            width: 150,
        },
        userContainer: {
            justifyContent: "center",
            alignItems: "flex-start",
            marginTop: 10,
            marginStart: 10,
            paddingStart: 10,
            borderStartWidth: 1,
            borderColor: theme.colors.primary,
        },
        hr: {
            borderBottomWidth: 1,
            borderBottomColor: "#666",
            width: Dimensions.get("window").width * 0.8,
            marginBottom: 5,
        },
        ripple: {
            color: "rgba(0,0,0,0.2)",
        },
        itemContainer: {
            marginVertical: 5,
        },
        creditContainer: {
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
        },
        h1: {
            fontSize: 24,
            fontWeight: "bold",
            color: theme.colors.text,
            elevation: 5,
        },
        h2: {
            fontSize: 14,
            fontWeight: "bold",
            color: theme.colors.text,
            elevation: 5,
        },
        newTripBtn: {
            backgroundColor: theme.colors.primary,
            padding: 10,
            borderRadius: 5,
            elevation: 5,
            width: 200,
            alignItems: "center",
            justifyContent: "center",
        },
        tripTxt: {
            fontSize: 18,
            fontWeight: "bold",
            color: theme.colors.primaryText,
            marginStart: 10,
        },
    });

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchRecent();
        setRefreshing(false);
    };

    useEffect(() => {
        handleRefresh();
    }, []);

    const handleItemClick = (item) => {
        navigation.navigate("BusTrip", {
            trip: item,
        });
    };

    return (
        <>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
                style={styles.container}
                contentContainerStyle={{ alignItems: "center" }}>
                <View style={styles.cardRow}>
                    <View style={styles.creditContainer}>
                        <Text style={styles.h1}>{currentTime}</Text>
                        <Text style={styles.h2}>
                            {new Date().toLocaleDateString()}
                        </Text>
                    </View>
                    <View style={styles.userContainer}>
                        <Text style={styles.title}>{USER?.username}</Text>
                        <Text style={styles.text}>
                            {USER?.firstName} {USER?.lastName}
                        </Text>
                        <Text style={styles.text}>{USER?.email}</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.flexRowBetween}>
                        <ThemeButton
                            title={"New Trip"}
                            textSize={18}
                            paddingHorizontal={20}
                            textmargin={5}
                            onPress={() => navigation.navigate("NewTrip")}>
                            <Entypo
                                name='address'
                                size={24}
                                color={theme.colors.primaryIcon}
                            />
                        </ThemeButton>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.flexRowBetween}>
                        <Text style={styles.title}>Recent Trips</Text>
                        <ThemeButton
                            title={"View All"}
                            variant={"clear"}
                            textSize={14}
                            onPress={() => navigation.navigate("History")}>
                            <Entypo
                                name='list'
                                size={24}
                                color={theme.colors.primaryIcon}
                            />
                        </ThemeButton>
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.center}>
                        {refreshing ? (
                            <Text style={styles.text}>
                                Loading recent trips...
                            </Text>
                        ) : recent?.length > 0 ? (
                            recent.map((item) => (
                                <View
                                    key={item._id}
                                    style={styles.itemContainer}>
                                    <TripCard
                                        trip={item}
                                        onPress={() => handleItemClick(item)}
                                    />
                                </View>
                            ))
                        ) : (
                            <Text style={styles.text}>No recent trips</Text>
                        )}
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

export default HomeContainer;
