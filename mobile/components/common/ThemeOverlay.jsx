import React from 'react';
import { StyleSheet, View, Modal, Pressable } from 'react-native';

const ThemeOverlay = ({ visible, children, onPressBg }) => {
    return (
        <Modal 
            visible={visible} 
            animationType='fade'
            transparent 
            onRequestClose={onPressBg}>
            <Pressable style={styles.overlay} onPressOut={onPressBg}>
                <View>
                    {children}
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ThemeOverlay;
