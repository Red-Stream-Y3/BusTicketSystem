import { View, Text, StyleSheet, Dimensions } from "react-native";
import getThemeContext from "../context/ThemeContext";
import { ThemeButton, ThemeOverlay, ThemeTextInput } from "../components";
import { useState } from "react";
import BraintreePaymentWebview from "./BraintreePaymentWebview";
import { getAppContext } from "../context/AppContext";
import Toast from "react-native-toast-message";
import axios from "axios";

const RechargeScreen = ({ navigation }) => {
    const { theme } = getThemeContext();
    const { SERVER_URL, USER, credits, updateCredits } = getAppContext();
    const [amount, setAmount] = useState("");
    const [showOverlay, setShowOverlay] = useState(false);

    const handlePayment = async (payload) => {
        try {
            const response = await axios.post(
                `${SERVER_URL}/api/braintree/createPaymentTransaction`,
                {
                    amount: amount,
                    nonce: payload.nonce,
                    deviceData: payload.deviceData,
                    test: true,
                }
            );

            console.log(response.data);

            if (response.data.isPaymentSuccessful) {
                Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: "Payment successful",
                });
                setShowOverlay(false);
                await updateCredits(amount);
                setShowOverlay(false);
                setAmount("");
                navigation.goBack();
            } else {
                throw new Error(
                    response.errorText ||
                        response.error ||
                        response.error?.message ||
                        response.data?.message ||
                        "Error updating credits"
                );
            }
        } catch (error) {
            console.log(error);
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.response?.data?.error || error.message,
            });
        }
    };

    const handleConfirm = () => {
        if (amount === "") {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Please enter amount",
            });
        } else {
            setShowOverlay(true);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            alignItems: "center",
            justifyContent: "center",
        },
        card: {
            backgroundColor: theme.colors.surface,
            borderRadius: 10,
            padding: 10,
            marginVertical: 10,
            width: Dimensions.get("window").width * 0.9,
        },
        text: {
            color: theme.colors.text,
        },
        label: {
            fontSize: 16,
            fontWeight: "bold",
            color: theme.colors.text,
            alignSelf: "center",
            marginBottom: 10,
        },
    });

    return (
        <View style={styles.container}>
            <ThemeOverlay visible={showOverlay} onPressBg={() => {}}>
                <BraintreePaymentWebview
                    onNonceReceived={handlePayment}
                    setShowOverlay={setShowOverlay}
                    amount={amount}
                />
            </ThemeOverlay>

            <View style={styles.card}>
                <Text style={styles.label}>
                    Available Balance: Rs.{credits}
                </Text>
                <ThemeTextInput
                    title='Amount to recharge'
                    placeholder='Enter amount'
                    keyboardType='numeric'
                    value={amount}
                    onChange={(text) => setAmount(text)}
                />
                <ThemeButton title={"Confirm"} onPress={handleConfirm} />
            </View>
        </View>
    );
};

export default RechargeScreen;
