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
import { DrawerParamList } from '../../navigations/drawerNavigation';
type StackProps = NativeStackScreenProps<DrawerParamList, 'SelectPaymentMethod'>;


const SelectPaymentMethod = ({ navigation, route }: StackProps) => {
    const copon = useInputState()
    const { params } = route
    console.log(params, "params")
    const [paymentMethod, setPaymentMethod] = useState([
        {
            id: 1,
            name: "Debit/Credit Card",
            selected: false,
            image: require('../../assets/png/debitcard.png')
        },
        {
            id: 2,
            name: "Bank Transfer",
            selected: false,
            image: require('../../assets/png/bankIcon.png')
        },
        {
            id: 3,
            name: "Easypaisa",
            selected: false,
            image: require('../../assets/png/easypaisa.png')
        },
        {
            id: 4,
            name: "Jazz Cash",
            selected: false,
            image: require('../../assets/png/jazzcash.png')
        }
    ])
    return (
        <View style={styles.mainContainer}>
            <AllHeader navigate={()=> navigation.navigate('Help')} back={() => navigation.goBack()} title='Payment Method' />
            <View style={styles.container}>
                <Text style={{ fontSize: scale(18), color: BLACK }}>Your Order Summary</Text>
                <View style={{ backgroundColor: WHITE_10, marginVertical: scale(20), borderRadius: scale(10), borderWidth: 1, borderColor: 'lightgray', paddingHorizontal: scale(20), paddingVertical: scale(15) }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingBottom: 10 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Icon name='calendar' color={BLACK} size={20} />
                            <Text style={{ color: BLACK }}>24-10-2023, Tuesday</Text>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: scale(10) }}>
                        {params.payments.map((p, i) => <View key={i} style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", paddingVertical: scale(5) }}>
                            <Text style={{ color: BLACK }}>{i + 1}</Text>
                            <Text style={{ color: BLACK }}>{p.name}</Text>
                            <Text style={{ color: BLACK }}>{p.amount}</Text>
                        </View>)}
                        <View style={{ borderBottomWidth: 1, borderBottomColor: BLACK }} />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", paddingVertical: scale(10) }}>
                            <Text style={{ color: BLACK, fontWeight: "bold" }}>Total Amount</Text>
                            <Text style={{ color: BLACK, fontWeight: "bold" }}>{params.payments.reduce(
                                (accumulator, currentValue) => Number(accumulator) + Number(currentValue.amount),
                                0,
                            )}</Text>
                        </View>
                    </View>
                </View>
                <Text style={{ fontSize: scale(18), color: BLACK }}>Select Payment Method</Text>
                <ScrollView>

                    {
                        paymentMethod.map(f => <Pressable onPress={() => setPaymentMethod(pre => pre.map(p => p.id == f.id ? ({ ...p, selected: true }) : ({ ...p, selected: false })))} style={{ flexDirection: 'row', alignContent: "center", justifyContent: "space-between", alignItems: "center", }} key={f.id}>
                            <Image source={f.image} style={{ width: scale(50) }} resizeMode='contain' />
                            <View style={{ flexDirection: 'row', flexBasis: "80%", alignContent: "center", justifyContent: "space-between", alignItems: "center", }}>
                                <Text>{f.name}</Text>
                                <View style={{ borderWidth: 2, padding: 2, borderRadius: 100, height: scale(30), width: scale(30), borderColor: RED_COLOR, alignContent: "center", justifyContent: "center", alignItems: "center" }}>
                                    {f.selected && <View style={{ backgroundColor: RED_COLOR, height: scale(20), width: scale(20), borderRadius: 100 }} />}
                                </View></View>
                        </Pressable>)
                    }
                    <Text style={{ fontSize: scale(18), color: BLACK }}>Have any discount Coupon Code?</Text>
                    <View style={{ flexDirection: "row", width: "100%" }}>
                        <TextInput {...copon} style={{ width: "70%", borderWidth: 1, marginRight: 5, borderRadius: 5 }} placeholder='Coupon Code' />
                        <Pressable style={[GlobalStyle.filedButton, { width: "30%" }]}>
                            <Text style={GlobalStyle.filedButtonText}>Apply</Text>
                        </Pressable>
                    </View>
                    <Pressable style={[GlobalStyle.filedButton, { marginTop: 30 }]} onPress={() => navigation.navigate('ConfirmationPayment', {
                        totalpayment: params.payments.reduce(
                            (accumulator, currentValue) => Number(accumulator) + Number(currentValue.amount),
                            0,
                        ),
                        paymentStatus: true,
                        orderid: Math.floor(Math.random()*100000),
                        time: new Date().toLocaleTimeString(),
                        paymentfor: "Instant Consultation",
                    })}>
                        <Text style={GlobalStyle.filedButtonText}>Continue</Text>
                    </Pressable>
                </ScrollView>

            </View>
        </View>
    );
};

export default SelectPaymentMethod;

const styles = ScaledSheet.create({
    mainContainer: {
        backgroundColor: '#fff',
        height: Dimensions.get('screen').height
    },
    container: {
        width: "90%",
        backgroundColor: '#fff',
        alignSelf: "center",
        marginTop: '50@s',
        height: Dimensions.get('screen').height - 100

    },
});
