import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteNames } from './src/enums/navigation';
import { SplashPage } from './src/pages/SplashPage';


const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName={RouteNames.SplashPage} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={RouteNames.SplashPage} component={SplashPage} />
      </Stack.Navigator>
    </NavigationContainer>
  
 
  );
}


