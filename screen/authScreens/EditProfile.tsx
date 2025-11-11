import { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  TextInput,
  ScrollView,
  StatusBar,
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
};

const EditProfile = ({ navigation }: any) => {
  const { control, handleSubmit, setValue } = useForm<FormValues>({
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

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'degrees',
  });

  const [days, setDays] = useState([
    { name: 'Mon', isSelected: false },
    { name: 'Tue', isSelected: false },
    { name: 'Wed', isSelected: false },
    { name: 'Thu', isSelected: false },
    { name: 'Fri', isSelected: false },
    { name: 'Sat', isSelected: false },
    { name: 'Sun', isSelected: false },
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
        update(index, {
          ...fields[index],
          image: {
            uri: data?.assets[0]?.uri,
            name: data?.assets[0]?.fileName,
            type: data?.assets[0]?.type,
          },
        });
      };

      if (type === 'capture') {
        ImagePicker.launchCamera(options, callback);
      } else {
        ImagePicker.launchImageLibrary(options, callback);
      }
    },
    [fields, update],
  );

  const editProfile = async (data: FormValues) => {
    const userId = await AsyncStorage.getItem('userId');
    console.log('userId', userId ?? 3785);
    console.log('Form Data', data);
    // console.log(
    //   'Days selected',
    //   days.filter(d => d.isSelected),
    // );
    // console.log(
    //   'Time selected',
    //   time.filter(t => t.isSelected),
    // );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        translucent
        backgroundColor={WHITE}
        barStyle={'dark-content'}
      />
      <View style={styles.header}>
        <Text
          style={{ color: RED_COLOR, fontSize: scale(20), fontWeight: 'bold' }}
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
        >
          <Text style={{ fontSize: scale(16), color: BLACK }}>
            Personal Information
          </Text>

          {/* Name */}
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                inputState={{ value, onChangeText: onChange }}
                placeholder="Full Name"
                label={null}
              />
            )}
          />

          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                inputState={{ value, onChangeText: onChange }}
                placeholder="Email address"
                keyboardType="email-address"
                label={null}
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
                name={nameField}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
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
            name="about"
            render={({ field: { onChange, value } }) => (
              <Input
                style={[styles.input, { height: scale(100) }]}
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
            name="specialties"
            render={({ field: { value, onChange } }) => (
              <Input
                inputState={{ value, onChangeText: onChange }}
                placeholder="Specialties"
                label={null}
              />
            )}
          />

          {/* Degrees */}
          {fields.map((item, index) => (
            <View
              key={item.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: scale(5),
              }}
            >
              {fields.length > 1 && (
                <Pressable
                  style={{
                    backgroundColor: RED_COLOR,
                    padding: scale(5),
                    borderRadius: scale(5),
                  }}
                  onPress={() => remove(index)}
                >
                  <Icon name="trash" size={20} color={WHITE} />
                </Pressable>
              )}
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
                  Upload
                </Text>
              </Pressable>
            </View>
          ))}

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
              { position: 'absolute', bottom: scale(20) },
            ]}
            onPress={handleSubmit(editProfile)}
          >
            <Text style={GlobalStyle.filedButtonText}>Submit</Text>
          </Pressable>
          <View style={{ height: scale(100) }} />
        </ScrollView>
      </View>
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
