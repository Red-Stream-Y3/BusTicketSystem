import React from "react";
import { StyleSheet, View, Modal, Pressable } from "react-native";

const ThemeOverlay = ({ visible, children, onPressBg }) => {
    return (
        <Modal
            visible={visible}
            animationType='fade'
            transparent
            onRequestClose={onPressBg}>
            <Pressable style={styles.overlay} onPressOut={onPressBg} />
            <View style={styles.itemContainer}>{children}</View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    itemContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default ThemeOverlay;
