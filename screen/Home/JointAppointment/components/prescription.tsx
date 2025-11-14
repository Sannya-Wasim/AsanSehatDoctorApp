import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { prescriptionStyles as styles } from '../styles';
import { AllHeader } from '../../../../components/header';
import GlobalStyle from '../../../../util/styles';
import { scale } from 'react-native-size-matters';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Input } from '../../../../components/inputs/textInput';
import { BLACK, GRAY, RED_COLOR, WHITE } from '../../../../util/color';
import Icon from 'react-native-vector-icons/Feather';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { config } from '../../../../config';
import { ScrollView } from 'react-native-gesture-handler';

type IFormInput = {
  symptoms: string;
  labTests: string;
  followupDate: Date;
  prescriptions: {
    id?: string;
    medicineName: string;
    quantity: string;
    duration: string;
    remarks: string;
  }[];
  instructions: string;
  userId?: string | null;
};

const Prescription = ({
  navigation,
  patientId,
  setModal
}: {
  navigation: any;
  patientId: string;
  setModal : Function
}) => {
  const [calendar, setCalendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IFormInput>({
    defaultValues: {
      symptoms: '',
      labTests: '',
      followupDate: new Date(),
      prescriptions: [
        {
          medicineName: '',
          quantity: '01',
          duration: '',
          remarks: 'Before Food',
        },
      ],
      instructions: '',
    },
  });
  const { fields, append, remove, update } = useFieldArray({
    control: control,
    name: 'prescriptions',
  });

  const watchPrescriptions = watch('prescriptions');
  const watchedDate = watch('followupDate');

  const toggleCalendar = () => {
    setCalendar(true);
  };

  const fillForm = (data: IFormInput) => {
    const formdata = new FormData();
    formdata?.append('id', data?.userId);
    formdata?.append('patientId', patientId);
    formdata?.append('doctorId', data?.userId);
    const labTestsArray = data?.labTests?.split(',')?.filter(_l => _l !== '');
    labTestsArray?.forEach(lbt => {
      formdata?.append('labTests[]', lbt);
    });
    const symptomsArray = data?.symptoms?.split(',')?.filter(_s => _s !== '');
    symptomsArray?.forEach(sym => {
      formdata?.append('symptoms[]', sym);
    });
    formdata?.append(
      'nextFollowupDate',
      data?.followupDate?.toLocaleDateString(),
    );
    formdata?.append('prescriptions', JSON?.stringify(data?.prescriptions));
    formdata?.append('instructions', data?.instructions);
    return formdata;
  };

  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    console.log('data', data);
    try {
      const cleaned = data.prescriptions.map(({ id, ...rest }) => rest);
      const userid = await AsyncStorage?.getItem('userId');
      const token = await AsyncStorage?.getItem('token');
      const finalData = {
        ...data,
        prescriptions: cleaned,
        userId: userid,
      };
      // console.log('data', finalData);
      // console.log(
      //   'date',
      //   moment(data?.followupDate)?.format('dddd, MMM DD, YYYY'),
      // );
      const formdata = fillForm(finalData);
      // console.log("formdata", formdata)
      const res = await axios?.post(
        `${config?.baseUrl}/doctors/addFollowup`,
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `${token}`,
          },
        },
      );
      console.log("res", res)
      if (res?.data?.status) {
        console.log('Prescription added successfully', res?.data?.data);
        setModal(true)
      } else {
        console.log('Prescription addition failed', res?.data?.message);
      }
    } catch (error) {
      console.log('Error adding prescription', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles?.container}>
      <AllHeader
        back={() => navigation?.navigate('Home')}
        title="Review Prescriptions"
      />
      {/* Content */}
      <View style={styles?.content}>
        {/* Form */}
        <ScrollView style={styles?.form}>
          {/* Symptoms */}
          <Controller
            control={control}
            name="symptoms"
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => {
              return (
                <>
                  <Text style={{ fontSize: scale(15) }}>Symptoms</Text>
                  <Input
                    inputState={{ value, onChangeText: onChange }}
                    placeholder="Cold, Cough, Fever"
                    label={null}
                    inputStyle={{
                      borderColor: errors?.symptoms ? RED_COLOR : 'transparent',
                      borderWidth: errors?.symptoms ? 1 : 0,
                      backgroundColor: 'rgb(0,0,0,0.05)',
                      marginVertical: scale(10),
                    }}
                  />
                </>
              );
            }}
          />
          {/* Prescription */}
          <Text style={{ fontSize: scale(15) }}>Prescription</Text>
          {fields?.map((item, index) => {
            const medicine = watchPrescriptions?.[index]?.medicineName;
            const quantity = Number(watchPrescriptions?.[index]?.quantity) || 0;
            const duration = watchPrescriptions?.[index]?.duration;
            const remarks = watchPrescriptions?.[index]?.remarks;

            const handleIncrease = () => {
              update(index, {
                ...item,
                quantity: String(quantity + 1),
              });
            };

            const handleDecrease = () => {
              if (quantity > 0) {
                update(index, {
                  ...item,
                  quantity: String(quantity - 1),
                });
              }
            };

            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  backgroundColor: 'rgb(0,0,0,0.05)',
                  borderRadius: scale(5),
                  justifyContent: 'space-between',
                  marginVertical: scale(10),
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <Controller
                    control={control}
                    name={`prescriptions.${index}.medicineName`}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          placeholder="Search or type for medicine"
                          placeholderTextColor={GRAY}
                          style={{
                            marginRight: scale(5),
                            padding: scale(5),
                            width: scale(120),
                            textAlignVertical: 'center',
                          }}
                        />
                      );
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: scale(10),
                    }}
                  >
                    <Pressable onPress={handleDecrease}>
                      <Icon
                        name="arrow-left"
                        style={{ marginRight: scale(5) }}
                      />
                    </Pressable>
                    <Text style={{ color: BLACK, fontSize: scale(10) }}>
                      {quantity}
                    </Text>
                    <Pressable onPress={handleIncrease}>
                      <Icon
                        name="arrow-right"
                        style={{ marginLeft: scale(5) }}
                      />
                    </Pressable>
                  </View>
                  <Text>|</Text>
                  <Controller
                    control={control}
                    name={`prescriptions.${index}.remarks`}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <TextInput
                          style={{
                            marginHorizontal: scale(5),
                            width: scale(80),
                          }}
                          placeholder={remarks}
                          value={value}
                          onChangeText={onChange}
                        />
                      );
                    }}
                  />
                </View>
                {(medicine || quantity || remarks) && (
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
                        setValue(`prescriptions.${0}.medicineName`, '');
                        setValue(`prescriptions.${0}.quantity`, '');
                        setValue(`prescriptions.${0}.remarks`, '');
                      }
                    }}
                  >
                    <Icon name="trash" size={15} color={WHITE} />
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
            onPress={() =>
              append({
                medicineName: '',
                quantity: '01',
                duration: '',
                remarks: 'Before Food',
              })
            }
          >
            <FAIcon name="plus-circle" size={20} color={BLACK} />
            <Text style={{ marginLeft: scale(10) }}>Add another degree</Text>
          </Pressable>

          {/* Instructions */}
          <Text style={{ fontSize: scale(15) }}>
            Any instructions? <Text style={{ color: GRAY }}>(If any)</Text>
          </Text>
          <Controller
            control={control}
            name="instructions"
            render={({ field: { value, onChange } }) => {
              return (
                <Input
                  inputState={{ value, onChangeText: onChange }}
                  label={null}
                  placeholder="Please write down the instructions for the patient"
                  placeholderTextColor={GRAY}
                  inputStyle={{
                    backgroundColor: 'rgb(0,0,0,0.05)',
                    textAlignVertical: 'top',
                    height: scale(80),
                    paddingLeft: scale(10),
                    marginVertical: scale(10),
                  }}
                />
              );
            }}
          />

          {/* Lab Tests */}
          <Text style={{ fontSize: scale(15) }}>
            Lab Tests <Text style={{ color: GRAY }}>(If any)</Text>
          </Text>
          <Controller
            control={control}
            name="labTests"
            render={({ field: { value, onChange } }) => {
              return (
                <Input
                  inputState={{ value, onChangeText: onChange }}
                  label={null}
                  placeholder="Please write down the recommended lab tests"
                  placeholderTextColor={GRAY}
                  inputStyle={{
                    backgroundColor: 'rgb(0,0,0,0.05)',
                    paddingLeft: scale(10),
                    marginVertical: scale(10),
                  }}
                />
              );
            }}
          />

          {/* Follow up Date */}
          <Text style={{ fontSize: scale(15) }}>
            Follow up Date <Text style={{ color: GRAY }}>(If any)</Text>
          </Text>
          <Pressable
            onPress={toggleCalendar}
            style={{
              backgroundColor: 'rgb(0,0,0,0.05)',
              padding: scale(10),
              marginVertical: scale(10),
              borderRadius: scale(5),
            }}
          >
            <Text>
              {!watchedDate
                ? 'Select Date'
                : moment(watchedDate).format('dddd, MMM DD, YYYY')}
            </Text>
          </Pressable>
          {calendar && (
            <DateTimePicker
              mode="date"
              value={watchedDate}
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || watchedDate;
                setCalendar(false); // close after selecting
                // console.log('followupDate', currentDate?.);
                setValue('followupDate', currentDate);
              }}
            />
          )}
        </ScrollView>
        {/* Button */}
        <Pressable
          style={GlobalStyle?.filedButton}
          onPress={handleSubmit(onSubmit)}
        >
          {loading ? (
            <ActivityIndicator size={'small'} color={WHITE} />
          ) : (
            <Text style={GlobalStyle?.filedButtonText}>Submit</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default Prescription;
