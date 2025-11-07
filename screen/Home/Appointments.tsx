import { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, Pressable, ScrollView } from 'react-native';
import { ScaledSheet, scale, } from 'react-native-size-matters';
import { AllHeader } from '../../components/header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';

import { Input, useInputState } from '../../components/inputs/textInput';
import { BLACK, RED_COLOR, WHITE, WHITE_10 } from '../../util/color';
import GlobalStyle from '../../util/styles';

import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import { DrawerParamList } from '../../navigations/drawerNavigation';
import Appointment from '../../components/apointments';

// type Props = NativeStackScreenProps<HomeStackScreenType, 'MainHomeScreen'> ;
type HomeStack = DrawerScreenProps<DrawerParamList, 'Appointments'>;


type Props = HomeStack


const Appointments = ({ navigation }: Props) => {
    const search = useInputState('')
    const [Upcoming, setUpcoming] = useState(Array.from(Array(3), (_, x) => ({
        id: x + 1,
        name: "Zain Bawa",
        image: require('../../assets/png/doctorImage.png'),
        symptoms: ["Fever", "Cold", "Cough"],
        condition: 'Lorem ipsum dolor sit amet consectetur. Tellus posuere eget nunc gravida amet et placerat. Adipiscing vel quis sem et. Nisl.',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        rating: null,
        review: null,
        showButton: true
    })))
    const [Previous, setPrevious] = useState(Array.from(Array(100), (_, x) => ({
        id: x + 1,
        name: "Zain Bawa",
        image: require('../../assets/png/doctorImage.png'),
        symptoms: ["Fever", "Cold", "Cough"],
        condition: 'Lorem ipsum dolor sit amet consectetur. Tellus posuere eget nunc gravida amet et placerat. Adipiscing vel quis sem et. Nisl.',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        rating: "4.5",
        review: "Dr. Ahmed is an exceptional physician. He listens attentively to all my concerns and provides a clear explanation of my health issues. His caring and empathetic approach make me feel genuinely cared for.",
        showButton: false
    })))

    return (
        <View style={styles.mainContainer}>
            <AllHeader navigate={() => navigation.navigate('Help')} back={() => navigation.goBack()} title={'Appointments'} />
            <View style={styles.container}>
                <Input inputState={search} label={null} placeholder='Search by patient name' />
                <ScrollView style={{ marginTop: scale(10) }}>
                    <Text style={{ fontSize: scale(16), color: BLACK }}>Upcoming Appointments</Text>
                    {Upcoming.map((item, index) => (
                        <Appointment
                            key={item.id}
                            reshceduleNav={() => navigation.navigate('RescheduleAppointment', item)}
                            joinNav={() => navigation.navigate('JoinAppointment', item)}
                            {...item}

                        />
                    ))}
                    <Text style={{ fontSize: scale(16), color: BLACK }}>Previous Appointments</Text>
                    {Previous.map((item, index) => (
                        <Appointment
                            key={item.id}
                            reshceduleNav={() => navigation.navigate('RescheduleAppointment', item)}
                            joinNav={() => navigation.navigate('JoinAppointment', item)}
                            {...item}

                        />
                    ))}
                    <View style={{ height: scale(300) }} />
                </ScrollView>
            </View>
        </View>
    );
};

export default Appointments;

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
