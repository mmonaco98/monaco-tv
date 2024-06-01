import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteNames } from './src/enums/navigation';
import { SplashPage } from './src/pages/SplashPage';
import { HomePage } from './src/pages/HomePage';
import { PlayerPage } from './src/pages/PlayerPage';
import { LoginPage } from './src/pages/LoginPage';
import { SignInPage } from './src/pages/SignInPage';
import { DetailPage } from './src/pages/DetailPage';

const Stack = createNativeStackNavigator();

export default function App() {
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
                <Stack.Screen
                    name={RouteNames.LoginPage}
                    component={LoginPage}
                />
                <Stack.Screen
                    name={RouteNames.SignInPage}
                    component={SignInPage}
                />
                <Stack.Screen
                    name={RouteNames.DetailPage}
                    component={DetailPage}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
