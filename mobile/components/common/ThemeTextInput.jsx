import { StyleSheet, TextInput, View, Text, Pressable } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { forwardRef } from "react";

const ThemeTextInput = forwardRef((props, ref) => {
    const {
        title,
        value,
        textColor,
        onPressIcon,
        onChange,
        icon,
        placeholder,
        textSize,
        width,
        keyboardType,
        editable,
        disabled,
        multiline,
        numOfLines,
        maxLength,
        onFocus,
        onFocusLoss,
        secureTextEntry,
        textContentType,
    } = props;

    const { theme } = getThemeContext();

    const styles = StyleSheet.create({
        textH1: {
            color: theme.colors.text,
            fontSize: 16,
            fontWeight: "bold",
        },
        textTitle: {
            color: theme.colors.text,
            fontSize: 16,
            fontWeight: "bold",
            position: "absolute",
            top: -13,
            left: 10,
            backgroundColor: theme.colors.surface,
            zIndex: 2,
        },
        textBody: {
            color: textColor || disabled ? "#888" : theme.colors.text,
            fontSize: textSize || 16,
            width: "100%",
            flex: 1,
            textAlignVertical: multiline ? "top" : "center",
            fontWeight: "normal",
            paddingVertical: 10,
            paddingHorizontal: 10,
            zIndex: 1,
            backgroundColor: theme.colors.surface,
        },
        input: {
            backgroundColor: theme.colors.surface,
            borderRadius: 5,
            marginTop: title ? 15 : 5,
            marginBottom: 5,
            width: width || "100%",
            borderWidth: 1,
            borderColor: theme.colors.primary,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        pressableRipple: {
            color: theme.colors.ripple,
            borderless: true,
            radius: 40,
        },
        pressableContainer: {
            padding: 10,
        },
    });

    return (
        <View style={styles.input}>
            {title && <Text style={styles.textTitle}>{title}</Text>}
            <TextInput
                ref={ref}
                value={value}
                onFocus={onFocus}
                onBlur={onFocusLoss}
                placeholder={placeholder}
                placeholderTextColor={disabled ? "#888" : theme.colors.text}
                keyboardType={keyboardType || null}
                editable={(editable === false ? false : true) && !disabled}
                multiline={multiline || false}
                numberOfLines={numOfLines || 1}
                maxLength={maxLength || null}
                onChangeText={onChange}
                secureTextEntry={secureTextEntry || false}
                style={styles.textBody}
                aria-label={title}
                textContentType={textContentType || null}
            />
            {icon ? (
                <View>
                    <Pressable
                        android_ripple={
                            disabled ? null : styles.pressableRipple
                        }
                        style={styles.pressableContainer}
                        onPress={!disabled ? onPressIcon : () => {}}>
                        {icon}
                    </Pressable>
                </View>
            ) : null}
        </View>
    );
});

export default ThemeTextInput;
