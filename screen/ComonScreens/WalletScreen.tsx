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
type HomeStack = DrawerScreenProps<DrawerParamList, 'Wallet'>;


type Props = HomeStack


const WalletScreen = ({ navigation }: Props) => {
    const name = useInputState('')
    const phone = useInputState('')
    const query = useInputState('')

    return (
        <View style={styles.mainContainer}>
            <AllHeader navigate={() => navigation.navigate('Help')} back={() => navigation.goBack()} title={'Help'} />
            <View style={styles.container}>
                <View>
                    <Image source={require('../../assets/png/wallet.png')} style={{ height: scale(160), alignSelf: "center", marginBottom: scale(20) }} resizeMode='contain' />
                    <View style={{ position: "absolute", top: scale(50), left: scale(30) }}>
                        <Text style={{ fontSize: scale(12), color: WHITE }}>Total Balance</Text>
                        <Text style={{ fontSize: scale(30), fontWeight: "bold", color: WHITE }}>Rs. 200</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" ,marginVertical:scale(10),justifyContent:"space-between"}}>
                    <View style={{ backgroundColor: RED_COLOR, height: 60, width: 50, borderRadius: 10, alignItems: "center", alignContent: "center", justifyContent: "center" }}><Icon name='mail' size={30} color={WHITE} /></View>
                    <Text style={{ flex:1,color: BLACK, fontSize: scale(18), marginHorizontal: scale(10),fontWeight:'bold',textAlign:"left" }}>Refundable Credit</Text>
                    <Text style={{ color: BLACK, fontSize: scale(18), marginHorizontal: scale(10),fontWeight:'bold' }}>0</Text>
                </View>
                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" ,marginVertical:scale(10),justifyContent:"space-between"}}>
                    <View style={{ backgroundColor: RED_COLOR, height: 60, width: 50, borderRadius: 10, alignItems: "center", alignContent: "center", justifyContent: "center" }}><FontIcon name='whatsapp' size={30} color={WHITE} /></View>
                    <Text style={{flex:1, color: BLACK, fontSize: scale(18), marginHorizontal: scale(10),fontWeight:'bold',textAlign:"left"   }}>Promotional Credit</Text>
                    <Text style={{ color: BLACK, fontSize: scale(18), marginHorizontal: scale(10),fontWeight:'bold' }}>200</Text>
                </View>
                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" ,marginVertical:scale(10),justifyContent:"space-between"}}>
                    <View style={{ backgroundColor: RED_COLOR, height: 60, width: 50, borderRadius: 10, alignItems: "center", alignContent: "center", justifyContent: "center" }}><FontIcon name='whatsapp' size={30} color={WHITE} /></View>
                    <Text style={{ flex:1,color: BLACK, fontSize: scale(18), marginHorizontal: scale(10),fontWeight:'bold',textAlign:"left"   }}>Referral Credit</Text>
                    <Text style={{ color: BLACK, fontSize: scale(18), marginHorizontal: scale(10),fontWeight:'bold' }}>0</Text>
                </View>
            </View>
        </View>
    );
};

export default WalletScreen;

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
