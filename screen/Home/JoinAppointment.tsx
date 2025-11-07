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
type HomeStack = DrawerScreenProps<DrawerParamList, 'JoinAppointment'>;


type Props = HomeStack


const JoinAppointment = ({ navigation,route }: Props) => {
    const {params} = route

    return (
        <View style={styles.mainContainer}>
            <AllHeader navigate={() => navigation.navigate('Help')} back={() => navigation.goBack()} title={'Join Appointment'} />
            <View style={styles.container}>
                <Appointment joinNav={undefined} reshceduleNav={undefined} {...params} showButton={false} review={null} />
            </View>
        </View>
    );
};

export default JoinAppointment;

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
