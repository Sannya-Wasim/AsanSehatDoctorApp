import { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  TextInput,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet, scale } from 'react-native-size-matters';
import {
  BLACK,
  BLUE,
  GRAY,
  RED_COLOR,
  WHITE,
  WHITE_10,
} from '../../util/color';
import { useInputState, Input } from '../../components/inputs/textInput';
import {
  usePasswordInputState,
  PasswordInput,
} from '../../components/inputs/passwordInput';
import GlobalStyle from '../../util/styles';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../../navigations/drawerNavigation';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { config } from '../../config';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useApi } from '../../methods/apiClient';
import { endpoints } from '../../methods/endpoints';

type Props = DrawerScreenProps<DrawerParamList, 'EditProfile'>;

type FormValues = {
  name: string;
  email: string;
  age: string;
  experience: string;
  fee: string;
  about: string;
  specialties: string;
  degrees: { degree: string; image: any }[];
  userId?: string | undefined;
};

const EditProfile = ({ navigation, route }: any) => {
  const { auth } = route?.params;
  console.log('auth', auth);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state?.auth?.user);
  const { POST } = useApi();
  const [doctor, setDoctor] = useState({});
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      age: '',
      experience: '',
      fee: '',
      about: '',
      specialties: '',
      degrees: [{ degree: '', image: null }],
    },
  });
  const fetchDoctorDetails = async () => {
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append('id', user?.id);

      const res = await POST(endpoints?.fetchDetails, formdata);

      if (res?.status) {
        console.log("Successfully fetched doctor's details", res?.data);
        setDoctor(res?.data);

        if (!auth) {
          reset({
            name: res?.data?.name || '',
            email: res?.data?.email || '',
            age: res?.data?.age || '',
            experience: res?.data?.workExperience || '',
            fee: res?.data?.fees || '',
            about: res?.data?.about || '',
            specialties: res?.data?.specialties || '',
            degrees: res?.data?.degrees?.length
              ? res?.data?.degrees.map(d => ({
                  degree: d.degreeName || '',
                  image: null,
                }))
              : [{ degree: '', image: null }],
          });
        }
      } else {
        console.log("Failed to fetch doctor's details", res?.message);
      }
    } catch (error) {
      console.log("Error fetching doctor's details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorDetails();
  }, []);

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'degrees',
  });

  const watchedDegrees = watch('degrees');

  const [days, setDays] = useState([
    { name: 'Mon', value: 'monday[]', isSelected: false },
    { name: 'Tue', value: 'tuesday[]', isSelected: false },
    { name: 'Wed', value: 'wednesday[]', isSelected: false },
    { name: 'Thu', value: 'thursday[]', isSelected: false },
    { name: 'Fri', value: 'friday[]', isSelected: false },
    { name: 'Sat', value: 'saturday[]', isSelected: false },
    { name: 'Sun', value: 'sunday[]', isSelected: false },
  ]);

  const [time, setTime] = useState([
    { name: '09:00-12:00', isSelected: false },
    { name: '12:00-03:00', isSelected: false },
    { name: '03:00-06:00', isSelected: false },
    { name: '06:00-09:00', isSelected: false },
    { name: '09:00-12:00', isSelected: false },
  ]);

  const onButtonPressDegree = useCallback(
    (
      type: string,
      options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions,
      index: number,
    ) => {
      const callback = (data: any) => {
        // ✅ Get the current field values from the form state
        const currentValues = getValues(`degrees.${index}`);

        // ✅ Update only the image, keeping the existing degree name intact
        update(index, {
          ...currentValues,
          image: {
            uri: data?.assets?.[0]?.uri,
            name: data?.assets?.[0]?.fileName,
            type: data?.assets?.[0]?.type,
          },
        });
      };

      if (type === 'capture') {
        ImagePicker.launchCamera(options, callback);
      } else {
        ImagePicker.launchImageLibrary(options, callback);
      }
    },
    [update, getValues],
  );

  const fillProfile = (data: FormValues) => {
    const formData = new FormData();
    formData?.append('id', data?.userId);
    formData?.append('name', data?.name);
    formData?.append('contact', '0987654321');
    formData?.append('email', data?.email);
    formData?.append('gender', '');
    formData?.append('dob', '');
    formData?.append('about', data?.about);
    formData?.append('fees', data?.fee);
    formData?.append('age', data?.age);
    formData?.append('experience', data?.experience);
    formData?.append('specialties', data?.specialties);
    data?.degrees?.forEach((_d: { degree: string; image: any }) => {
      formData?.append('degreeName[]', _d?.degree);
      formData?.append('degreeFile[]', _d?.image);
    });
    return formData;
  };

  const fillSlots = () => {
    // console.log(
    //   'Days selected',
    //   days.filter(d => d.isSelected),
    // );
    // console.log(
    //   'Time selected',
    //   time.filter(t => t.isSelected)?.map(t => t?.name),
    // );
    const selectedDays = days.filter(d => d.isSelected);
    const selectedTimes = time.filter(t => t.isSelected).map(t => t.name);

    const result: any = {};

    selectedDays.forEach(d => {
      result[d.value] = selectedTimes; // dynamic key using []
    });

    console.log(result);
  };

  const updateTimes = async () => {
    try {
      const formdata = new FormData();
      formdata?.append('id', user?.id);
      const selectedTimes = time.filter(t => t.isSelected).map(t => t.name);
      days.forEach(d => {
        formdata?.append(
          d?.value,
          d?.isSelected ? JSON?.stringify(selectedTimes) : 'off',
        );
      });
      console.log('formdata', formdata);
      const res = await POST(endpoints?.clinicTimings, formdata);
      if (res?.status) {
        console.log('Clinic times updated successfully', res?.data);
        auth
          ? navigation.navigate('Auth', {
              screen: 'UploadPicture',
            })
          : navigation.goBack();
      } else {
        console.log('Failed to update clinic times', res?.message);
        ToastAndroid?.show(
          `Failed to update clinic times: ${res?.message}`,
          ToastAndroid?.TOP,
        );
      }
    } catch (error) {
      console.log('Error updating times', error);
      ToastAndroid?.show(`Error updating times: ${error}`, ToastAndroid?.TOP);
    }
  };

  const editProfile = async (data: FormValues) => {
    setLoading(true);
    try {
      console.log('data', data);
      const formData = fillProfile({ ...data, userId: user?.id });
      console.log('Form data', formData);
      const res = await POST(endpoints?.editProfile, formData);
      if (res?.status) {
        console.log('Profile updated successfully', res);
        await updateTimes();
      } else {
        console.log('Profile update failed', res?.message);
        ToastAndroid?.show(
          `Failed to update profile: ${res?.message}`,
          ToastAndroid?.TOP,
        );
      }
    } catch (error) {
      console.log('Error updating profile', error);
      ToastAndroid?.show(`Error updating profile: ${error}`, ToastAndroid?.TOP);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        translucent
        backgroundColor={WHITE}
        barStyle={'dark-content'}
      />
      <KeyboardAvoidingView
        behavior={Platform?.OS === 'ios' ? 'height' : 'padding'}
      >
        <View style={styles.header}>
          <Text
            style={{
              color: RED_COLOR,
              fontSize: scale(20),
              fontWeight: 'bold',
            }}
          >
            Register as a Doctor
          </Text>
          <Text style={{ marginTop: scale(10) }}>
            Kindly fill out this form to register as a doctor.
          </Text>
        </View>
        <View style={styles.container}>
          <ScrollView
            style={{ width: '100%', alignSelf: 'center', marginTop: scale(5) }}
            contentContainerStyle={{ paddingBottom: scale(40) }}
          >
            <Text style={{ fontSize: scale(16), color: BLACK }}>
              Personal Information
            </Text>

            {/* Name */}
            <Controller
              control={control}
              name="name"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Input
                  inputState={{ value, onChangeText: onChange }}
                  placeholder="Full Name"
                  label={null}
                  inputStyle={{ borderColor: errors?.name ? RED_COLOR : GRAY }}
                />
              )}
            />

            {/* Email */}
            <Controller
              control={control}
              rules={{ required: true }}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input
                  inputState={{ value, onChangeText: onChange }}
                  placeholder="Email address"
                  keyboardType="email-address"
                  label={null}
                  inputStyle={{ borderColor: errors?.email ? RED_COLOR : GRAY }}
                />
              )}
            />

            {/* Age, Experience, Fee */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {(
                ['age', 'experience', 'fee'] as (keyof Pick<
                  FormValues,
                  'age' | 'experience' | 'fee'
                >)[]
              ).map((nameField, i) => (
                <Controller
                  key={i}
                  control={control}
                  rules={{ required: true }}
                  name={nameField}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[
                        styles.input,
                        { borderColor: errors?.[nameField] ? RED_COLOR : GRAY },
                      ]}
                      value={value}
                      onChangeText={onChange}
                      placeholder={
                        nameField.charAt(0).toUpperCase() + nameField.slice(1)
                      }
                      placeholderTextColor={GRAY}
                      keyboardType="number-pad"
                    />
                  )}
                />
              ))}
            </View>

            {/* About */}
            <Controller
              control={control}
              rules={{ required: true }}
              name="about"
              render={({ field: { onChange, value } }) => (
                <Input
                  inputStyle={[styles.input, { height: scale(100) }]}
                  placeholder="About"
                  placeholderTextColor={GRAY}
                  multiline
                  numberOfLines={5}
                  inputState={{ value, onChangeText: onChange }}
                  onChangeText={onChange}
                  textAlignVertical="top"
                  label={null}
                />
              )}
            />

            {/* Specialties */}
            <Controller
              control={control}
              rules={{ required: true }}
              name="specialties"
              render={({ field: { value, onChange } }) => (
                <Input
                  inputState={{ value, onChangeText: onChange }}
                  placeholder="Specialties"
                  label={null}
                  inputStyle={{
                    borderColor: errors?.specialties ? RED_COLOR : GRAY,
                  }}
                />
              )}
            />

            {/* Degrees */}
            {fields.map((item, index) => {
              const degree = watchedDegrees?.[index]?.degree;
              const image = watchedDegrees?.[index]?.image;
              return (
                <View
                  key={item.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: scale(5),
                  }}
                >
                  <Controller
                    control={control}
                    name={`degrees.${index}.degree`}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Degree"
                        placeholderTextColor={GRAY}
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />

                  <Pressable
                    onPress={() =>
                      onButtonPressDegree(
                        'library',
                        {
                          selectionLimit: 0,
                          mediaType: 'photo',
                          includeBase64: false,
                        },
                        index,
                      )
                    }
                    style={{
                      flex: 1,
                      backgroundColor: WHITE,
                      borderWidth: 1,
                      borderColor: GRAY,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: scale(10),
                      borderRadius: scale(5),
                      flexDirection: 'row',
                    }}
                  >
                    <Icon name="paperclip" size={scale(12)} color={GRAY} />
                    <Text style={{ color: GRAY, marginLeft: scale(5) }}>
                      {image?.name || 'Upload'}
                    </Text>
                  </Pressable>
                  {/* ✅ Only show delete if there's something to delete */}
                  {(degree || image) && (
                    <Pressable
                      style={{
                        backgroundColor: RED_COLOR,
                        padding: scale(5),
                        borderRadius: scale(5),
                        margin: scale(5),
                      }}
                      onPress={() => {
                        if (fields.length > 1) {
                          remove(index);
                        } else {
                          // 🧹 Reset first field if it's the only one left
                          setValue(`degrees.${0}.degree`, '');
                          setValue(`degrees.${0}.image`, null);
                        }
                      }}
                    >
                      <Icon name="trash" size={20} color={WHITE} />
                    </Pressable>
                  )}
                </View>
              );
            })}

            <Pressable
              style={{
                marginBottom: scale(20),
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => append({ degree: '', image: null })}
            >
              <FAIcon name="plus-circle" size={20} color={BLACK} />
              <Text style={{ marginLeft: scale(10) }}>Add another degree</Text>
            </Pressable>

            {/* Days */}
            <Text style={{ fontSize: scale(16), color: BLACK }}>
              Availability
            </Text>
            <Text style={{ fontSize: scale(10), color: BLACK }}>
              Select your days of availability
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {days.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    backgroundColor: item.isSelected ? RED_COLOR : WHITE,
                    borderWidth: 1,
                    borderColor: RED_COLOR,
                    borderRadius: scale(5),
                    flexBasis: '12%',
                    marginVertical: scale(5),
                    marginHorizontal: scale(2),
                    alignContent: 'center',
                    justifyContent: 'center',
                    paddingVertical: scale(3),
                  }}
                  onPress={() =>
                    setDays(prev =>
                      prev.map((d, i) =>
                        i === index ? { ...d, isSelected: !d.isSelected } : d,
                      ),
                    )
                  }
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

            {/* Time */}
            <Text
              style={{
                fontSize: scale(10),
                color: BLACK,
                marginVertical: scale(8),
              }}
            >
              Select your Available slots
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {time.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    backgroundColor: item.isSelected ? RED_COLOR : WHITE,
                    borderWidth: 1,
                    borderColor: RED_COLOR,
                    borderRadius: scale(5),
                    flexBasis: '20%',
                    marginVertical: scale(2),
                    marginHorizontal: scale(4),
                    alignContent: 'center',
                    justifyContent: 'center',
                    paddingVertical: scale(3),
                  }}
                  onPress={() =>
                    setTime(prev =>
                      prev.map((t, i) =>
                        i === index ? { ...t, isSelected: !t.isSelected } : t,
                      ),
                    )
                  }
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

            {/* Submit Button */}
            <Pressable
              style={[
                GlobalStyle.filedButton,
{                marginTop : scale(20)}
                // { position: 'absolute', bottom: scale(20) },
              ]}
              onPress={handleSubmit(editProfile)}
              // onPress={fillSlots}
            >
              {loading ? (
                <ActivityIndicator size={'small'} color={WHITE} />
              ) : (
                <Text style={GlobalStyle.filedButtonText}>Submit</Text>
              )}
            </Pressable>
            <View style={{ height: scale(100) }} />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = ScaledSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    height: Dimensions.get('screen').height,
  },
  header: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: '15@s',
  },
  container: {
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: '30@s',
  },
  skipButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // marginVertical: '5@s',
    marginHorizontal: '7@s',
  },
  skipButton: {
    backgroundColor: WHITE,
    paddingVertical: '10@s',
    paddingHorizontal: '30@s',
  },
  skipButtonText: {
    color: RED_COLOR,
  },
  logo: {
    width: '195@s',
    height: '100@s',
    // marginBottom: "40@s",
    marginVertical: '50@s',
  },
  mainText: {
    fontSize: '24@s',
    fontWeight: 'bold',
    color: 'black',
    marginVertical: '10@s',
  },
  text: {
    fontSize: '12@s',
    fontWeight: '300',
    color: 'black',
    marginVertical: '5@s',
  },
  forgotContainer: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  forgotButton: {
    backgroundColor: WHITE,
    paddingVertical: '5@s',
    paddingHorizontal: '10@s',
  },
  forgotButtonText: {
    color: BLUE,
  },
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    marginVertical: '10@s',
    justifyContent: 'center',
  },
  signupButton: {
    backgroundColor: WHITE,
    paddingVertical: '5@s',
    paddingHorizontal: '10@s',
  },
  signupButtonText: {
    color: BLUE,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: '5@s',
    borderColor: GRAY,
    marginRight: '5@s',
    paddingHorizontal: '10@s',
  },
});
