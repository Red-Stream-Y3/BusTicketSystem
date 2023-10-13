import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Dimensions,
    ActivityIndicator,
    Pressable,
} from "react-native";
import ThemeButton from "./common/ThemeButton";
import getThemeContext from "../context/ThemeContext";
import { getAppContext } from "../context/AppContext";
import QRCode from "react-native-qrcode-svg";
import Animated from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";
import { getUserTrips } from "../services/userTripServices";

const HomeContainer = ({ navigation }) => {
    const { theme } = getThemeContext();
    const { USER, credits, fetchCredits, removeUser } = getAppContext();
    const [recent, setRecent] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchRecent = async () => {
        try {
            const data = await getUserTrips(5, USER.token);
            // console.log(data);
            setRecent(data);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.response?.data?.error || error.message,
            });
        }
    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.background,
            marginHorizontal: 10,
            padding: 10,
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
        },
        creditContainer: {
            justifyContent: "center",
            alignItems: "flex-start",
            marginTop: 10,
            marginStart: 10,
            paddingStart: 10,
            borderStartWidth: 1,
            borderColor: theme.colors.primary,
        },
        itemStyle: {
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderWidth: theme.mode==='dark' ? 1 : 0,
            borderColor: "#666",
            borderRadius: 5,
            width: Dimensions.get("window").width * 0.8,
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
    });

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchCredits();
        await fetchRecent();
        setRefreshing(false);
    };

    useEffect(() => {
        handleRefresh();
        fetchRecent();
    }, []);

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
                    <View>
                        {USER._id ? (
                            <Pressable
                                android_ripple={styles.ripple}
                                onPress={() => navigation.navigate("QRscreen")}>
                                <Animated.View
                                    style={styles.qrCodeContainer}
                                    sharedTransitionTag='qrcode'>
                                    <QRCode size={150} value={USER._id} />
                                </Animated.View>
                            </Pressable>
                        ) : (
                            <Text style={styles.text}>Not logged in</Text>
                        )}
                    </View>

                    <View style={styles.creditContainer}>
                        <Text style={styles.title}>{USER.username}</Text>
                        <Text style={styles.text}>
                            {USER.firstName} {USER.lastName}
                        </Text>
                        <Text style={styles.text}>{USER.email}</Text>
                        <Text style={styles.title}>Credits: {credits}</Text>
                        <Text
                            style={
                                styles.text
                            }>{`(Tap QR to get full screen)`}</Text>
                        <ThemeButton
                            title={"Sign Out"}
                            variant={"outlined"}
                            onPress={() => removeUser()}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.flexRowBetween}>
                        <ThemeButton
                            title={"New Trip"}
                            textSize={14}
                            onPress={() => navigation.navigate("Book")}>
                            <Entypo
                                name='ticket'
                                size={24}
                                color={theme.colors.primaryIcon}
                            />
                        </ThemeButton>
                        <ThemeButton
                            title={"Recharge Credits"}
                            textSize={14}
                            onPress={() => navigation.navigate("Recharge")}>
                            <Entypo
                                name='credit'
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
                        {refreshing && (
                            <ActivityIndicator
                                size={40}
                                color={theme.colors.primary}
                            />
                        )}
                        {!refreshing && recent?.length > 0 ? (
                            recent.map((item) => (
                                <View key={item._id} style={styles.itemStyle}>
                                    <Text style={styles.text}>
                                        From {item.origin.name} to{" "}
                                        {item.destination.name}
                                    </Text>
                                    <Text style={styles.subtitle}>
                                        {item.state}
                                    </Text>
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
