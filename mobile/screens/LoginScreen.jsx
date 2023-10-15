import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Text,
    StyleSheet,
    Platform,
    ActivityIndicator,
} from "react-native";
import {
    RegisterContainer,
    ThemeButton,
    ThemeOverlay,
    ThemeTextInput,
} from "../components";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import getThemeContext from "../context/ThemeContext";
import { getAppContext } from "../context/AppContext";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

const LoginScreen = () => {
    const { theme } = getThemeContext();
    const { SERVER_URL, storeUser, APP_NAME } = getAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        if (email === "" || password === "") {
            setError("Please fill all fields");
            return;
        }

        const data = {
            email,
            password,
        };

        setLoading(true);

        try {
            const response = await axios.post(
                `${SERVER_URL}/api/users/login`,
                data
            );
            if (response) {
                storeUser(response.data);
            }

            setLoading(false);
        } catch (error) {
            setError(error.response?.data?.error || error.message);
            setLoading(false);
        }
    };

    const handleRegister = () => {
        setShowRegister(true);
    };

    const handleModalBgPress = () => {
        if (Platform.OS === "web") {
            return;
        }
        setShowRegister(false);
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
            backgroundColor: theme.colors.background,
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
            color: theme.colors.text,
        },
        error: {
            color: theme.colors.error,
            fontSize: 12,
            alignSelf: "flex-start",
            marginLeft: 10,
            marginBottom: 10,
        },
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <ThemeOverlay
                visible={showRegister}
                onPressBg={() => handleModalBgPress}>
                <RegisterContainer
                    setOverlayOpen={setShowRegister}
                    setLoginEmail={setEmail}
                    setLoginPassword={setPassword}
                />
            </ThemeOverlay>

            <Text style={styles.title}>{APP_NAME}</Text>

            {error && (
                <Animated.Text
                    entering={FadeInUp}
                    exiting={FadeOutUp}
                    style={styles.error}>
                    {error}
                </Animated.Text>
            )}

            <ThemeTextInput
                title='Email'
                placeholder='Enter your email'
                value={email}
                onChange={(text) => setEmail(text)}
                keyboardType='email-address'
                textContentType='emailAddress'
            />
            <ThemeTextInput
                title='Password'
                placeholder='Enter your password'
                value={password}
                onChange={(text) => setPassword(text)}
                icon={
                    <Feather
                        name={showPassword ? "eye-off" : "eye"}
                        size={24}
                        color={theme.colors.icon}
                    />
                }
                onPressIcon={() => setShowPassword(!showPassword)}
                secureTextEntry={!showPassword}
                textContentType='password'
            />
            <ThemeButton
                title={!loading && "Login"}
                textSize={16}
                onPress={handleLogin}>
                {loading && (
                    <ActivityIndicator color={theme.colors.buttonText} />
                )}
            </ThemeButton>
            <ThemeButton
                title='Register'
                onPress={handleRegister}
                variant={"clear"}
            />
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
