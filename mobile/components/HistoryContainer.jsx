import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import getThemeContext from '../context/ThemeContext';
import { getAppContext } from '../context/AppContext';

const HistoryContainer = ({ data }) => {
    const { theme } = getThemeContext();
    const { SERVER_URL, USER } = getAppContext();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.surface,
            marginHorizontal: 10,
            padding: 10,
        },
        title: { 
            fontSize: 24, 
            fontWeight: 'bold', 
            marginBottom: 10 
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>History</Text>
            <FlatList
                data={history}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={{ paddingVertical: 10 }}>
                        <Text>{item.title}</Text>
                        <Text>{item.date}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default HistoryContainer;
