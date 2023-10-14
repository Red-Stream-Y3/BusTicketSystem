import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import ThemeTextInput from "./ThemeTextInput";
import { AntDesign } from "@expo/vector-icons";
import getThemeContext from "../../context/ThemeContext";

const ThemeDropDownInput = ({
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
                value={value}
                onChange={onChange}
                onFocusLoss={() => {
                    setShowOptions(false);
                    inputRef.current.blur();
                }}
                onFocus={() => setShowOptions(true)}
                onPressIcon={() => {
                    setShowOptions(!showOptions);
                    inputRef.current.focus();
                }}
                icon={
                    <AntDesign
                        name='down'
                        size={24}
                        color={theme.colors.icon}
                    />
                }
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
                                                {option.name}
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

export default ThemeDropDownInput;
