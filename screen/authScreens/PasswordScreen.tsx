import { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { BLACK, BLUE, RED_COLOR, WHITE } from '../../util/color';
import PhoneInput from 'react-native-phone-number-input';
import { useInputState, Input } from '../../components/inputs/textInput';
import {
  usePasswordInputState,
  PasswordInput,
} from '../../components/inputs/passwordInput';
import GlobalStyle from '../../util/styles';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { AuthStackType } from '../../navigations/authNavigation';
import { useAppDispatch } from '../../store/hook';
import { setAuthSkiped } from '../../store/reducer/authReducer';
type Props = NativeStackScreenProps<AuthStackType, 'PasswordScreen'>;

const PasswordScreen = ({ navigation }: Props) => {
  const password = usePasswordInputState('');
  const confirmPassword = usePasswordInputState('');
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.skipButtonContainer}>
        {/* <Pressable style={styles.skipButton}><Text style={styles.skipButtonText}>SKIP</Text></Pressable> */}
      </View>
      <View style={styles.container}>
        <Image
          source={require('../../assets/png/logoBlack.png')}
          style={styles.logo}
          resizeMode="stretch"
        />

        <Text style={styles.mainText}>Set Password</Text>
        <Text style={styles.text}>Set a password for your account</Text>
        <PasswordInput
          inputState={password}
          label={'Password'}
          placeholder="Enter Password Here"
        />
        <PasswordInput
          inputState={confirmPassword}
          label={'Confirm Password'}
          placeholder="Enter Password Here"
        />

        <Pressable
          style={[GlobalStyle.filedButton, { marginTop: scale(40) }]}
          onPress={() => dispatch(setAuthSkiped(true))}
        >
          <Text style={GlobalStyle.filedButtonText}>Create Account</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default PasswordScreen;

const styles = ScaledSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    width: '90%',
    backgroundColor: WHITE,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  skipButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: '20@s',
    marginHorizontal: '7@s',
  },
  skipButton: {
    backgroundColor: WHITE,
    paddingVertical: '15@s',
    paddingHorizontal: '30@s',
  },
  skipButtonText: {
    color: RED_COLOR,
  },
  logo: {
    width: '195@s',
    height: '100@s',
    marginBottom: '40@s',
  },
  mainText: {
    fontSize: '24@s',
    fontWeight: 'bold',
    color: RED_COLOR,
    marginVertical: '10@s',
  },
  text: {
    fontSize: '12@s',
    fontWeight: '300',
    color: 'black',
    marginVertical: '5@s',
    textAlign: 'center',
  },
  forgotContainer: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  forgotButton: {
    backgroundColor: WHITE,
    paddingVertical: '5@s',
    paddingHorizontal: '10@s',
  },
  forgotButtonText: {
    color: BLUE,
  },
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    marginVertical: '10@s',
    justifyContent: 'center',
  },
  signupButton: {
    backgroundColor: WHITE,
    paddingVertical: '5@s',
    paddingHorizontal: '10@s',
  },
  signupButtonText: {
    color: BLUE,
  },
});
