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
import { AuthStackType } from '../../navigations/authNavigation';
import { NavigationContainerProps } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import OTPTextView from 'react-native-otp-textinput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
type Props = NativeStackScreenProps<AuthStackType, 'OTPScreen'>;

const OTPScreen = ({ navigation }: Props) => {
  const phone = useInputState('');
  const name = useInputState('');
  const user = useSelector((state : RootState) => state?.auth?.user)

  const press = async () => {
    console.log('user id', user?.id);
    console.log('token', user?.token);
    navigation.navigate('PasswordScreen')
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        {/* --- Your Content --- */}
        <Image
          source={require('../../assets/png/logoBlack.png')}
          style={styles.logo}
          resizeMode="stretch"
        />

        <Text style={styles.mainText}>Verify Code</Text>
        <Text style={styles.text}>
          Please enter the 4 digit code we just sent over sms to{' '}
          <Text style={{ fontWeight: 'bold' }}>03000000000</Text>.
        </Text>

        <OTPTextView
          containerStyle={{
            marginHorizontal: scale(20),
          }}
          textInputStyle={{
            borderRadius: scale(10),
            borderWidth: scale(4),
          }}
          inputCount={4}
        />

        <View style={styles.signupContainer}>
          <Pressable style={styles.signupButton}>
            <Text style={[styles.signupButtonText, { color: BLACK }]}>
              Didn’t receive OTP?{' '}
              <Text
                style={[
                  styles.signupButtonText,
                  { fontWeight: 'bold', marginTop: 20 },
                ]}
              >
                Resend Code
              </Text>
            </Text>
          </Pressable>
        </View>

        <Pressable
          style={[GlobalStyle.filedButton, { marginVertical: scale(40) }]}
          onPress={press}
        >
          <Text style={GlobalStyle.filedButtonText}>Verify</Text>
        </Pressable>
      </View>

      {/* --- Footer --- */}
      <View style={styles.footer}>
        <Text style={{ fontSize: scale(12) }}>Supported by Hands Pakistan</Text>
        <Text>Copyright Asaan Sehat. All Rights Reserved.</Text>
      </View>
    </SafeAreaView>
  );
};

export default OTPScreen;

const styles = ScaledSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between', // 👈 this pushes footer to bottom
  },
  container: {
    width: '90%',
    marginTop: scale(40),
    backgroundColor: WHITE,
    alignItems: 'center',
    alignSelf: 'center',
    flexGrow: 1, // ensures content takes space flexibly
  },
  footer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: scale(80), // some breathing room above the safe area bottom
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
    marginHorizontal: scale(60),
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
    // flexDirection: 'row',
    alignItems: 'center',
    // width: '100%',
    alignSelf: 'center',
    marginVertical: '10@s',
    justifyContent: 'center',
    marginHorizontal: scale(80),
  },
  signupButton: {
    backgroundColor: WHITE,
    paddingVertical: '5@s',
    paddingHorizontal: '10@s',
  },
  signupButtonText: {
    color: BLUE,
    textAlign: 'center',
  },
  roundedTextInput: {
    borderRadius: '10@s',
    borderWidth: '4@s',
  },
  textInputContainer: {
    marginVertical: '40@s',
  },
});
