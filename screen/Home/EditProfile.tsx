import { useState, useRef, useCallback } from 'react';
import { View, Text, Image, Dimensions, Pressable, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet, scale, } from 'react-native-size-matters';
import { BLACK, BLUE, RED_COLOR, WHITE, WHITE_10 } from '../../util/color';
import { useInputState, Input } from '../../components/inputs/textInput';
import { usePasswordInputState, PasswordInput } from '../../components/inputs/passwordInput';
import GlobalStyle from '../../util/styles';
import { AuthStackType } from '../../navigations/authNavigation';
import { NavigationContainerProps } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch } from '../../store/hook';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../../navigations/drawerNavigation';
import { AllHeader } from '../../components/header';

type Props = DrawerScreenProps<DrawerParamList, 'EditProfile'>;

const EditProfile = ({ navigation }: Props) => {
    const name = useInputState("")
    const email = useInputState('')
    const age = useInputState('')
    const experince = useInputState('')
    const fee = useInputState('')
    const about = useInputState('')
    const specialties = useInputState('')
    const [response, setResponse] = useState<any>(null);
    // on Button Press add degress and certificates
    const [degrees, setDegrees] = useState<{ degree: string, image: any }[]>([{ degree: "", image: null }])
    const onButtonPress = useCallback((type: String, options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions) => {
        if (type === 'capture') {
            ImagePicker.launchCamera(options, setResponse);
        } else {
            ImagePicker.launchImageLibrary(options, setResponse);
        }
    }, []);
    const onButtonPressDegree = useCallback((type: String, options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions, index: number) => {
        if (type === 'capture') {
            ImagePicker.launchCamera(options, (data) => setDegrees(prev => prev.map((item, i) => i === index ? { ...item, image: data } : item)))
        } else {
            ImagePicker.launchCamera(options, (data) => setDegrees(prev => prev.map((item, i) => i === index ? { ...item, image: data } : item)))
        }
    }, []);
    // array of days with is selected or not selected useStates {name,isSelected}
    const [days, setDays] = useState([
        { name: "Monday", isSelected: false },
        { name: "Tuesday", isSelected: false },
        { name: "Wednesday", isSelected: false },
        { name: "Thursday", isSelected: false },
        { name: "Friday", isSelected: false },
        { name: "Saturday", isSelected: false },
        { name: "Sunday", isSelected: false },
    ])
    // array of time with is selected or not selected useStates {name,isSelected} 3 hr slots 09:00-12:00, 12:00-03:00, 03:00-06:00
    const [time, setTime] = useState([
        { name: "09:00-12:00", isSelected: false },
        { name: "12:00-03:00", isSelected: false },
        { name: "03:00-06:00", isSelected: false },
        { name: "06:00-09:00", isSelected: false },
        { name: "09:00-12:00", isSelected: false }
    ])


    return (
        <SafeAreaView style={styles.mainContainer}>
            <AllHeader navigate={() => navigation.navigate('Help')} back={() => navigation.goBack()} title={'Edit Profile'} />
            <View style={styles.container}>
                <ScrollView style={{ width: "100%", alignSelf: "center", marginTop: scale(5) }}>
                    <View>

                        <Text style={{ fontSize: scale(16), color: BLACK }}>Edit Personal Information</Text>
                        <Input inputState={name} label={null} placeholder='Enter Your Name' />
                        <Input inputState={email} label={null} placeholder='Enter Your Email' />
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TextInput style={styles.input} {...age} keyboardType='number-pad' placeholder='Age' />
                            <TextInput style={styles.input} {...experince} keyboardType='number-pad' placeholder='Experience' />
                            <TextInput style={styles.input} {...fee} keyboardType='number-pad' placeholder='Fee' />
                        </View>
                        <Input multiline={true} inputState={about} label={null} placeholder='About' />
                        <Input inputState={specialties} label={null} placeholder='Specialties' />
                        {degrees.map((item, index) => (
                            <View key={index} style={{ flexDirection: "row", alignItems: "center", marginVertical: scale(5) }}>
                                {
                                    degrees.length > 1 && <Pressable style={{ backgroundColor: RED_COLOR, padding: scale(5), borderRadius: scale(5) }} onPress={() => setDegrees(prev => prev.filter((item, i) => i !== index))}><Icon name="trash" size={20} color={WHITE} /></Pressable>
                                }
                                <TextInput style={styles.input} placeholder='Degree' value={item.degree} onChangeText={text => setDegrees(prev => prev.map((item, i) => i === index ? { ...item, degree: text } : item))} />
                                <Pressable onPress={() => onButtonPressDegree("library", {
                                    selectionLimit: 0,
                                    mediaType: 'photo',
                                    includeBase64: false,
                                    includeExtra: true,
                                }, index)} style={{ flex: 1, backgroundColor: WHITE_10, borderWidth: 1, borderColor: BLACK, alignItems: "center", justifyContent: "center", paddingVertical: scale(10), borderRadius: scale(5) }}><Text>Upload</Text></Pressable>
                            </View>
                        ))}
                        <Pressable style={{ marginVertical: scale(10), flexDirection: "row", alignItems: "center" }} onPress={() => setDegrees([...degrees, { degree: "", image: null }])}>
                            <Icon name="plus-circle" size={20} color={BLACK} />
                            <Text style={{ marginLeft: scale(10) }}>Add another degree</Text>
                        </Pressable>

                        <Text style={{ fontSize: scale(16), color: BLACK }}>Availbility</Text>
                        <Text style={{ fontSize: scale(10), color: BLACK }}>Select your days of availability</Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {days.map((item, index) => (
                                <Pressable key={index} style={{ backgroundColor: item.isSelected ? RED_COLOR : WHITE, borderWidth: 1, borderColor: RED_COLOR, borderRadius: scale(5), flexBasis: "30%", marginVertical: scale(5), marginHorizontal: scale(4), alignContent: "center", justifyContent: "center", paddingVertical: scale(5) }} onPress={() => setDays(prev => prev.map((item, i) => i === index ? { ...item, isSelected: !item.isSelected } : item))}><Text style={{ color: item.isSelected ? WHITE : BLACK, textAlign: "center" }}>{item.name}</Text></Pressable>
                            ))}
                        </View>

                        <Text style={{ fontSize: scale(10), color: BLACK, marginVertical: scale(10) }}>Select your Available slots</Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {time.map((item, index) => (
                                <Pressable key={index} style={{ backgroundColor: item.isSelected ? RED_COLOR : WHITE, borderWidth: 1, borderColor: RED_COLOR, borderRadius: scale(5), flexBasis: "30%", marginVertical: scale(5), marginHorizontal: scale(4), alignContent: "center", justifyContent: "center", paddingVertical: scale(5) }} onPress={() => setDays(prev => prev.map((item, i) => i === index ? { ...item, isSelected: !item.isSelected } : item))}><Text style={{ color: item.isSelected ? WHITE : BLACK, textAlign: "center" }}>{item.name}</Text></Pressable>
                            ))}
                        </View>

                        <Pressable style={GlobalStyle.outlinedButton} onPress={() => onButtonPress("library", {
                            selectionLimit: 0,
                            mediaType: 'photo',
                            includeBase64: false,
                            includeExtra: true,
                        })}>
                            <Text style={GlobalStyle.outlinedButtonText}>Upload Picture</Text>
                        </Pressable>
                    </View>
                    <Pressable style={GlobalStyle.filedButton} onPress={()=>navigation.navigate('Profile')}>
                        <Text style={GlobalStyle.filedButtonText}>Save</Text>
                    </Pressable>
                    <View style={{ height: scale(100) }} />
                </ScrollView>
            </View>

        </SafeAreaView>
    );
};

export default EditProfile;

const styles = ScaledSheet.create({
    mainContainer: {
        backgroundColor: '#fff',
        height: Dimensions.get('screen').height
    },
    container: {
        width: "90%",
        backgroundColor: '#fff',
        alignSelf: "center",
        marginTop: '50@s'

    }, skipButtonContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        // marginVertical: '5@s',
        marginHorizontal: '7@s'
    },
    skipButton: {
        backgroundColor: WHITE,
        paddingVertical: "10@s",
        paddingHorizontal: '30@s'
    },
    skipButtonText: {
        color: RED_COLOR
    },
    logo: {
        width: "195@s",
        height: "100@s",
        // marginBottom: "40@s",
        marginVertical: '50@s',
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
    input: { flex: 1, borderWidth: 2, borderRadius: '5@s', borderColor: BLACK, marginRight: '5@s', paddingHorizontal: '10@s' }
});
