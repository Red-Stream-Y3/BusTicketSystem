import React, { useEffect, useState } from "react";
import {
    View,
    FlatList,
    StyleSheet,
    RefreshControl,
    Dimensions,
} from "react-native";
import getThemeContext from "../context/ThemeContext";
import { getAppContext } from "../context/AppContext";
import { cancelUserTrip, getUserTrips } from "../services/userTripServices";
import Toast from "react-native-toast-message";
import TripCard from "./common/TripCard";
import ThemeOverlay from "./common/ThemeOverlay";
import TripSummary from "./common/TripSummary";
import { useNavigation } from "@react-navigation/native";

const HistoryContainer = ({ data }) => {
    const { theme } = getThemeContext();
    const { USER } = getAppContext();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSelected, setShowSelected] = useState(false);
    const [selected, setSelected] = useState(null);
    const navigation = useNavigation();

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

    const handleItemClick = (item) => {
        setSelected(item);
        setShowSelected(true);
    };

    const handleModalBgPress = () => {
        setShowSelected(false);
    };

    const handleQrClick = () => {
        if (!selected) return;
        setShowSelected(false);
        navigation.navigate("QRscreen", { qrData: selected._id });
    };

    const handleDeleteClick = async () => {
        if (!selected) return;
        try {
            const trip = await cancelUserTrip(selected._id, USER.token);

            if (trip) {
                Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: "Trip deleted successfully",
                });
                setShowSelected(false);
                setSelected(null);
                handleRefresh();
            }
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.response?.data?.error || error.message,
            });
        }
    };

    useEffect(() => {
        handleRefresh();
    }, []);

    return (
        <View style={styles.container}>
            <ThemeOverlay visible={showSelected} onPressBg={handleModalBgPress}>
                <TripSummary
                    trip={selected}
                    onClose={handleQrClick}
                    onDelete={handleDeleteClick}
                />
            </ThemeOverlay>
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
                            trip={item}
                            width={Dimensions.get("window").width * 0.9}
                            onPress={() => handleItemClick(item)}
                        />
                    </View>
                )}
            />
        </View>
    );
};

export default HistoryContainer;
