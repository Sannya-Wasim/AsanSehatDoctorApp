import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { MainScreenHeader } from '../../components/header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DrawerScreenProps } from '@react-navigation/drawer';

import { Input, useInputState } from '../../components/inputs/textInput';
import FastImage from 'react-native-fast-image';
import { BLACK, RED_COLOR, WHITE } from '../../util/color';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerParamList } from '../../navigations/drawerNavigation';
import { DrawerActions } from '@react-navigation/native';

import Appointment from '../../components/apointments';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { config } from '../../config';

type Props = DrawerScreenProps<DrawerParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());
  const [appointments, setAppointments] = useState([]);
  const [Upcoming, setUpcoming] = useState(
    Array.from(Array(3), (_, x) => ({
      patientId: '213',
      enquiryCode: '7b315e12e6134b92',
      doctorId: '106',
      lhvCmwNurseId: '182',
      marviId: '197',
      appointmentDate: '2025-11-12',
      appointmentTime: '12:30:00',
      serviceRequest:
        'Fever,Fever with skin rashes,Headache,Hypertension,Maternal care,Family planning,Immunization,Diabetes care',
      enquiryType: 'Lab Services',
      cctype: 'Video Consultation + Ultrasound (Rural)',
      paid: '213',
      pidd: '32913',
      operator: 'System',
      doctor: 'Dr.Fouzia Farah',
      name: 'Muhammad Naveed',
      age: '40',
      gender: 'Male',
      cnic: '',
      address: 'Karachi Malir C/O Thatta',
      status_class_name: 'label label-warning',
      statusName: 'Confirmed',
      statusId: '2',
    })),
  );

  const fetchAppointments = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      const formdata = new FormData();
      formdata.append('doctorId', userId);
      const res = await axios?.post(
        `${config?.baseUrl}/doctors/doctorAppointments`,
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `${token}`,
          },
        },
      );
      if (res?.data?.status) {
        console.log(
          'List of appointments fetched successfully',
          res?.data?.data,
        );
        setAppointments(res?.data?.data);
      } else {
        console.log('Fetching appointments failed', res?.data?.message);
      }
    } catch (error) {
      console.log('Error fetching appointments', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);
  const [Previous, setPrevious] = useState(
    Array.from(Array(100), (_, x) => ({
      id: x + 1,
      name: 'Zain Bawa',
      image: require('../../assets/png/doctorImage.png'),
      symptoms: ['Fever', 'Cold', 'Cough'],
      condition:
        'Lorem ipsum dolor sit amet consectetur. Tellus posuere eget nunc gravida amet et placerat. Adipiscing vel quis sem et. Nisl.',
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      rating: '4.5',
      review:
        'Dr. Ahmed is an exceptional physician. He listens attentively to all my concerns and provides a clear explanation of my health issues. His caring and empathetic approach make me feel genuinely cared for.',
      showButton: false,
    })),
  );
  return (
    <SafeAreaView style={styles.mainContainer}>
      <MainScreenHeader
        toggleDrawer={toggleDrawer}
        walletNav={() => navigation.navigate('Wallet')}
      />
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: RED_COLOR,
            flexDirection: 'row',
            height: scale(130),
            padding: scale(5),
            marginTop: scale(50),
            borderRadius: scale(5),
          }}
        >
          <View style={{ flexBasis: '60%', padding: scale(10) }}>
            <Text
              style={{ color: WHITE, fontSize: scale(16), fontWeight: 'bold' }}
            >
              Dr. Nadeem Ahmed
            </Text>
            <Text style={{ color: WHITE, fontSize: scale(14) }}>
              General Physician
            </Text>
            <Text
              style={{
                color: WHITE,
                fontSize: scale(10),
                marginVertical: scale(20),
              }}
            >
              MBBS, Ph.D.
            </Text>
          </View>
          <Image
            source={require('../../assets/png/doctorImage.png')}
            style={{
              width: scale(135),
              height: scale(153),
              borderRadius: scale(5),
              position: 'absolute',
              bottom: scale(10),
              right: scale(10),
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: scale(20),
          }}
        >
          <View style={{ flex: 1, marginHorizontal: scale(5) }}>
            <View
              style={{
                backgroundColor: 'rgba(238,33,37,0.3)',
                alignItems: 'center',
                padding: scale(15),
                borderRadius: scale(100),
              }}
            >
              <Icon name="video" size={scale(40)} color={RED_COLOR} />
            </View>
            <Text
              style={{
                textAlign: 'center',
                color: BLACK,
                fontSize: scale(14),
                fontWeight: 'bold',
              }}
            >
              Rs. 400
            </Text>
            <Text
              style={{ textAlign: 'center', color: BLACK, fontSize: scale(8) }}
            >
              Fees
            </Text>
          </View>
          <View style={{ flex: 1, marginHorizontal: scale(5) }}>
            <View
              style={{
                backgroundColor: 'rgba(11,149,122,0.3)',
                alignItems: 'center',
                padding: scale(15),
                borderRadius: scale(100),
              }}
            >
              <Icon name="award" size={scale(40)} color={'#0B957A'} />
            </View>
            <Text
              style={{
                textAlign: 'center',
                color: BLACK,
                fontSize: scale(14),
                fontWeight: 'bold',
              }}
            >
              12 Years
            </Text>
            <Text
              style={{ textAlign: 'center', color: BLACK, fontSize: scale(8) }}
            >
              Experience
            </Text>
          </View>

          <View style={{ flex: 1, marginHorizontal: scale(5) }}>
            <View
              style={{
                backgroundColor: 'rgba(233,133,3,0.3)',
                alignItems: 'center',
                padding: scale(15),
                borderRadius: scale(100),
              }}
            >
              <MaterialIcon
                name="emoticon-happy-outline"
                size={scale(40)}
                color={'#0D5495'}
              />
            </View>
            <Text
              style={{
                textAlign: 'center',
                color: BLACK,
                fontSize: scale(14),
                fontWeight: 'bold',
              }}
            >
              175+
            </Text>
            <Text
              style={{ textAlign: 'center', color: BLACK, fontSize: scale(8) }}
            >
              Patients
            </Text>
          </View>
          <View style={{ flex: 1, marginHorizontal: scale(5) }}>
            <View
              style={{
                backgroundColor: 'rgba(18,86,161,0.3)',
                alignItems: 'center',
                padding: scale(15),
                borderRadius: scale(100),
              }}
            >
              <MaterialIcon name="cash" size={scale(40)} color={'#0D5495'} />
            </View>
            <Text
              style={{
                textAlign: 'center',
                color: BLACK,
                fontSize: scale(14),
                fontWeight: 'bold',
              }}
            >
              18,000
            </Text>
            <Text
              style={{ textAlign: 'center', color: BLACK, fontSize: scale(8) }}
            >
              Earnings
            </Text>
          </View>
        </View>
        <ScrollView style={{ marginTop: scale(10) }}>
          <Text style={{ fontSize: scale(16), color: BLACK }}>
            Upcoming Appointments
          </Text>
          {Upcoming.map((item, index) => (
            <Appointment
              key={index}
              reshceduleNav={() =>
                navigation.navigate('RescheduleAppointment', item)
              }
            //   joinNav={() => navigation.navigate('JoinAppointment', item)}
            showButton={true}
              {...item}
            />
          ))}
          {/* <Text style={{ fontSize: scale(16), color: BLACK }}>Previous Appointments</Text>
                    {Previous.map((item, index) => (
                        <Appointment
                            key={item.id}
                            reshceduleNav={() => navigation.navigate('RescheduleAppointment', item)}
                            joinNav={() => navigation.navigate('JoinAppointment', item)}
                            {...item}
                            
                        />
                    ))} */}
          <View style={{ height: scale(300) }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = ScaledSheet.create({
  mainContainer: {
    // flex: 1,
    backgroundColor: '#fff',
    height: Dimensions.get('screen').height,
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: '50@s',
    // height:Dimensions.get('screen').height
  },
});
