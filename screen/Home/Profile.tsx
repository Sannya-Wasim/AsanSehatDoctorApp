import { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, Pressable, ScrollView, TextInput, StatusBar } from 'react-native';
import { ScaledSheet, scale, } from 'react-native-size-matters';
import { AllHeader } from '../../components/header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { Input, useInputState } from '../../components/inputs/textInput';
import { BLACK, RED_COLOR, WHITE, WHITE_10 } from '../../util/color';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'react-native-image-picker';
import GlobalStyle from '../../util/styles';
import { DrawerParamList } from '../../navigations/drawerNavigation';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

// type Props = NativeStackScreenProps<HomeStackScreenType, 'MainHomeScreen'> & DrawerScreenProps<RootDrawerType>;
type StackProps = DrawerScreenProps<DrawerParamList, 'Profile'>;


const Profile = ({ navigation }: StackProps) => {
    const [days, setDays] = useState([
        { name: "Monday", isSelected: true },
        { name: "Tuesday", isSelected: true },
        { name: "Wednesday", isSelected: true },
        { name: "Thursday", isSelected: true },
        { name: "Friday", isSelected: true },
        { name: "Saturday", isSelected: true },
        { name: "Sunday", isSelected: false },
    ])
    // array of time with is selected or not selected useStates {name,isSelected} 3 hr slots 09:00-12:00, 12:00-03:00, 03:00-06:00
    const [time, setTime] = useState([
        { name: "09:00-12:00", isSelected: true },
        { name: "12:00-03:00", isSelected: true },
        { name: "03:00-06:00", isSelected: true },
        { name: "06:00-09:00", isSelected: false },
        { name: "09:00-12:00", isSelected: true }
    ])
    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={RED_COLOR} />
            <View style={{ backgroundColor: RED_COLOR, width: Dimensions.get('screen').width, paddingVertical: 10, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Pressable onPress={() => navigation.goBack()} style={{ paddingVertical: 10, paddingHorizontal: 10 }}><Icon name='arrow-left' size={scale(15)} color={WHITE} /></Pressable>
            </View>
            <View style={{ width: Dimensions.get('screen').width, borderBottomEndRadius: scale(20), borderBottomStartRadius: scale(20), backgroundColor: RED_COLOR, alignContent: "center", alignItems: "center" }}>
                <Image source={require('../../assets/png/doctorImage.png')} style={{ width: scale(166), borderRadius: scale(10), height: scale(166), marginTop: -scale(50) }} />
                <Text style={{ color: WHITE, textAlign: "center", fontSize: scale(18), marginVertical: scale(5) }}>Dr. Sultan Ahmed</Text>
                <Text style={{ color: WHITE, textAlign: "center", fontSize: scale(14), marginVertical: scale(5) }}>Psychiatrist</Text>
                <Text style={{ color: WHITE, textAlign: "center", fontSize: scale(14), marginVertical: scale(5) }}>MA, PhD, PsyD, EdD</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: scale(20) }}>
                <View style={{ flex: 1, marginHorizontal: scale(5) }}>
                    <View style={{ backgroundColor: 'rgba(238,33,37,0.3)', alignItems: "center", padding: scale(15), borderRadius: scale(100) }}>
                        <Icon name="video" size={scale(40)} color={RED_COLOR} />
                    </View>
                    <Text style={{ textAlign: "center", color: BLACK, fontSize: scale(14), fontWeight: 'bold' }}>Rs. 400</Text>
                    <Text style={{ textAlign: "center", color: BLACK, fontSize: scale(8) }}>Fees</Text>
                </View>
                <View style={{ flex: 1, marginHorizontal: scale(5) }}>
                    <View style={{ backgroundColor: 'rgba(11,149,122,0.3)', alignItems: "center", padding: scale(15), borderRadius: scale(100) }}>
                        <Icon name="award" size={scale(40)} color={'#0B957A'} />
                    </View>
                    <Text style={{ textAlign: "center", color: BLACK, fontSize: scale(14), fontWeight: 'bold' }}>12 Years</Text>
                    <Text style={{ textAlign: "center", color: BLACK, fontSize: scale(8) }}>Experience</Text>
                </View>

                <View style={{ flex: 1, marginHorizontal: scale(5) }}>
                    <View style={{ backgroundColor: 'rgba(233,133,3,0.3)', alignItems: "center", padding: scale(15), borderRadius: scale(100) }}>
                        <MaterialIcon name="emoticon-happy-outline" size={scale(40)} color={'#0D5495'} />
                    </View>
                    <Text style={{ textAlign: "center", color: BLACK, fontSize: scale(14), fontWeight: 'bold' }}>175+</Text>
                    <Text style={{ textAlign: "center", color: BLACK, fontSize: scale(8) }}>Patients</Text>
                </View>
                <View style={{ flex: 1, marginHorizontal: scale(5) }}>
                    <View style={{ backgroundColor: 'rgba(18,86,161,0.3)', alignItems: "center", padding: scale(15), borderRadius: scale(100) }}>
                        <MaterialIcon name="cash" size={scale(40)} color={'#0D5495'} />
                    </View>
                    <Text style={{ textAlign: "center", color: BLACK, fontSize: scale(14), fontWeight: 'bold' }}>18,000</Text>
                    <Text style={{ textAlign: "center", color: BLACK, fontSize: scale(8) }}>Earnings</Text>
                </View>
            </View>
            <ScrollView style={{marginTop:scale(10)}}>
                <View style={{ width: "90%", alignSelf: "center" }}>
                    <Text style={{ fontSize: scale(14), color: BLACK, marginVertical: scale(10) }}>About Doctor</Text>
                    <Text style={{ fontSize: scale(10), color: BLACK, marginVertical: scale(10) }}>Hello, I'm Dr. Sultan Ahmed. With over 15 years of experience in Psychiatrist, I'm here to provide you with personalized, patient-centered care. I believe in strong doctor-patient relationships, and my commitment to your well-being is unwavering. Beyond my practice,</Text>
                    <Text style={{ fontSize: scale(16), color: BLACK }}>Availbility</Text>
                    <Text style={{ fontSize: scale(10), color: BLACK }}>Days of availability</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {days.map((item, index) => (
                            <Pressable key={index} style={{ backgroundColor: item.isSelected ? RED_COLOR : WHITE, borderWidth: 1, borderColor: RED_COLOR, borderRadius: scale(5), flexBasis: "30%", marginVertical: scale(5), marginHorizontal: scale(4), alignContent: "center", justifyContent: "center", paddingVertical: scale(5) }} ><Text style={{ color: item.isSelected ? WHITE : BLACK, textAlign: "center" }}>{item.name}</Text></Pressable>
                        ))}
                    </View>

                    <Text style={{ fontSize: scale(10), color: BLACK, marginVertical: scale(10) }}>Available slots</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {time.map((item, index) => (
                            <Pressable key={index} style={{ backgroundColor: item.isSelected ? RED_COLOR : WHITE, borderWidth: 1, borderColor: RED_COLOR, borderRadius: scale(5), flexBasis: "30%", marginVertical: scale(5), marginHorizontal: scale(4), alignContent: "center", justifyContent: "center", paddingVertical: scale(5) }} ><Text style={{ color: item.isSelected ? WHITE : BLACK, textAlign: "center" }}>{item.name}</Text></Pressable>
                        ))}
                    </View>
                    <Pressable style={GlobalStyle.filedButton} onPress={()=>navigation.navigate('EditProfile')}>
                        <Text style={GlobalStyle.filedButtonText}>Edit Profile</Text>
                    </Pressable>
                    <View style={{ height: scale(100) }} />
                </View>


            </ScrollView>
        </View>
    );
};

export default Profile;

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

    },
});
