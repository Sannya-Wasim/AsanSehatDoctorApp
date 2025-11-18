import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { BLACK, RED_COLOR, WHITE, WHITE_10 } from '../../../../util/color';
import Icon from 'react-native-vector-icons/Feather';
import GlobalStyle from '../../../../util/styles';
import { DrawerParamList } from '../../../../navigations/drawerNavigation';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type ClinicTimings = {
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
};

const defaultClinicTimings: ClinicTimings = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
};

const Slots = ({ timings = defaultClinicTimings as ClinicTimings }) => {
  const days = Object.entries(timings).map(([day, timings]) => ({
    day: (day.charAt(0).toUpperCase() + day.slice(1)).slice(0, 3),
    isSelected: timings.length > 0,
  }));

  const toMinutes = (time: string) => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };

  const rangesOverlap = (slot: string, doctorTime: string) => {
    const [sStart, sEnd] = slot.split('-').map(toMinutes);
    const [dStart, dEnd] = doctorTime.split('-').map(toMinutes);

    return dStart < sEnd && dEnd > sStart;
  };

  const buildSlots = (
    slotTemplates: { name: string; isSelected: boolean }[],
    doctorTimings: string[],
  ) => {
    return slotTemplates.map(slot => {
      const selected = doctorTimings.some(dt => rangesOverlap(slot.name, dt));

      return {
        ...slot,
        isSelected: selected,
      };
    });
  };

  const defaultSlots = [
    { name: '09:00-12:00', isSelected: false },
    { name: '12:00-03:00', isSelected: false },
    { name: '03:00-06:00', isSelected: false },
    { name: '06:00-09:00', isSelected: false },
    { name: '09:00-12:00', isSelected: false },
  ];

  const finalSlots = buildSlots(defaultSlots, timings?.monday);

  return (
    <View style={styles.mainContainer}>
      <View style={{ marginVertical : scale(10) }}>
        <Text style={{ fontSize: scale(16), color: BLACK }}>Availbility</Text>
        <Text style={{ fontSize: scale(10), color: BLACK }}>
          Days of availability
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {days?.map((item, index) => (
            <Pressable
              key={index}
              style={[
                styles?.button,
                { backgroundColor: item.isSelected ? RED_COLOR : WHITE },
              ]}
            >
              <Text
                style={{
                  color: item.isSelected ? WHITE : BLACK,
                  textAlign: 'center',
                  // fontSize : scale(10)
                }}
              >
                {item?.day}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text
          style={{
            fontSize: scale(10),
            color: BLACK,
            marginVertical: scale(10),
          }}
        >
          Available slots
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {finalSlots.map((item, index) => (
            <Pressable
              key={index}
              style={[
                styles?.button,
                { backgroundColor: item.isSelected ? RED_COLOR : WHITE },
              ]}
            >
              <Text
                style={{
                  color: item.isSelected ? WHITE : BLACK,
                  textAlign: 'center',
                  fontSize: scale(10),
                }}
              >
                {item.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Slots;

const styles = ScaledSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    // height: Dimensions.get('screen').height,
  },
  button: {
    borderWidth: 1,
    borderColor: RED_COLOR,
    borderRadius: scale(5),
    //   flexBasis: '30%',
    marginVertical: scale(2),
    marginHorizontal: scale(2),
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(7),
    paddingVertical: scale(2),
  },
});
