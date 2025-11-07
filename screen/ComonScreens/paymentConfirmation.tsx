import { useState } from 'react';
import { View, Text, Image, Dimensions, Pressable, ScrollView, TextInput } from 'react-native';
import { ScaledSheet, scale, } from 'react-native-size-matters';
import { AllHeader } from '../../components/header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { Input, useInputState } from '../../components/inputs/textInput';
import GlobalStyle from '../../util/styles';
import { BLACK, RED_COLOR, WHITE, WHITE_10, WHITE_40 } from '../../util/color';
import Icon from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';
import { DrawerParamList } from '../../navigations/drawerNavigation';
type StackProps = DrawerScreenProps<DrawerParamList, 'ConfirmationPayment'>;


const PaymentConfirmation = ({ navigation, route }: StackProps) => {
    const copon = useInputState()
    const { params } = route
    console.log(route.name, "params")
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={{
                    padding: scale(4),
                    borderRadius: scale(20),
                    backgroundColor: WHITE, height: scale(200), width: "100%", alignSelf: "center", shadowOffset: {
                        width: 50,
                        height: -50,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 0,
                    shadowColor: BLACK,

                }}>
                    <LottieView style={{ height: scale(100), width: "100%", alignSelf: "center" }} source={require('../../assets/json/success.json')} autoPlay
                        loop />
                    <Text style={{ textAlign: "center", fontSize: scale(16), marginVertical: 10, color: BLACK }}>Payment Success!</Text>
                    <Text style={{ textAlign: "center", fontWeight: 'bold', fontSize: scale(26), marginVertical: 10, color: BLACK }}>{params.totalpayment}</Text>
                </View>
                <View style={{
                    paddingHorizontal: scale(20),
                    paddingVertical: scale(10),
                    borderRadius: scale(20),
                    marginVertical: scale(10),
                    backgroundColor: WHITE, height: scale(250), width: "100%", alignSelf: "center", shadowOffset: {
                        width: 50,
                        height: -50,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 0,
                    shadowColor: BLACK,

                }}>

                    <Text style={{ textAlign: "left", fontSize: scale(16), marginVertical: 10, color: BLACK, fontWeight: 'bold' }}>Payment Details</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ textAlign: "center", fontSize: scale(14), marginVertical: 10, color: BLACK }}>Order Id</Text>
                        <Text style={{ textAlign: "center", fontWeight: 'bold', fontSize: scale(14), marginVertical: 10, color: BLACK }}>{params.orderid}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ textAlign: "center", fontSize: scale(14), marginVertical: 10, color: BLACK }}>Payment Status</Text>
                        <Text style={{ textAlign: "center", fontWeight: 'bold', fontSize: scale(14), marginVertical: 10, color: BLACK }}>Success</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ textAlign: "center", fontSize: scale(14), marginVertical: 10, color: BLACK }}>Payment Time</Text>
                        <Text style={{ textAlign: "center", fontWeight: 'bold', fontSize: scale(14), marginVertical: 10, color: BLACK }}>{new Date().toLocaleString()}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ textAlign: "center", fontSize: scale(14), marginVertical: 10, color: BLACK }}>Description</Text>
                        <Text style={{ textAlign: "center", fontWeight: 'bold', fontSize: scale(14), marginVertical: 10, color: BLACK }}>{params.paymentfor}</Text>
                    </View>
                    <View style={{
                        borderRadius: 1, borderWidth: 1,
                        borderStyle: 'dashed',
                        borderColor: BLACK
                    }} />
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ textAlign: "center", fontSize: scale(14), marginVertical: 10, color: BLACK }}>Total Payment</Text>
                        <Text style={{ textAlign: "center", fontWeight: 'bold', fontSize: scale(14), marginVertical: 10, color: BLACK }}>{params.totalpayment}</Text>
                    </View>
                </View>
                <Pressable style={[GlobalStyle.outlinedButton, { marginTop: 5 }]}>
                    <Text style={GlobalStyle.outlinedButtonText}>Download Receipt</Text>
                </Pressable>
                <Pressable style={[GlobalStyle.filedButton, { marginTop: 5 }]} onPress={() =>{ navigation.goBack();navigation.goBack();navigation.goBack()}}>
                    <Text style={GlobalStyle.filedButtonText}>Continue</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default PaymentConfirmation;

const styles = ScaledSheet.create({
    mainContainer: {
        // backgroundColor: '#fff',
        height: Dimensions.get('screen').height
    },
    container: {
        width: "90%",
        // backgroundColor: '#fff',
        alignSelf: "center",
        marginTop: '60@s',
        height: Dimensions.get('screen').height - 100

    },
});
