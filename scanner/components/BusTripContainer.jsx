import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    ScrollView,
} from "react-native";
import getThemeContext from "../context/ThemeContext";
import ScannerContainer from "./ScannerContainer";
import ThemeOverlay from "./common/ThemeOverlay";
import {
    cancelBusJourney,
    endBusJourney,
    updateBusJourney,
} from "../services/busJourneyServices";
import { Ionicons } from "@expo/vector-icons";
import { getAppContext } from "../context/AppContext";
import ThemeButton from "./common/ThemeButton";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

const BusTripContainer = ({ trip }) => {
    const { theme } = getThemeContext();
    const { USER } = getAppContext();
    const [showOverlay, setShowOverlay] = useState(false);
    const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submittingComplete, setSubmittingComplete] = useState(false);
    const [submittingCancel, setSubmittingCancel] = useState(false);
    const [overlayData, setOverlayData] = useState({});
    const [stats, setStats] = useState({
        totalPassengers: 0,
        totalBoarded: 0,
        crowd: "",
    });
    const OVERLAY_TIMEOUT = 3000;

    const navigation = useNavigation();

    useEffect(() => {
        const totalPassengers = trip?.boardedUsers?.length;
        const totalBoarded = trip?.boardedUsers?.filter(
            (passenger) => passenger.state === "boarded"
        )?.length;

        let crowd = "";

        if (trip?.bus?.busCapacity !== null && totalBoarded !== null) {
            if (totalBoarded >= trip?.bus?.busCapacity) {
                crowd = "Currently overcrowded";
            } else {
                crowd = trip?.bus?.busCapacity - totalBoarded + " seats left";
            }
        } else {
            crowd = "No bus capacity set";
        }

        setStats({
            totalPassengers,
            totalBoarded,
            crowd,
        });
    }, [trip]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        logo: {
            width: 150,
            height: 150,
            resizeMode: "contain",
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 10,
            color: theme.colors.text,
        },
        scannerContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        overlayContainer: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.surface,
            padding: 20,
            borderRadius: 10,
        },
        messageContainer: {
            justifyContent: "center",
            alignItems: "center",
        },
        topContainer: {
            flexDirection: "row",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            marginHorizontal: 10,
            zIndex: 100,
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 10,
            elevation: 5,
            borderRadius: 10,
            backgroundColor: theme.colors.surface,
        },
        flexRowEnd: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: 10,
            width: "100%",
        },
        text: {
            color: theme.colors.text,
            fontWeight: "bold",
        },
        scrollContainer: {
            flex: 1,
            maxHeight: "100%",
            overflow: "visible",
        },
        scrollContentContainer: {
            flexGrow: 1,
            justifyContent: "center",
        },
        deleteContainer: {
            justifyContent: "center",
            alignItems: "flex-start",
            backgroundColor: theme.colors.surface,
            padding: 20,
            borderRadius: 10,
            width: Dimensions.get("window").width * 0.8,
        },
        subtitle: {
            fontSize: 16,
            fontWeight: "bold",
            color: theme.colors.text,
            marginBottom: 10,
        },
        hr: {
            borderBottomWidth: 1,
            borderBottomColor: "#666",
            width: "100%",
            marginBottom: 5,
        },
    });

    const onCodeScanned = async (data) => {
        setShowOverlay(true);

        try {
            setLoading(true);

            const busJourney = {
                _id: trip._id,
                boardedUser: data,
            };

            const response = await updateBusJourney(busJourney, USER.token);

            setOverlayData({
                title: "Success",
                message: null,
                icon: "checkmark-circle-sharp",
                iconColor: theme.colors.primary,
            });

            //TODO: start success sound

            setLoading(false);
            setTimeout(() => {
                //TODO: stop success sound

                setShowOverlay(false);
            }, OVERLAY_TIMEOUT);
        } catch (error) {
            //TODO: start error sound

            setLoading(false);
            setOverlayData({
                title: "Error",
                message: error.response?.data?.message || error.message,
                icon: "alert-circle",
                iconColor: theme.colors.error,
            });
            setTimeout(() => {
                //TODO: stop error sound

                setShowOverlay(false);
            }, OVERLAY_TIMEOUT);
        }
    };

    const handleEndTripPress = async () => {
        if (!showDeleteOverlay) {
            setShowDeleteOverlay(true);
            return;
        }

        setSubmittingComplete(true);

        try {
            const response = await endBusJourney(trip._id, USER.token);
            console.log("end trip response ==>", response);
            setSubmittingComplete(false);
            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Trip ended successfully",
            });
            setShowDeleteOverlay(false);

            navigation.goBack();
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.response?.data?.message || error.message,
            });
        }
    };

    const handleCancelTripPress = async () => {
        setSubmittingCancel(true);

        try {
            const response = await cancelBusJourney(trip._id, USER.token);
            console.log("cancel trip response ==>", response);
            setSubmittingCancel(false);
            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Trip cancelled successfully",
            });
            setShowDeleteOverlay(false);

            navigation.goBack();
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.response?.data?.message || error.message,
            });
        }
    };

    return (
        <View style={styles.container}>
            <ThemeOverlay visible={showOverlay} onPressBg={() => {}}>
                <View style={styles.overlayContainer}>
                    {loading ? (
                        <ActivityIndicator
                            size={200}
                            color={theme.colors.primary}
                        />
                    ) : (
                        <View style={styles.messageContainer}>
                            <Ionicons
                                name={overlayData.icon}
                                size={200}
                                color={overlayData.iconColor}
                            />
                            <Text style={styles.title}>
                                {overlayData.title}
                            </Text>
                            {overlayData.message && (
                                <Text style={styles.title}>
                                    {overlayData.message}
                                </Text>
                            )}
                        </View>
                    )}
                </View>
            </ThemeOverlay>

            <ThemeOverlay
                visible={showDeleteOverlay}
                onPressBg={() => setShowDeleteOverlay(false)}>
                <View style={styles.deleteContainer}>
                    <Text style={styles.subtitle}>
                        Are you sure you want to end this trip?
                    </Text>
                    <Text style={styles.text}>
                        Note* Any passengers that have not been scanned out will
                        be marked as absent and be refunded.
                    </Text>
                    <View style={styles.flexRowEnd}>
                        <ThemeButton
                            title='No'
                            variant={"clear"}
                            onPress={() => setShowDeleteOverlay(false)}
                            textSize={16}
                        />
                        <ThemeButton
                            title={
                                submittingComplete ? (
                                    <ActivityIndicator
                                        color={theme.colors.primaryIcon}
                                        size={30}
                                    />
                                ) : (
                                    "Yes"
                                )
                            }
                            onPress={() => handleEndTripPress()}
                            textSize={16}
                        />
                    </View>

                    <View style={styles.hr} />

                    <Text style={styles.subtitle}>
                        Do you want to cancel this trip?
                    </Text>
                    <Text style={styles.text}>
                        Note* Any passengers that have not been scanned out will
                        be refunded.
                    </Text>
                    <View style={styles.flexRowEnd}>
                        <ThemeButton
                            title={
                                submittingCancel ? (
                                    <ActivityIndicator
                                        color={theme.colors.primaryIcon}
                                        size={30}
                                    />
                                ) : (
                                    "Cancel This Trip"
                                )
                            }
                            color={theme.colors.error}
                            onPress={() => handleCancelTripPress()}
                            textSize={16}
                        />
                    </View>
                </View>
            </ThemeOverlay>

            <ScrollView
                keyboardShouldPersistTaps='handled'
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContentContainer}>
                <View style={styles.topContainer}>
                    <View>
                        <Text style={styles.text}>
                            Total Passengers: {stats.totalPassengers}
                        </Text>
                        <Text style={styles.text}>
                            Currently Boarded: {stats.totalBoarded}
                        </Text>
                        <Text style={styles.text}>{stats.crowd}</Text>
                    </View>
                    <ThemeButton
                        title='End Trip'
                        onPress={handleEndTripPress}
                        textSize={16}>
                        <Ionicons
                            name='checkmark-done'
                            size={24}
                            color={theme.colors.primaryIcon}
                        />
                    </ThemeButton>
                </View>

                <View style={styles.scannerContainer}>
                    <ScannerContainer onCodeScanned={onCodeScanned} />
                </View>
            </ScrollView>
        </View>
    );
};

export default BusTripContainer;
