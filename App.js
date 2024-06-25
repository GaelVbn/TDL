import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import { tasks } from './reducers/Tasks';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
 reducer: { tasks },
});

const TabNavigator = () => {
 return (
   <Tab.Navigator screenOptions={{ headerShown: false }}>
     <Tab.Screen name="Home" component={HomeScreen} />
   </Tab.Navigator>
 );
}

export default function App() {
 return (
  <Provider store={store}>
   <NavigationContainer>
     <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="TabNavigator" component={TabNavigator} />
     </Stack.Navigator>
   </NavigationContainer>
  </Provider>
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
