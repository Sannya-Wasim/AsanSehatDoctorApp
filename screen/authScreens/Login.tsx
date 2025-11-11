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

  const sanitizePakPhone = (input: string) => {
    if (!input) return '';

    let phone = input;

    // Convert Arabic-Indic numerals to standard digits
    phone = phone.replace(/[٠-٩]/g, d =>
      String.fromCharCode(d.charCodeAt(0) - 1632),
    );

    // Remove all non-digit characters
    phone = phone.replace(/[^0-9+]/g, '');

    // Handle country code +92
    if (phone.startsWith('0092')) phone = '+' + phone.slice(2); // 0092 -> +92
    if (phone.startsWith('0') && !phone.startsWith('00'))
      phone = '+92' + phone.slice(1); // 0XXXXXXXXX -> +92XXXXXXXXX
    if (phone.startsWith('92') && !phone.startsWith('+')) phone = '+' + phone; // 92XXXXXXXXX -> +92XXXXXXXXX

    // Keep only first 13 chars (+92XXXXXXXXX)
    phone = phone.slice(0, 13);

    return phone;
  };

  const login = async () => {
    try {
      let filteredInput = emailOrNumber?.value || '';

      if (/^\d/.test(filteredInput)) {
        // Phone number
        filteredInput = filteredInput
          .replace(/[٠-٩]/g, d => String.fromCharCode(d.charCodeAt(0) - 1632))
          .replace(/[^0-9]/g, '');
      } else {
        // Email
        filteredInput = filteredInput.replace(/[^A-Za-z0-9@._-]/g, '');
      }

      const formData = new FormData();
      formData.append('emailOrNumber', filteredInput);
      formData?.append('password', password?.value);
      // const token = AsyncStorage?.getItem('token')
      // console.log("login request obj", formData)
      // const res = await axios.post(`${config?.baseUrl}/login/login`, formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     // "Authorization": `Bearer ${token}`
      //   },
      // });
      // if (res?.data?.status) {
      //   console.log('Logged in successfully', res?.data);
      //   AsyncStorage?.setItem('userId', res?.data?.data?.userId);
      //   AsyncStorage?.setItem('token', res?.data?.token);
      //   // await AsyncStorage?.setItem('isLogin', 'true')
      //   dispatch(setSigin(true));
      // } else {
      //   console.log('Login failed', res?.data?.message);
      // }
      console.log('emailOrNumber', emailOrNumber);
    } catch (error) {
      console.log('Error loggging in', error);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
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
          onChangeText={text => {
            let filteredText = text;

            // Check if input starts with a digit or plus → treat as phone number
            if (/^\d|\+/.test(filteredText)) {
              filteredText = sanitizePakPhone(filteredText);
            }
            // else treat as email → leave as is
            else {
              // Email
              filteredText = filteredText.replace(/[^A-Za-z0-9@._-]/g, '');
            }
            // Update the state
            emailOrNumber?.onChangeText(filteredText);
          }}
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
        <Pressable style={GlobalStyle.filedButton} onPress={() => login()}>
          <Text style={GlobalStyle.filedButtonText}>Log In</Text>
        </Pressable>
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
    </SafeAreaView>
  );
};

export default LoginScreen;

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
