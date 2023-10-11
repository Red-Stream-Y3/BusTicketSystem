import { Pressable, StyleSheet, Text, View } from "react-native";
import getThemeContext from "../../context/ThemeContext";

const ThemeChip = ({ children, clickable, onClick, text, disableRipple, filled, color, active }) => {
    const { theme } = getThemeContext();

    const styles = StyleSheet.create({
        container: {
            overflow: "hidden",
            borderRadius: 20,
            borderWidth: 1,
            marginHorizontal: 1,
            marginVertical: 2,
            borderColor: theme.colors.primary,
        },
        pressableRipple: {
            color: disableRipple ? null : theme.colors.ripple,
        },
        pressableContainer: {
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: active
                ? (color || theme.colors.primary)
                : theme.colors.surface,
            alignItems: "center",
        },
        text: {
            fontWeight: "bold",
            color: active
                ? theme.colors.primaryText
                : theme.colors.text,
            paddingHorizontal: 5,
        },
    });

    return (
        <View
            style={styles.container}>
            <Pressable
                android_ripple={styles.pressableRipple}
                style={styles.pressableContainer}
                onPress={() => {
                    if (clickable) {
                        if (onClick) onClick();
                    }
                }}>
                {children}

                <Text
                    style={styles.text}>
                    {text}
                </Text>
            </Pressable>
        </View>
    );
};

export default ThemeChip;
