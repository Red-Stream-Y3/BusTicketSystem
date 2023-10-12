import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import getThemeContext from '../context/ThemeContext';

const SplashScreen = () => {
    const { theme } = getThemeContext();
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        color: theme.colors.text,
    },
});

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/splash.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Bus Ticket System</Text>
        </View>
    );
};

export default SplashScreen;
