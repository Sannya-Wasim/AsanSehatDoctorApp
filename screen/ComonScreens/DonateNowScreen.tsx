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

// type Props = NativeStackScreenProps<HomeStackScreenType, 'MainHomeScreen'> ;
type HomeStack = DrawerScreenProps<DrawerParamList, 'DonateNowScreen'>;


type Props = HomeStack


const DonateNowScreen = ({ navigation }: Props) => {
    const name = useInputState('')
    const phone = useInputState('')
    const query = useInputState('')

    return (
        <View style={styles.mainContainer}>
            <AllHeader navigate={() => navigation.navigate('Help')} back={() => navigation.goBack()} title={'Help'} />
            <View style={styles.container}>
                <Image source={require('../../assets/png/donateNow.png')} style={{ height: scale(160), alignSelf: "center", marginVertical: scale(50) }} resizeMode='contain' />
                <Text style={{ color: BLACK, fontSize: scale(14) }}>Enter the amount of donation</Text>
                <Input inputState={name} label={null} placeholder='Amount' keyboardType='number-pad' />
                <Text style={{ color: BLACK, fontSize: scale(14) }}>Add a message (optional)</Text>
                <Input inputState={query} label={null} placeholder="Add a message"/>
                {name.value !== ""  && <Pressable style={GlobalStyle.filedButton}  onPress={() => navigation.navigate('SelectPaymentMethod', {
                    payments: [{
                        name: "Total Amount of Donation",
                        amount: Number(name.value)
                    }]})} >
                    <Text style={GlobalStyle.filedButtonText}>Donate Now</Text>
                </Pressable>}
            </View>
        </View>
    );
};

export default DonateNowScreen;

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
