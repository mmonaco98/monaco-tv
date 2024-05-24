import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteNames } from './src/enums/navigation';
import { SplashPage } from './src/pages/SplashPage';
import { useStore } from './src/stores/appStores';
import { useEffect } from 'react';
import { HomePage } from './src/pages/HomePage';
import { PlayerPage } from './src/pages/PlayerPage';

const Stack = createNativeStackNavigator();

export default function App() {
    const updateUser = useStore((state) => state.updateUserInfo);

    useEffect(() => {
        updateUser('Marco');
    });

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={RouteNames.SplashPage}
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen
                    name={RouteNames.SplashPage}
                    component={SplashPage}
                />
                <Stack.Screen name={RouteNames.HomePage} component={HomePage} />
                <Stack.Screen
                    name={RouteNames.PlayerPage}
                    component={PlayerPage}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
