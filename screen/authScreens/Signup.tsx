import { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { BLACK, BLUE, RED_COLOR, WHITE, WHITE_10 } from '../../util/color';
import { useInputState, Input } from '../../components/inputs/textInput';
import {
  usePasswordInputState,
  PasswordInput,
} from '../../components/inputs/passwordInput';
import GlobalStyle from '../../util/styles';
import { AuthStackType } from '../../navigations/authNavigation';
import { NavigationContainerProps } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useAppDispatch } from '../../store/hook';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import { config } from '../../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setDetails } from '../../store/reducer/authReducer';
import { useApi } from '../../methods/apiClient';
import { endpoints } from '../../methods/endpoints';

type Props = NativeStackScreenProps<AuthStackType, 'Signup'>;

const SignupScreen = ({ navigation }: Props) => {
  const name = useInputState('');
  const contact = useInputState('');
  const dispatch = useDispatch();
  const { AUTH } = useApi();
  const [loading, setLoading] = useState(false);

  const press = () => navigation?.navigate('OTPScreen');

  const signup = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData?.append('name', name?.value);
      formData?.append('number', contact?.value);
      console.log('signup request obj', formData);
      const res = await AUTH(endpoints?.signup, formData);
      console.log('response', res?.data?.data);
      if (res?.status) {
        console.log('signup successfull', res?.data);
        const formattedUser = {
          token: res.token,
          id: res.data.userId,
          role: res.data.role,
          name: res.data.fullName,
          email: res.data.email ?? '',
          designation: res.data.designation,
          number: res.data.number,
        };

        dispatch(setDetails(formattedUser));
        press();
      } else {
        console.log('Signup failed', res?.message);
      }
    } catch (error) {
      console.log('Error signing up', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        behavior={Platform?.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View style={styles.skipButtonContainer}>
          <Pressable
            style={styles.skipButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={20} color={BLACK} />
          </Pressable>
        </View>
        <View style={styles.container}>
          <Image
            source={require('../../assets/png/logoBlack.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
          <Text
            style={{
              color: RED_COLOR,
              fontWeight: 'bold',
              fontSize: scale(24),
            }}
          >
            Create Account
          </Text>
          <Text
            style={{
              color: BLACK,
              fontSize: scale(10),
              textAlign: 'center',
              marginHorizontal: scale(70),
              marginBottom: scale(40),
              marginTop: scale(10),
            }}
          >
            Enter your phone number or register with your social account to
            continue.
          </Text>
          <ScrollView
            style={{ width: '100%', alignSelf: 'center', marginTop: scale(5) }}
          >
            <View>
              <Text style={{ fontSize: scale(12), color: BLACK }}>
                Enter your full name
              </Text>
              <Input
                inputState={name}
                label={null}
                placeholder="Enter Your Name"
              />
              <Text style={{ fontSize: scale(12), color: BLACK }}>
                Phone No.
              </Text>
              <Input
                inputState={contact}
                label={null}
                placeholder="Enter your phone number."
              />
            </View>
            <Pressable style={GlobalStyle.filedButton} onPress={signup}>
              <Text style={GlobalStyle.filedButtonText}>Register</Text>
            </Pressable>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: scale(100),
            }}
          >
            <Text style={{ color: BLACK, fontSize: scale(10) }}>
              Already have an account?
            </Text>
            <Pressable onPress={() => navigation?.navigate('Login')}>
              {loading ? (
                <ActivityIndicator size={'small'} color={WHITE} />
              ) : (
                <Text
                  style={{
                    marginLeft: scale(5),
                    fontSize: scale(10),
                    color: BLUE,
                    fontWeight: 'bold',
                  }}
                >
                  Sign In
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;

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
    justifyContent: 'flex-start',
    // marginVertical: '5@s',
    marginHorizontal: '7@s',
  },
  skipButton: {
    backgroundColor: WHITE,
    paddingVertical: '10@s',
    paddingHorizontal: '30@s',
  },
  skipButtonText: {
    color: RED_COLOR,
  },
  logo: {
    width: '195@s',
    height: '100@s',
    // marginBottom: "40@s",
    marginVertical: '50@s',
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
  input: {
    flex: 1,
    borderWidth: 2,
    borderRadius: '5@s',
    borderColor: BLACK,
    marginRight: '5@s',
    paddingHorizontal: '10@s',
  },
});
