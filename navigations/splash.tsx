import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screen/splash';

const Stack = createNativeStackNavigator();


export default function SplashScreenNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}