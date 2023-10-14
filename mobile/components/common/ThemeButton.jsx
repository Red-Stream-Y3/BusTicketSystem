import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import getThemeContext from "../../context/ThemeContext";

const ThemeButton = ({
    children,
    onPress,
    title,
    padding,
    variant,
    textSize,
    borderRadius,
    color,
}) => {
    const { theme } = getThemeContext();

    const styles = StyleSheet.create({
        filled: {
            backgroundColor: color || theme.colors.primary,
            overflow: "hidden",
            borderRadius: borderRadius || 5,
            elevation: 3,
            margin: 5,
        },
        outlined: {
            borderColor: color || theme.colors.primary,
            borderWidth: 1,
            overflow: "hidden",
            borderRadius: borderRadius || 5,
            margin: 5,
        },
        clear: {
            overflow: "hidden",
            borderRadius: borderRadius || 5,
            margin: 5,
        },
        buttonTitle: {
            fontSize: textSize || 14,
            marginHorizontal: 2,
            marginStart: children ? 5 : 2,
            fontWeight: "bold",
            color:
                variant === "clear" || variant === "outlined"
                    ? theme.colors.text
                    : theme.colors.buttonText,
        },
        pressableContainer: {
            padding: padding || 10,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            width: "auto",
        },
        pressableRipple: {
            color:
                variant === "clear" || variant === "outlined"
                    ? theme.colors.primary
                    : theme.colors.ripple,
        }
    });

    return (
        <Animated.View
            style={
                variant === "clear"
                    ? styles.clear
                    : variant === "outlined"
                    ? styles.outlined
                    : styles.filled
            }>
            <Pressable
                android_ripple={styles.pressableRipple}
                style={styles.pressableContainer}
                onPress={onPress || (() => {})}>
                {children}
                {title && (
                    <Text
                        style={styles.buttonTitle}>
                        {title}
                    </Text>
                )}
            </Pressable>
        </Animated.View>
    );
};

export default ThemeButton;