
import React, { useEffect, useState } from 'react';
import { LayoutAnimation, Platform, Text, TextInput } from 'react-native'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import SplashScreenNavigator from './navigations/splash';
import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from './store/hook';
import AuthScreenNavigator from './navigations/authNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BLACK } from './util/color';
import DrawerNavigation from './navigations/drawerNavigation';
import RootNavigator from './navigations/rootNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean, color?: string };
}
interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean, color?: string };
}





const AppUI = () => {
  const [splashShown, setSplashShow] = useState(true)
  const auth = useAppSelector(state => state.auth)
  useEffect(() => {
    ((Text as unknown) as TextWithDefaultProps).defaultProps = ((Text as unknown) as TextWithDefaultProps).defaultProps || {};
    ((Text as unknown) as TextWithDefaultProps).defaultProps!.allowFontScaling = false;
    ((Text as unknown) as TextWithDefaultProps).defaultProps!.color = BLACK;
    ((TextInput as unknown) as TextInputWithDefaultProps).defaultProps = ((TextInput as unknown) as TextInputWithDefaultProps).defaultProps || {};
    ((TextInput as unknown) as TextInputWithDefaultProps).defaultProps!.allowFontScaling = false;
    ((TextInput as unknown) as TextInputWithDefaultProps).defaultProps!.color = BLACK
    setTimeout(() => {
      console.log("timeout runs")
      LayoutAnimation.easeInEaseOut()
      setSplashShow(false)
    }, 4000)
    // return (
    //   clearTimeout(timeout)
    // )
  }, [])
  console.log("splash Screen", splashShown)
  return <RootNavigator splashShown={splashShown} />;
}

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

    <SafeAreaProvider style={{marginTop:Platform.OS === 'ios' ?50:0}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppUI />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
    </GestureHandlerRootView>

  );
}



export default App;
