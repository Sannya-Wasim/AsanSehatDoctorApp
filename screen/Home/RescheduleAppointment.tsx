import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { AllHeader } from '../../components/header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';

import { Input, useInputState } from '../../components/inputs/textInput';
import { BLACK, GRAY, RED_COLOR, WHITE, WHITE_10 } from '../../util/color';
import GlobalStyle from '../../util/styles';

import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import { DrawerParamList } from '../../navigations/drawerNavigation';
import Appointment from '../../components/apointments';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { config } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

// type Props = NativeStackScreenProps<HomeStackScreenType, 'MainHomeScreen'> ;
type HomeStack = DrawerScreenProps<DrawerParamList, 'RescheduleAppointment'>;

type Props = HomeStack;

const RescheduleAppointment = ({ navigation, route }: Props) => {
  const { params } = route;
  const user = useSelector((state : RootState) => state?.auth?.user)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
  const reson = useInputState();
  const [loading, setLoading] = useState(false);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [dayslist, setDays] = useState<
    {
      date: number;
      day: string;
      selected: boolean;
    }[]
  >();
  useEffect(() => {
    renderCalendar();
  }, [selectedMonth]);

  const daysInMonth = (month: any, year: any) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startDayOfMonth = (month: any, year: any) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePreviousMonth = () => {
    setSelectedMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
    setSelectedYear(prevYear =>
      selectedMonth === 0 ? prevYear - 1 : prevYear,
    );
  };

  const handleNextMonth = () => {
    console.log('press');
    setSelectedMonth(prevMonth => (prevMonth === 11 ? 0 : prevMonth + 1));
    setSelectedYear(prevYear =>
      selectedMonth === 11 ? prevYear + 1 : prevYear,
    );
  };

  const renderCalendar = () => {
    const month = selectedMonth;
    const year = selectedYear;
    const daysCount = daysInMonth(month, year);
    const startDay = startDayOfMonth(month, year);

    const days: {
      date: number;
      day: string;
      selected: boolean;
    }[] = [];
    for (let i = 1; i <= daysCount; i++) {
      const date = new Date(year, month, i);
      days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: i,
        selected: false,
      });
    }

    const blanks = [];
    for (let i = 0; i < startDay; i++) {
      blanks.push(<View key={i} />);
    }

    setDays([...days]);
  };
  // timeslot 9am to 12am 30 minutes interval  as 09:00 am - 09:30am till 11:30 pm - 12:00 am
  const [timeslot, setTimeSlot] = useState([
    { time: '09:00 am - 10:00 am', selected: false },
    { time: '10:00 am - 11:00 am', selected: false },
    { time: '11:00 am - 12:00 pm', selected: false },
    { time: '12:00 pm - 01:00 pm', selected: false },
    { time: '01:00 pm - 02:00 pm', selected: false },
    { time: '02:00 pm - 03:00 pm', selected: false },
    { time: '03:00 pm - 04:00 pm', selected: false },
    { time: '04:00 pm - 05:00 pm', selected: false },
    { time: '05:00 pm - 06:00 pm', selected: false },
  ]);

  const reschedule = async () => {
    setLoading(true);
    try {

      const formdata = new FormData();
      formdata?.append('enquiryCode', params?.enquiryCode);
      formdata?.append(
        'appointmentDate',
        `${
          dayslist?.filter(
            (_d: { date: number; day: string; selected: boolean }) =>
              _d?.selected === true,
          )[0]?.date
        }-${selectedMonth}-${selectedYear}`,
      );
      formdata?.append(
        'appointmentTime',
        timeslot?.filter(
          (_t: { time: string; selected: boolean }) => _t?.selected === true,
        )[0]?.time,
      );
      formdata?.append('enquiryRemarks', reson?.value);
      const res = await axios?.post(
        `${config?.baseUrl}/doctors/rescheduleAppointment`,
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `${user?.token}`,
          },
        },
      );
      if (res?.data?.status) {
        console.log('Appointment reschedules successfully', res?.data?.data);
      } else {
        console.log('Appointment reschedule failed', res?.data?.data?.message);
      }
    } catch (error) {
      console.log('Error rescheduling appointment', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <AllHeader
        navigate={() => navigation.navigate('Help')}
        back={() => navigation.goBack()}
        title={'Reschedule Appointment'}
      />
      <View style={styles.container}>
        <Appointment
          joinNav={undefined}
          reshceduleNav={undefined}
          {...params}
          showButton={false}
          review={null}
        />

        <ScrollView style={{ marginTop: scale(10) }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              style={{
                color: BLACK,
                fontSize: scale(16),
                marginVertical: scale(10),
              }}
            >
              Select Date
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
              }}
            >
              <Pressable
                style={{ padding: scale(10) }}
                onPress={handlePreviousMonth}
              >
                <Icon name="arrow-left" size={20} color={BLACK} />
              </Pressable>
              <Text
                style={{
                  color: BLACK,
                  fontSize: scale(16),
                  marginVertical: scale(10),
                }}
              >
                {months[selectedMonth]}
              </Text>
              <Pressable
                style={{ padding: scale(10) }}
                onPress={handleNextMonth}
              >
                <Icon name="arrow-right" size={20} color={BLACK} />
              </Pressable>
            </View>
          </View>
          <ScrollView horizontal>
            <View
              style={{
                flexDirection: 'row',
                height: scale(50),
              }}
            >
              {dayslist?.map((d, i) => (
                <Pressable
                  onPress={() =>
                    setDays(prev =>
                      prev?.map((p, ind) =>
                        i === ind
                          ? { ...p, selected: !p.selected }
                          : { ...p, selected: false },
                      ),
                    )
                  }
                  key={i}
                  style={{
                    backgroundColor: d.selected ? RED_COLOR : WHITE_10,
                    flexDirection: 'column',
                    borderWidth: 1,
                    borderColor: BLACK,
                    padding: scale(8),
                    marginHorizontal: scale(10),
                    borderRadius: scale(5),
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      color: d.selected ? WHITE : BLACK,
                    }}
                  >
                    {d.date}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: d.selected ? WHITE : BLACK,
                    }}
                  >
                    {' '}
                    {d.day}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
          <Text
            style={{
              color: BLACK,
              fontSize: scale(16),
              marginVertical: scale(10),
            }}
          >
            Select Time Slot
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {timeslot.map((time, i) => (
              <Pressable
                style={{
                  borderWidth: 1,
                  borderColor: time.selected ? 'transparent' : BLACK,
                  borderRadius: scale(5),
                  flexBasis: '30%',
                  paddingHorizontal: scale(5),
                  paddingVertical: scale(4),
                  marginHorizontal: scale(3),
                  marginVertical: scale(2),
                  backgroundColor: time.selected ? RED_COLOR : WHITE_10,
                }}
                onPress={() =>
                  setTimeSlot(prev =>
                    prev.map((p, ind) =>
                      i === ind
                        ? { ...p, selected: !p.selected }
                        : { ...p, selected: false },
                    ),
                  )
                }
              >
                <Text
                  style={{
                    color: time.selected ? WHITE : BLACK,
                    fontSize: scale(8),
                  }}
                >
                  {time.time}
                </Text>
              </Pressable>
            ))}
          </View>
          <Text
            style={{
              color: BLACK,
              fontSize: scale(16),
              marginVertical: scale(10),
            }}
          >
            Reason for rescheduling the appointment
          </Text>
          <Input
            placeholder="Please type a reason"
            inputState={reson}
            label={null}
            multiline={true}
            numberOfLines={3}
            inputStyle={{ height: scale(70) }}
            textAlignVertical="top"
          />
        </ScrollView>
      </View>
      <Pressable
        onPress={reschedule}
        style={[
          GlobalStyle.filedButton,
          {
            bottom: scale(20),
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator size={'small'} color={WHITE} />
        ) : (
          <Text style={GlobalStyle.filedButtonText}>
            Reschedule Appointment
          </Text>
        )}
      </Pressable>
    </SafeAreaView>
  );
};

export default RescheduleAppointment;

const styles = ScaledSheet.create({
  mainContainer: {
    backgroundColor: WHITE,
    flex: 1,
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: '50@s',
    flex: 1,
  },
});
