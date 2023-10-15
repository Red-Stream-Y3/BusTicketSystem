import React, { useRef, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Dimensions,
    ActivityIndicator,
} from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import ThemeTextInput from "./ThemeTextInput";
import { AntDesign } from "@expo/vector-icons";
import getThemeContext from "../../context/ThemeContext";

const ThemeSearchInput = ({
    title,
    value,
    options,
    onChange,
    setValue,
    placeholder,
    absolute,
    loading,
    onPressitem,
}) => {
    const { theme } = getThemeContext();
    const [showOptions, setShowOptions] = useState(false);
    const inputRef = useRef();

    const styles = StyleSheet.create({
        container: {
            marginBottom: 16,
        },
        label: {
            marginBottom: 8,
            fontSize: 16,
            fontWeight: "bold",
        },
        optionText: {
            padding: 8,
            fontSize: 16,
            color: theme.colors.text,
        },
        optionContainer: {
            position: absolute ? "absolute" : "relative",
            left: 0,
            right: 0,
            maxHeight: Dimensions.get("window").height / 3,
            backgroundColor: theme.colors.surface,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#ccc",
            zIndex: 50,
            elevation: 5,
        },
    });

    const handleOptionClick = (option) => {
        onPressitem(option);
        inputRef.current.blur();
        setShowOptions(false);
    };

    return (
        <View style={styles.container}>
            <ThemeTextInput
                title={title}
                ref={inputRef}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                onFocusLoss={() => {
                    setShowOptions(false);
                }}
                onFocus={() => setShowOptions(true)}
            />
            <View>
                {showOptions && (
                    <Animated.View
                        entering={FadeInUp}
                        exiting={FadeOutUp}
                        style={styles.optionContainer}>
                        {!loading && (!options || options?.length === 0) && (
                            <Text style={styles.optionText}>
                                No options found
                            </Text>
                        )}
                        {loading ? (
                            <ActivityIndicator
                                size={30}
                                color={theme.colors.primary}
                            />
                        ) : (
                            <>
                                {options &&
                                    options?.map((option, index) => (
                                        <Pressable
                                            key={index}
                                            android_ripple={{
                                                color: theme.colors.ripple,
                                            }}
                                            onPress={() =>
                                                handleOptionClick(option)
                                            }>
                                            <Text
                                                key={index}
                                                style={styles.optionText}>
                                                {option.routeNumber}
                                                {" | "}
                                                {option.routeName}
                                            </Text>
                                        </Pressable>
                                    ))}
                            </>
                        )}
                    </Animated.View>
                )}
            </View>
        </View>
    );
};

export default ThemeSearchInput;
