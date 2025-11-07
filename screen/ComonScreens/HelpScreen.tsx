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

type DrawerProps = DrawerScreenProps<DrawerParamList, 'Help'>;


type Props =  DrawerProps


const HelpScreen = ({ navigation }: Props) => {
    const name = useInputState('')
    const phone = useInputState('')
    const query = useInputState('')

    return (
        <View style={styles.mainContainer}>
            <AllHeader navigate={() => { }} back={() => navigation.goBack()} title={'Help'} />
            <View style={styles.container}>

                <Image source={require('../../assets/png/helpScreenImage.png')} style={{ height: scale(160), alignSelf: "center",marginBottom:scale(20) }} resizeMode='contain' />


                <ScrollView >
                    <Text style={{ color: BLACK, fontSize: scale(16), marginVertical: scale(15) }}>Contact Us at</Text>
                    <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                        <View style={{ backgroundColor: WHITE_10, height: 50, width: 50, borderRadius: 100, alignItems: "center", alignContent: "center", justifyContent: "center" }}><Icon name='mail' size={30} color={BLACK} /></View>
                        <Text style={{ color: BLACK, fontSize: scale(14), marginHorizontal: scale(10) }}>asaansehat@example.com</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                        <View style={{ backgroundColor: WHITE_10, height: 50, width: 50, borderRadius: 100, alignItems: "center", alignContent: "center", justifyContent: "center" }}><FontIcon name='whatsapp' size={30} color={'green'} /></View>
                        <Text style={{ color: BLACK, fontSize: scale(14), marginHorizontal: scale(10) }}>03125689485</Text>
                    </View>

                    <Text style={{ color: BLACK, fontSize: scale(16), marginVertical: scale(15) }}>Got any Query?</Text>
                    <Input inputState={name} label={null} placeholder='Name' />
                    <Input inputState={phone} keyboardType='number-pad' label={null} placeholder='Phone Number' />
                    <Input inputState={query} label={null} placeholder='Type your query here' />
                    <Pressable style={GlobalStyle.filedButton}>
                        <Text style={GlobalStyle.filedButtonText}>Submit</Text>
                    </Pressable>
                    <View style={{height:scale(400)}}/>
                </ScrollView>
            </View>
        </View>
    );
};

export default HelpScreen;

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
