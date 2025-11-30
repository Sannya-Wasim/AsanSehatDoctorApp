// RootNavigator.tsx  (or inside App.tsx)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// EditProfile component (move here)
import EditProfile from '../screen/authScreens/EditProfile';
import SplashScreenNavigator from './splash';
import AuthScreenNavigator from './authNavigation';
import DrawerNavigation from './drawerNavigation';
import { CommonActions } from '@react-navigation/native';


// types (adjust/add other screens as needed)
export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;   // stack navigator
  App: undefined;    // drawer navigator
  EditProfile: {
    auth : boolean
  };
  // add other top-level screens if needed
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

type Props = {
  splashShown: boolean;
};

export default function RootNavigator({ splashShown }: Props) {
  // Decide initial route based on splash/auth which you had earlier in App.tsx
  // We'll render a stack where Auth and App are child navigators.
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {splashShown ? (
          // If you have a splash stack navigator
          <RootStack.Screen name="Splash" component={SplashScreenNavigator} />
        ) : (
          <>
            {/* Auth stack (login, signup, etc) */}
            <RootStack.Screen name="Auth" component={AuthScreenNavigator} />

            {/* Main App (drawer) */}
            <RootStack.Screen name="App" component={DrawerNavigation} />

            {/* Make EditProfile a top-level screen so any child can navigate to it */}
            <RootStack.Screen name="EditProfile" component={EditProfile} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
