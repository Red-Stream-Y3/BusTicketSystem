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

const HomeContainer = ({ navigation }) => {
    const { theme } = getThemeContext();
    const { USER, credits, fetchCredits, removeUser } = getAppContext();
    const [recent, setRecent] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

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
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.primary,
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
        setRefreshing(false);
    };

    useEffect(() => {
        handleRefresh();
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
                            variant={'outlined'}
                            onPress={() => removeUser()}
                        />
                    </View>
                </View>

                <ThemeButton
                    title={"Recharge Credits"}
                    onPress={() => navigation.navigate("Recharge")}
                />

                <View style={styles.card}>
                    <Text style={styles.title}>Recent Trips</Text>
                    <View style={styles.hr} />
                    <View style={styles.center}>
                        {refreshing && (
                            <ActivityIndicator
                                size={40}
                                color={theme.colors.primary}
                            />
                        )}
                        {!refreshing && recent.length > 0 ? (
                            recent.map((item) => (
                                <View key={item._id} style={styles.itemStyle}>
                                    <Text style={styles.text}>
                                        {item.title}
                                    </Text>
                                    <Text style={styles.text}>{item.date}</Text>
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
