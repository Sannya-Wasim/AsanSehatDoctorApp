import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screen/authScreens/Login';
import SignupScreen from '../screen/authScreens/Signup';
import OTPScreen from '../screen/authScreens/OTP';

import PasswordScreen from '../screen/authScreens/PasswordScreen';
import EditProfile from '../screen/authScreens/EditProfile';
import UploadPicture from '../screen/authScreens/UploadPicture';

export type AuthStackType = {
    Login: undefined,
    Signup: undefined,
    OTPScreen:undefined,
    RegisterScreen:undefined,
    PasswordScreen:undefined,
    EditProfile : undefined,
    UploadPicture : undefined
};


const Stack = createNativeStackNavigator<AuthStackType>();

export default function AuthScreenNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OTPScreen" component={OTPScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PasswordScreen" component={PasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
            <Stack.Screen name="UploadPicture" component={UploadPicture} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}