import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import ThemeTextInput from "./ThemeTextInput";
import { AntDesign } from "@expo/vector-icons";
import getThemeContext from "../../context/ThemeContext";

const ThemeDropDownInput = ({ title, value, options, onChange, setValue, placeholder, absolute }) => {
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
        option: {
            padding: 8,
            fontSize: 16,
            color: "#333",
        },
        optionContainer: {
            position: absolute ? "absolute" : "relative",
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#ccc",
            zIndex: 50,
            elevation: 5,
        },
    });

    const handleOptionClick = (option) => {
        if (onChange) onChange(option);
        setValue(option);
        inputRef.current.blur();
        setShowOptions(false);
    };

    return (
        <View style={styles.container}>
            <ThemeTextInput
                title={title}
                ref={inputRef}
                placeholder={placeholder}
                value={options.includes(value) ? value : null}
                onFocusLoss={() => {
                    setShowOptions(false);
                    inputRef.current.blur();
                }}
                onFocus={() => setShowOptions(true)}
                editable={false}
                onPressIcon={() => {
                    setShowOptions(!showOptions);
                    inputRef.current.focus();
                }}
                icon={
                    <AntDesign
                        name="down"
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
                    {options.map((option, index) => (
                        <Pressable
                            key={index}
                            android_ripple={{ color: theme.colors.ripple }}
                            onPress={() => handleOptionClick(option)}>
                            <Text key={index} style={styles.option}>
                                {option}
                            </Text>
                        </Pressable>
                    ))}
                </Animated.View>
            )}
            </View>
            
        </View>
    );
};

export default ThemeDropDownInput;
