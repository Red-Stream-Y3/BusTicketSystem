import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from './context/ThemeContext';
import { AppContextProvider } from './context/AppContext';
import StackNavigation from './screens/StackNavigation.jsx';

export default function App() {
  return (
      <ThemeProvider>
          <AppContextProvider>
              <NavigationContainer>
                  <View style={styles.container}>
                      <StackNavigation />
                      <StatusBar style="auto" />
                  </View>
              </NavigationContainer>
          </AppContextProvider>
      </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
