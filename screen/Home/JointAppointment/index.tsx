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
import Prescription from './components/prescription';
import CustomModal from '../../../components/modal';

// type Props = NativeStackScreenProps<HomeStackScreenType, 'MainHomeScreen'> ;
type HomeStack = DrawerScreenProps<DrawerParamList, 'JoinAppointment'>;

type Props = HomeStack;

const JoinAppointment = ({ navigation, route }: Props) => {
  const { params } = route;
  // console.log("params", params)
  const [call, setCall] = useState(true);
  const [success, setSuccess] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={call}
        backgroundColor={call ? 'transparent' : WHITE}
      />
      {call ? (
        <Call navigation={navigation} setShow={setCall} patientDetails={params}/>
      ) : success ? (
        <CustomModal
          show={success}
          setShow={setSuccess}
          title="Submitted Successfully"
          text="Your prescription has been submitted successfully"
          type="prescription"
          navigation={navigation}
          buttonText={'Back to Home'}
        />
      ) : (
        <Prescription
          navigation={navigation}
          patientId={params?.patientId}
          setModal={setSuccess}
        />
      )}
    </View>
  );
};

export default JoinAppointment;
