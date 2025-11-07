import { useState, useRef } from 'react';
import { View, Text, Image, Dimensions, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet, scale, } from 'react-native-size-matters';
import { BLACK, BLUE, RED_COLOR, WHITE } from '../../util/color';
import { useInputState, Input } from '../../components/inputs/textInput';
import { usePasswordInputState, PasswordInput } from '../../components/inputs/passwordInput';
import GlobalStyle from '../../util/styles';
import { AuthStackType } from '../../navigations/authNavigation';
import { NavigationContainerProps } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import OTPTextView from 'react-native-otp-textinput';
type Props = NativeStackScreenProps<AuthStackType, 'OTPScreen'>;

const OTPScreen = ({ navigation }: Props) => {

    const phone = useInputState("")
    const name = useInputState("")

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.skipButtonContainer}>
                {/* <Pressable style={styles.skipButton}><Text style={styles.skipButtonText}>SKIP</Text></Pressable> */}
            </View>
            <View style={styles.container}>

                <Image source={require('../../assets/png/logoBlack.png')} style={styles.logo} resizeMode='stretch' />

                <Text style={styles.mainText}>Verify Code</Text>
                <Text style={styles.text}>Please enter the 4 digit code we just sent over sms to 03000000000.</Text>
                <OTPTextView
                    containerStyle={{
                        marginHorizontal:scale(20)
                    }}
                    textInputStyle={{
                        borderRadius:scale(10),
                        borderWidth: scale(4),
                    }}
                    inputCount={4} />
                <View style={styles.signupContainer}>
                    <Pressable style={styles.signupButton}>
                        <Text style={[styles.signupButtonText, { color: BLACK }]}>Didn’t receive OTP? <Text style={styles.signupButtonText}>Resend Code</Text></Text></Pressable>
                </View>
                <Pressable style={[GlobalStyle.filedButton,{marginVertical:scale(40)}]} onPress={()=>navigation.navigate('RegisterScreen')}>
                    <Text style={GlobalStyle.filedButtonText}>Verify</Text>
                </Pressable>

            </View>

        </SafeAreaView>
    );
};

export default OTPScreen;

const styles = ScaledSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        width: "90%",
        backgroundColor: WHITE,
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center"
    }, skipButtonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginVertical: '20@s',
        marginHorizontal: '7@s'
    },
    skipButton: {
        backgroundColor: WHITE,
        paddingVertical: "15@s",
        paddingHorizontal: '30@s'
    },
    skipButtonText: {
        color: RED_COLOR
    },
    logo: {
        width: "195@s",
        height: "100@s",
        marginBottom: "40@s"
    },
    mainText: {
        fontSize: "24@s",
        fontWeight: 'bold',
        color: "black",
        marginVertical: '10@s'
    },
    text: {
        fontSize: "12@s",
        fontWeight: '300',
        color: "black",
        marginVertical: '5@s'
    },
    forgotContainer: {
        flexDirection: "row",
        width: "100%",
        alignSelf: "center",
        justifyContent: "flex-end",
    },
    forgotButton: {
        backgroundColor: WHITE,
        paddingVertical: "5@s",
        paddingHorizontal: '10@s'
    },
    forgotButtonText: {
        color: BLUE
    },
    signupContainer: {
        flexDirection: "row",
        width: "100%",
        alignSelf: "center",
        marginVertical: '10@s',
        justifyContent: 'center',
    },
    signupButton: {
        backgroundColor: WHITE,
        paddingVertical: "5@s",
        paddingHorizontal: '10@s'
    },
    signupButtonText: {
        color: BLUE
    },
    roundedTextInput: {
        borderRadius: "10@s",
        borderWidth: "4@s",
    },
    textInputContainer: {
        marginVertical: '40@s',
    },

});
