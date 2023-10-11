import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HomeContainer } from '../components';
import getThemeContext from '../context/ThemeContext';

function HomeScreen({ navigation }) {
    const { theme } = getThemeContext();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: theme.colors.background,
        },
    });
    
    return (
        <View style={styles.container}>
            <HomeContainer navigation={navigation} />
        </View>
    );
}

export default HomeScreen;
