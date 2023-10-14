import React from "react";
import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Animated, { FadeOut } from "react-native-reanimated";
import getThemeContext from "../context/ThemeContext";

const QRScreen = ({ navigation, route }) => {
    const { theme } = getThemeContext();
    const { qrData, sharedAnimationTag } = route.params;

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
            width: 250,
            height: 250,
            alignItems: "center",
            justifyContent: "center",
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
            <Animated.View style={styles.card} sharedTransitionTag={sharedAnimationTag || 'qrcode'} >
                <QRCode value={qrData} size={200} />
            </Animated.View>
        </View>
    );
};

export default QRScreen;
