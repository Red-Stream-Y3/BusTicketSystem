import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Dimensions,
} from "react-native";
import ThemeButton from "./common/ThemeButton";
import getThemeContext from "../context/ThemeContext";
import { getAppContext } from "../context/AppContext";
import Toast from "react-native-toast-message";
import Animated from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";
import TripCard from "./common/TripCard";
import TripSummary from "./common/TripSummary";
import ThemeOverlay from "./common/ThemeOverlay";
import { getBusJourneys } from "../services/busJourneyServices";

const HomeContainer = ({ navigation }) => {
    const { theme, toggleTheme } = getThemeContext();
    const { USER, credits, removeUser } = getAppContext();
    const [recent, setRecent] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [showSelected, setShowSelected] = useState(false);
    const [selected, setSelected] = useState(null);

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
    });

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchRecent();
        setRefreshing(false);
    };

    useEffect(() => {
        handleRefresh();
    }, []);

    const handleDeleteClick = async () => {
        if (!selected) return;

        try {
            //const trip = await cancelUserTrip(selected._id, USER.token);

            if (trip) {
                Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: "Trip cancelled successfully",
                });
                handleRefresh();
                setShowSelected(false);
            }
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.response?.data?.error || error.message,
            });
        }
    };

    const handleQrClick = () => {
        if (!selected) return;
        setShowSelected(false);
    };

    const handleModalBgPress = () => {
        setShowSelected(false);
    };

    const handleItemClick = (item) => {
        setSelected(item);
        setShowSelected(true);
    };

    return (
        <>
            <ThemeOverlay visible={showSelected} onPressBg={handleModalBgPress}>
                <TripSummary
                    trip={selected}
                    onClose={handleQrClick}
                    onDelete={handleDeleteClick}
                />
            </ThemeOverlay>
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
                    <View style={styles.userContainer}>
                        <Text style={styles.title}>{USER?.username}</Text>
                        <Text style={styles.text}>
                            {USER?.firstName} {USER?.lastName}
                        </Text>
                        <Text style={styles.text}>{USER?.email}</Text>
                        <View style={styles.flexRowCenter}>
                            <ThemeButton
                                title={"Sign Out"}
                                variant={"outlined"}
                                onPress={() => removeUser()}
                            />
                            {/* TODO: remove theme toggle button */}
                            <ThemeButton
                                title={"Toggle Theme"}
                                variant={"outlined"}
                                onPress={() => toggleTheme()}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.flexRowBetween}>
                        <ThemeButton
                            title={"New Trip"}
                            textSize={16}
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
