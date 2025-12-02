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
  FlatList,
} from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { AllHeader } from '../../../components/header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerActions, useFocusEffect } from '@react-navigation/native';
import { Input, useInputState } from '../../../components/inputs/textInput';
import { BLACK, RED_COLOR, WHITE, WHITE_10 } from '../../../util/color';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'react-native-image-picker';
import GlobalStyle from '../../../util/styles';
import { DrawerParamList } from '../../../navigations/drawerNavigation';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { useApi } from '../../../methods/apiClient';
import { endpoints } from '../../../methods/endpoints';
import { RootState } from '../../../store';
import Icons from '../components/Icons';
import Slots from './components/Slots';
import ReviewCard from './components/ReviewCard';
import { SafeAreaView } from 'react-native-safe-area-context';

// type Props = NativeStackScreenProps<HomeStackScreenType, 'MainHomeScreen'> & DrawerScreenProps<RootDrawerType>;
type StackProps = DrawerScreenProps<DrawerParamList, 'Profile'>;

const SCREEN_WIDTH = Dimensions.get('screen').width;

export type Degree = {
  degreeName: string;
};

export type ClinicTimings = {
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
};

export type Doctor = {
  id?: string;
  name?: string;
  email?: string;
  cnic?: string;
  gender?: string;
  address?: string;
  age?: string;
  contact?: string;
  pmdcNumber?: string;
  workExperience?: number | null;
  specialties?: string | null;
  fees?: number | null;
  about?: string;
  profile_picture?: string;
  degrees?: Degree[];
  clinic_timings?: ClinicTimings;
};

const Profile = ({ navigation }: StackProps) => {
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState([
    { name: 'Monday', isSelected: true },
    { name: 'Tuesday', isSelected: true },
    { name: 'Wednesday', isSelected: true },
    { name: 'Thursday', isSelected: true },
    { name: 'Friday', isSelected: true },
    { name: 'Saturday', isSelected: true },
    { name: 'Sunday', isSelected: false },
  ]);
  // array of time with is selected or not selected useStates {name,isSelected} 3 hr slots 09:00-12:00, 12:00-03:00, 03:00-06:00
  const [time, setTime] = useState([
    { name: '09:00-12:00', isSelected: true },
    { name: '12:00-03:00', isSelected: true },
    { name: '03:00-06:00', isSelected: true },
    { name: '06:00-09:00', isSelected: false },
    { name: '09:00-12:00', isSelected: true },
  ]);
  const [doctor, setDoctor] = useState<Doctor>({});
  const [reviews, setReviews] = useState([]);
  const user = useSelector((state: RootState) => state?.auth?.user);
  const { POST } = useApi();

  const fetchDoctorDetails = async () => {
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append('id', user?.id);
      const res = await POST(endpoints?.fetchDetails, formdata);
      if (res?.status) {
        // console.log("Successfully fetched doctor's details", res?.data);
        setDoctor(res?.data);
      } else {
        console.log("Failed to fetch doctor's details", res?.message);
      }
    } catch (error) {
      console.log("Error fetching doctor's details", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const formdata = new FormData();
      formdata.append('doctorId', user?.id);
      const res = await POST(endpoints?.getDoctorReviews, formdata);
      if (res?.status) {
        console.log("Successfully fetched doctor's reviews", res?.data);
        setReviews(res?.data);
      } else {
        console.log("Failed to fetch doctor's reviews", res?.message);
      }
    } catch (error) {
      console.log("Error fetching doctor's reviews", error);
    }
  };

  useFocusEffect(
    useCallback(()=>{
      fetchDoctorDetails();
    fetchReviews();
    },[])
  );


  const Header = () => (
    <View>
      <StatusBar backgroundColor={RED_COLOR} />
      {/* Top bar */}
      <View
        style={{
          backgroundColor: RED_COLOR,
          width: SCREEN_WIDTH,
          paddingVertical: 10,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}
        >
          <Icon name="arrow-left" size={scale(15)} color={WHITE} />
        </Pressable>
      </View>

      {/* Header card */}
      <View
        style={{
          width: '100%',
          borderBottomEndRadius: scale(20),
          borderBottomStartRadius: scale(20),
          backgroundColor: RED_COLOR,
          alignItems: 'center',
          paddingBottom: scale(16),
        }}
      >
        <Image
          source={{ uri: doctor?.profile_picture }}
          style={{
            width: scale(166),
            height: scale(166),
            borderRadius: scale(10),
            marginTop: -scale(50), // you can adjust if desired
          }}
        />

        <Text
          style={{
            color: WHITE,
            textAlign: 'center',
            fontSize: scale(18),
            marginVertical: scale(5),
          }}
        >
          {doctor?.name}
        </Text>

        <Text
          style={{
            color: WHITE,
            textAlign: 'center',
            fontSize: scale(14),
            marginVertical: scale(5),
          }}
        >
          Psychiatrist
        </Text>

        <Text
          style={{
            color: WHITE,
            textAlign: 'center',
            fontSize: scale(14),
            marginVertical: scale(5),
          }}
        >
          {doctor?.degrees?.map((d) => d?.degreeName)?.join(', ')}
        </Text>
      </View>

      {/* Icons & About & Slots */}
      <View style={{ width: '90%', alignSelf: 'center', marginTop: scale(10) }}>
        <Icons />
        <Text
          style={{
            fontSize: scale(14),
            color: BLACK,
            marginVertical: scale(10),
          }}
        >
          About Doctor
        </Text>

        <Text
          style={{
            fontSize: scale(10),
            color: BLACK,
            marginVertical: scale(10),
          }}
        >
          Hello, I'm Dr. {doctor?.name}. With over 15 years of experience in
          Psychiatry, I'm here to provide you with personalized, patient-centered care. I believe in strong doctor-patient
          relationships, and my commitment to your well-being is unwavering.
        </Text>

        <Slots timings={doctor?.clinic_timings} />
      </View>

      {/* section title for reviews */}
      <View style={{ width: '90%', alignSelf: 'center', marginTop: scale(12) }}>
        <Text
          style={{
            fontSize: scale(14),
            color: BLACK,
            marginVertical: scale(10),
          }}
        >
          Reviews
        </Text>
      </View>
    </View>
  );

  const Footer = () => (
    <View style={{ width: '100%', alignItems: 'center', marginTop: scale(10), marginBottom: scale(30) }}>
      <Pressable
        style={[GlobalStyle.filedButton, { width: '90%' }]}
        onPress={() => navigation.navigate("EditProfile", {auth : false})}
      >
        <Text style={GlobalStyle.filedButtonText}>Edit Profile</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <FlatList
        data={reviews.reviews}
        keyExtractor={(item, index) => (item?.id ?? index).toString()}
        renderItem={({ item }) => (
          <ReviewCard
            patientName={item.patientName}
            profilePicture={item.profilePicture}
            rating={item.rating}
            comment={item.comment}
            date={item.date}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={Header}
        ListFooterComponent={Footer}
        contentContainerStyle={{
          // ensures footer/button is reachable above bottom nav or safe area
          paddingBottom: scale(40),
        }}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
}


export default Profile;

const styles = ScaledSheet.create({
  mainContainer: {
    backgroundColor: WHITE,
  },
  container: {
    width: '90%',
    backgroundColor: 'blue',
    alignSelf: 'center',
    marginTop: '50@s',
  },
});
