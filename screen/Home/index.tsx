import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { MainScreenHeader } from '../../components/header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DrawerScreenProps } from '@react-navigation/drawer';

import { Input, useInputState } from '../../components/inputs/textInput';
import FastImage from 'react-native-fast-image';
import { BLACK, RED_COLOR, WHITE } from '../../util/color';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { DrawerParamList } from '../../navigations/drawerNavigation';
import { DrawerActions } from '@react-navigation/native';

import Appointment from '../../components/apointments';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { config } from '../../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type Props = DrawerScreenProps<DrawerParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state : RootState) => state?.auth?.user)

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append('doctorId', user?.id);
      const res = await axios?.post(
        `${config?.baseUrl}/doctors/doctorAppointments`,
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `${user?.token}`,
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

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
              {user?.name}
            </Text>
            <Text style={{ color: WHITE, fontSize: scale(14) }}>
              {user?.designation}
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
                name="insert-emoticon"
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
              <MaterialIcon name="payments" size={scale(40)} color={'#0D5495'} />
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
        {appointments?.length > 0 ? (
          <>
            <Text style={{ fontSize: scale(16), color: BLACK, marginTop : scale(20) }}>
              Upcoming Appointments
            </Text>
            <FlatList
              data={appointments}
              renderItem={({ item, index }) => {
                return (
                  <Appointment
                    key={index}
                    reshceduleNav={() =>
                      navigation.navigate('RescheduleAppointment', item)
                    }
                    joinNav={() => navigation.navigate('JoinAppointment', item)}
                    showButton={true}
                    {...item}
                  />
                );
              }}
              style={{
                // marginBottom : scale(150)
                maxHeight: Dimensions?.get('screen')?.height * 0.45,
              }}
            />
          </>
        ) : loading ? (
          <ActivityIndicator size={'small'} color={RED_COLOR} />
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'red',
              flexGrow: 1,
            }}
          >
            <Text style={{ color: BLACK, fontSize: scale(20) }}>
              No appointments yet!
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = ScaledSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    height: Dimensions.get('screen').height,
    // justifyContent: 'center',
    // alignContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: '50@s',
    // height:Dimensions.get('screen').height
  },
});
