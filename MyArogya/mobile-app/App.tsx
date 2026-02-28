import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import DoctorProfileScreen from './src/screens/DoctorProfileScreen';
import BookingScreen from './src/screens/BookingScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'MyArogya' }} />
                <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} options={{ title: 'Doctor Profile' }} />
                <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Book Appointment' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
