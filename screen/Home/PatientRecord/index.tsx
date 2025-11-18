import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { AllHeader } from '../../../components/header';
import ToggleButton from './components/toggleButton';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../../../navigations/drawerNavigation';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { RED_COLOR, WHITE } from '../../../util/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { config } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecordCard from './components/record';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import { POST } from '../../../methods/apiClient';
import { endpoints } from '../../../methods/endpoints';

type HomeStack = DrawerScreenProps<DrawerParamList, 'Appointments'>;

type Props = HomeStack;

const PatientRecord = ({ navigation, route }: Props) => {
  const patientId = route?.params
  const user = useSelector((state : RootState) => state?.auth?.user)
  const [toggle, setToggle] = useState<'reports' | 'prescriptions'>(
    'prescriptions',
  );
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);

  const fetchFollowups = async () => {
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata?.append('patientId', patientId);
      const res = await POST(endpoints?.getFollowups, formdata)
      console.log('res', res);
      if (res?.status) {
        console.log("Patient's record fetched successfully", res?.data);
        setRecords(res?.data);
      } else {
        console.log("Fetching patient's record failed", res?.message);
      }
    } catch (error) {
      console.log("Error fetching patient's record", error);
    } finally {
      setLoading(false);
    }
  };

  const EmptyComponent = ({ text }: { text: string }) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: scale(24),
            fontWeight: 'bold',
            color: RED_COLOR,
          }}
        >
          {text}
        </Text>
      </View>
    );
  };

  const RenderContent = () => {
    if (toggle === 'prescriptions') {
      return (
        <FlatList
          data={records}
          renderItem={({ item, index }) => (
            <RecordCard record={item} index={index} />
          )}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{
            marginBottom: scale(20),
          }}
        />
      );
    } else {
      return (
        <FlatList
          data={reports}
          renderItem={({ item, index }) => (
            <RecordCard record={item} index={index} />
          )}
          style={{
            marginBottom: scale(20),
          }}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={<EmptyComponent text="No reports for now!" />}
        />
      );
    }
  };

  useEffect(() => {
    fetchFollowups();
  }, []);
  return (
    <SafeAreaView style={styles?.container}>
      <StatusBar backgroundColor={WHITE} />
      <AllHeader
        title="Patient's Record"
        back={() => navigation?.navigate('JoinAppointment')}
      />
      <View style={styles?.content}>
        <ToggleButton toggle={toggle} setToggle={setToggle} />
        {loading ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size={'large'} color={RED_COLOR} />
          </View>
        ) : (
          <RenderContent />
        )}
      </View>
    </SafeAreaView>
  );
};

export default PatientRecord;

const styles = ScaledSheet?.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    top: scale(25),
  },
  content: {
    marginTop: scale(30),
    padding: scale(10),
    // backgroundColor : "blue",
    flex: 1,
  },
});
