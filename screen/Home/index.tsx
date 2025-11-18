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
import { useApi } from '../../methods/apiClient';
import { endpoints } from '../../methods/endpoints';
import DetailCard from './components/DetailCard';

type Props = DrawerScreenProps<DrawerParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state?.auth?.user);
  const {POST} = useApi()

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append('doctorId', user?.id);
      const res = await POST(endpoints?.getAppointments, formdata);
      if (res?.status) {
        console.log('List of appointments fetched successfully', res?.data);
        setAppointments(res?.data);
      } else {
        console.log('Fetching appointments failed', res?.message);
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
        <DetailCard />
        {appointments?.length > 0 ? (
          <>
            <Text
              style={{
                fontSize: scale(16),
                color: BLACK,
                marginTop: scale(20),
              }}
            >
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
