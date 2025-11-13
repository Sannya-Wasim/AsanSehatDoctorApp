import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { AllHeader } from '../../../components/header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';

import { Input, useInputState } from '../../../components/inputs/textInput';
import { BLACK, RED_COLOR, WHITE, WHITE_10 } from '../../../util/color';
import GlobalStyle from '../../../util/styles';

import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import { DrawerParamList } from '../../../navigations/drawerNavigation';
import Appointment from '../../../components/apointments';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Call from './components/call';

// type Props = NativeStackScreenProps<HomeStackScreenType, 'MainHomeScreen'> ;
type HomeStack = DrawerScreenProps<DrawerParamList, 'JoinAppointment'>;

type Props = HomeStack;

const JoinAppointment = ({ navigation, route }: Props) => {
  const { params } = route;
  const [call, setCall] = useState(true)
  

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'transparent'}
      />
    {call && <Call navigation={navigation} setShow={setCall}/>}
    </View>
  );
};

export default JoinAppointment;
