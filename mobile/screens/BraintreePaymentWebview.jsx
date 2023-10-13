import { Dimensions, StyleSheet, Text, View } from "react-native";
import { getAppContext } from "../context/AppContext";
import getThemeContext from "../context/ThemeContext";
import WebView from "react-native-webview";
import { ThemeButton } from "../components";
import { AntDesign } from '@expo/vector-icons';

const BraintreePaymentWebview = ({ onNonceReceived, setShowOverlay }) => {
    const { theme } = getThemeContext();
    const { SERVER_URL } = getAppContext();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.surface,
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            borderRadius: 10,
            elevation: 5,
            width: Dimensions.get("window").width * 0.9,
            height: Dimensions.get("window").height * 0.6,
        },
        text: {
            color: theme.colors.text,
        },
        webview: {
            height: Dimensions.get("window").height * 0.5,
            width: Dimensions.get("window").width * 0.8,
        },
        closeContainer: {
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            width: '100%',
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.closeContainer}>
                <ThemeButton variant={'clear'} onPress={()=>setShowOverlay(false)}>
                <AntDesign name="close" size={20} color={theme.colors.icon} />
            </ThemeButton>
            </View>
            
            <WebView
                style={styles.webview}
                source={{
                    uri: `${SERVER_URL}/braintree`,
                }}
                onMessage={(event) => {
                    onNonceReceived(event.nativeEvent.data);
                }}
                />
        </View>
    );
};

export default BraintreePaymentWebview;