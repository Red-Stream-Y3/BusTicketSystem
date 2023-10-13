import React from "react";
import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Animated from "react-native-reanimated";
import getThemeContext from "../context/ThemeContext";
import { getAppContext } from "../context/AppContext";

const QRScreen = ({ navigation }) => {
    const { theme } = getThemeContext();
    const { USER } = getAppContext();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.background,
        },
        card: {
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 10,
            elevation: 5,
        },
        text: {
            fontSize: 20,
            marginBottom: 20,
            color: theme.colors.text,
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Scan this QR code:</Text>
            <Animated.View style={styles.card} sharedTransitionTag='qrcode'>
                <QRCode value={USER._id} size={200} />
            </Animated.View>
        </View>
    );
};

export default QRScreen;
