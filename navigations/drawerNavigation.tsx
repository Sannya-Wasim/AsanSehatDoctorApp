import { DrawerContent, DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screen/Home";
import WalletScreen from "../screen/ComonScreens/WalletScreen";
import HelpScreen from "../screen/ComonScreens/HelpScreen";
import DonateNowScreen from "../screen/ComonScreens/DonateNowScreen";
import SelectPaymentMethod from "../screen/ComonScreens/selectPaymentMethod";
import PaymentConfirmation from "../screen/ComonScreens/paymentConfirmation";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Image } from "react-native";

import { scale } from "react-native-size-matters";
import { BLACK, RED_COLOR } from "../util/color";
import { setSigin } from "../store/reducer/authReducer";
import { useAppDispatch } from "../store/hook";
import Icon from 'react-native-vector-icons/Feather'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import RescheduleAppointment from "../screen/Home/RescheduleAppointment";
import Appointments from "../screen/Home/Appointments";
import Profile from "../screen/Home/Profile";
import EditProfile from "../screen/authScreens/EditProfile";
import JoinAppointment from "../screen/Home/JointAppointment";


export type DrawerParamList = {
    Home: undefined;
    Wallet: undefined;
    Help: undefined;
    DonateNowScreen: undefined;
    SelectPaymentMethod: {
        payments: {
            name: string,
            amount: number
        }[]
    }
    ConfirmationPayment: {
        totalpayment: number,
        paymentStatus: boolean,
        orderid: number,
        time: string,
        paymentfor: string,

    },
    RescheduleAppointment:{
        patientId: string;
  enquiryCode: string;
  doctorId: string;
  lhvCmwNurseId: string;
  marviId: string;
  appointmentDate: string; // could use Date if you parse it
  appointmentTime: string; // e.g., "HH:mm:ss"
  serviceRequest: string; // or string[] if you split it
  enquiryType: string;
  cctype: string;
  paid: string;
  pidd: string;
  operator: string;
  doctor: string;
  name: string;
  age: string; // could be number if you parse
  gender: string;
  cnic: string;
  address: string;
  status_class_name: string;
  statusName: string;
  statusId: string;
    },
    JoinAppointment:{
        id:number,
        name:string,
        image:any,
        symptoms:string[],
        condition:string,
        date:string,
        time:string,
        rating:null | string,
        review:null | string,
        showButton:boolean,
    },
    Appointments:undefined,
    Profile:undefined,
    EditProfile:undefined
}


// create Drawer Navigation
const Drawer = createDrawerNavigator<DrawerParamList>();
export default function DrawerNavigation() {
    const dispatch = useAppDispatch()
    const drawerItems = [
        {
            lable: 'My Profile',
            icon: <Icon name="user" size={20} color={BLACK} />,
            navigate: "Profile"
        },
        {
            lable: 'Appointments',
            icon: <Icon name="calendar" size={20} color={BLACK} />,
            navigate: 'Appointments'
        },

        {
            lable: 'Wallet',
            icon: <FontAwesomeIcon name="wallet" size={20} color={BLACK} />,
            navigate: 'Wallet'
        },
        {
            lable: 'Contact Us',
            icon: <FontAwesomeIcon name="phone" size={20} color={BLACK} />,
            navigate: 'Help'
        },
        {
            lable: 'Donate Now',
            icon: <FontAwesome5Icon name="donate" size={20} color={BLACK} />,
            navigate: 'DonateNowScreen'
        }
        ,
        {
            lable: 'Invite a friend',
            icon: <FontAwesomeIcon name="comment-medical" size={20} color={BLACK} />,
            navigate: null
        }
    ];
    return (
        <Drawer.Navigator
            drawerContent={props => <SafeAreaView style={{ flex: 1 }}>
                <View style={{ width: "90%", alignSelf: "center", marginTop: scale(20) }}>
                    <Image source={require('../assets/png/doctorImage.png')} style={{ width: scale(120), height: scale(120),borderRadius:scale(5),marginBottom:scale(10) }} />
                   
                        <Text style={{ color: BLACK }}>Hello,</Text>
                        <Text style={{ color: RED_COLOR, fontSize: scale(18),fontWeight:"bold" }}>Dr. Nadeem Ahmed</Text>
                        <Text style={{ color: BLACK }}>General Physician</Text>
                   
                </View>
                <DrawerContentScrollView {...props}>

                    <DrawerItemList {...props} />
                    {drawerItems.map(d => <DrawerItem style={{ height: scale(45) }} icon={(props) => d.icon} label={d.lable} labelStyle={{ color: BLACK }}
                        onPress={() =>d.navigate ?  props.navigation.navigate(d.navigate) : null} />)}
                    <View style={{ borderBottomColor: BLACK, borderBottomWidth: 1, width: "90%", alignSelf: "center" }} />
                    <DrawerItem style={{ height: scale(45) }} icon={(props) => <Icon name="file-text" size={20} color={BLACK} />} label={'Privacy Policy'} labelStyle={{ color: BLACK }} onPress={() => dispatch(setSigin(false))} />
                    <View style={{ borderBottomColor: BLACK, borderBottomWidth: 1, width: "90%", alignSelf: "center" }} />
                    <DrawerItem style={{ height: scale(45) }} icon={(props) => <Icon name="trash" size={20} color={RED_COLOR} />} label={"Delete Account"} labelStyle={{ color: RED_COLOR }} onPress={() => dispatch(setSigin(false))} />
                    <DrawerItem style={{ height: scale(45) }} icon={(props) => <Icon name="log-out" size={20} color={BLACK} />} label={"Log Out"} labelStyle={{ color: BLACK }} onPress={() => dispatch(setSigin(false))} />
                </DrawerContentScrollView>
            </SafeAreaView>}
            // dont show the header
            screenOptions={{ headerShown: false, drawerItemStyle: { height: 0 }, }}

        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Wallet" component={WalletScreen} />
            <Drawer.Screen name="Help" component={HelpScreen} />
            <Drawer.Screen name="DonateNowScreen" component={DonateNowScreen} />
            <Drawer.Screen name="SelectPaymentMethod" component={SelectPaymentMethod} />
            <Drawer.Screen name="ConfirmationPayment" component={PaymentConfirmation} />
            <Drawer.Screen name='JoinAppointment' component={JoinAppointment} />
            <Drawer.Screen name='RescheduleAppointment' component={RescheduleAppointment} />
            <Drawer.Screen name='Appointments' component={Appointments} />
            <Drawer.Screen name='Profile' component={Profile} />
            {/* <Drawer.Screen name='EditProfile' component={EditProfile} /> */}
        </Drawer.Navigator>
    );
}