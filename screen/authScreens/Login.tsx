import { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  TextInput,
  ToastAndroid,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { BLACK, BLUE, RED_COLOR, WHITE } from '../../util/color';
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
import { setSigin } from '../../store/reducer/authReducer';
import { config } from '../../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Props = NativeStackScreenProps<AuthStackType, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const emailOrNumber = useInputState('');
  const password = usePasswordInputState('');
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const validateEmailOrPhone = (input: string) => {
    if (!input) {
      ToastAndroid.show(
        'Please enter email or phone number',
        ToastAndroid.BOTTOM,
      );
      return null;
    }

    const isNumber = /^[0-9]+$/.test(
      input.replace(/^\+92/, '').replace(/^0/, ''),
    );

    if (isNumber) {
      // Normalize Pakistani phone number
      let normalizedNumber = input;
      if (input.startsWith('+92')) normalizedNumber = input.slice(3);
      if (input.startsWith('0')) normalizedNumber = input.slice(1);

      // Validate number format: should start with 3 and be 10 digits (03XXYYYYYYY)
      if (!/^3\d{9}$/.test(normalizedNumber)) {
        ToastAndroid.show('Invalid Pakistani phone number', ToastAndroid.SHORT);
        return null;
      }

      return { type: 'phone', value: normalizedNumber };
    } else {
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input)) {
        ToastAndroid.show('Invalid email format', ToastAndroid.SHORT);
        return null;
      }

      return { type: 'email', value: input };
    }
  };

  const login = async () => {
    setLoading(true);
    try {
      const validated = validateEmailOrPhone(emailOrNumber?.value?.trim());
      if (!validated)
        return ToastAndroid?.show(
          'Incorrect number or email',
          ToastAndroid?.BOTTOM,
        );
      console.log('email or phone', validated);
      const formData = new FormData();
      if (validated?.type === 'email') {
        formData.append('email', validated?.value);
      } else {
        formData.append('number', validated?.value);
      }
      formData?.append('password', password?.value);
      const res = await axios.post(`${config?.baseUrl}/login/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // "Authorization": `Bearer ${token}`
        },
      });
      if (res?.data?.status) {
        console.log('Logged in successfully', res?.data);
        AsyncStorage?.setItem('userId', res?.data?.data?.userId);
        AsyncStorage?.setItem('token', res?.data?.token);
        await AsyncStorage?.setItem('isLogin', 'true')
        dispatch(setSigin(true));
      } else {
        console.log('Login failed', res?.data?.message);
      }
    } catch (error) {
      console.log('Error loggging in', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        behavior={Platform?.OS === 'ios' ? 'height' : 'padding'}
      >
        <View style={styles.skipButtonContainer}>
          {/* <Pressable style={styles.skipButton} onPress={()=>dispatch(setAuthSkiped(true))}><Text style={styles.skipButtonText}>SKIP</Text></Pressable> */}
        </View>
        <View style={styles.container}>
          <Image
            source={require('../../assets/png/logoBlack.png')}
            style={styles.logo}
            resizeMode="stretch"
          />

          <Text style={styles.mainText}>Login</Text>
          <Text style={styles.text}>
            Hi, Welcome Back, please log in to continue.
          </Text>
          <Input
            inputState={emailOrNumber}
            label="Email Address/Phone No."
            placeholder="Enter email or phone"
            inputStyle={{ color: 'black' }}
          />

          <PasswordInput
            inputState={password}
            label={'Password'}
            placeholder="Enter Password Here"
          />
          <View style={styles.forgotContainer}>
            <Pressable style={styles.forgotButton}>
              <Text style={styles.forgotButtonText}>Forgot Password?</Text>
            </Pressable>
          </View>
          {loading ? (
            <ActivityIndicator size={'small'} color={WHITE}/>
          ) : (
            <Pressable style={GlobalStyle.filedButton} onPress={() => login()}>
              <Text style={GlobalStyle.filedButtonText}>Log In</Text>
            </Pressable>
          )}
          <View style={styles.signupContainer}>
            <Pressable
              style={styles.signupButton}
              onPress={() => navigation.navigate('Signup')}
            >
              <Text style={[styles.signupButtonText, { color: BLACK }]}>
                Don’t have an account?{' '}
                <Text style={styles.signupButtonText}>Sign Up</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = ScaledSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
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
    color: 'black',
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
