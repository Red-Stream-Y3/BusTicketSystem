import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    RefreshControl,
    Dimensions,
} from "react-native";
import getThemeContext from "../context/ThemeContext";
import { getAppContext } from "../context/AppContext";
import { getUserTrips } from "../services/userTripServices";
import Toast from "react-native-toast-message";
import TripCard from "./common/TripCard";

const HistoryContainer = ({ data }) => {
    const { theme } = getThemeContext();
    const { USER } = getAppContext();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchHistory = async () => {
        try {
            const data = await getUserTrips(30, USER.token);
            // console.log(data);
            setHistory(data);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.response?.data?.error || error.message,
            });
        }
    };

    const handleRefresh = async () => {
        setLoading(true);
        await fetchHistory();
        setLoading(false);
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            borderRadius: 10,
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 10,
        },
        text: {
            color: theme.colors.text,
        },
        subtitle: {
            fontSize: 14,
            fontWeight: "bold",
            color: theme.colors.text,
        },
        itemStyle: {
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderWidth: theme.mode === "dark" ? 1 : 0,
            borderColor: "#666",
            borderRadius: 5,
            width: Dimensions.get("window").width * 0.9,
            backgroundColor: theme.colors.surface,
            elevation: 5,
        },
        list: {
            flex: 1,
            width: Dimensions.get("window").width,
        },
        contentContainerStyle: {
            alignItems: "center",
            width: Dimensions.get("window").width,
            marginVertical: 5,
        },
    });

    useEffect(() => {
        handleRefresh();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={history}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={handleRefresh}
                    />
                }
                style={styles.list}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.contentContainerStyle}>
                        <TripCard
                            origin={item.origin.name}
                            destination={item.destination.name}
                            state={item.state}
                            date={item.createdAt}
                            width={Dimensions.get("window").width * 0.9}
                        />
                    </View>
                )}
            />
        </View>
    );
};

export default HistoryContainer;
