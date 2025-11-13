import { Image, Pressable, Text } from 'react-native';
import { View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { BLACK, GRAY, WHITE, WHITE_10 } from '../util/color';
import GlobalStyle from '../util/styles';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';

type Props = {
  patientId: string;
  enquiryCode: string;
  doctorId: string;
  lhvCmwNurseId: string;
  marviId: string;
  appointmentDate: string; // could use Date if you parse it
  appointmentTime: string; // e.g., "HH:mm:ss"
  serviceRequest: string; // or string[] if you split it
  enquiryType: string;
  cctype: string;
  paid: string;
  pidd: string;
  operator: string;
  doctor: string;
  name: string;
  age: string; // could be number if you parse
  gender: string;
  cnic: string;
  address: string;
  status_class_name: string;
  statusName: string;
  statusId: string;
  reshceduleNav: Function | undefined;
  showButton?: boolean;
  review?: null;
  joinNav?: Function | undefined;
};

const Appointment = (props: Props) => {
  return (
    <View
      style={{
        backgroundColor: WHITE_10,
        borderColor: GRAY,
        borderWidth: 1,
        borderRadius: scale(5),
        paddingHorizontal: scale(10),
        paddingVertical: scale(20),
        marginVertical: scale(5),
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: scale(10),
          borderBottomWidth: 2,
          borderColor: WHITE_10,
          marginBottom: scale(10),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Icon name="clock" size={scale(15)} color={BLACK} />
          <Text style={{ color: BLACK, marginLeft: scale(5) }}>
            {moment(props.appointmentTime, 'HH:mm:ss').format('hh:mm A')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Icon name="calendar" size={scale(15)} color={BLACK} />
          <Text style={{ color: BLACK, marginLeft: scale(5) }}>
            {moment(props.appointmentDate, 'YYYY-MM-DD')?.format('DD-MM-YYYY')}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Image
          //   source={props.image}
          source={require('../assets/png/doctorImage.png')}
          style={{
            height: scale(90),
            width: scale(90),
            borderRadius: scale(5),
          }}
        />
        <View style={{ marginHorizontal: scale(10) }}>
          <Text
            style={{ fontWeight: 'bold', fontSize: scale(18), color: BLACK }}
          >
            {props.name}
          </Text>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: scale(5),
              }}
            >
              <Text style={{ color: BLACK, fontSize: scale(8) }}>
                Symptoms:
              </Text>

              <View style={{ flexDirection: 'row', marginLeft: scale(5) }}>
                {['Fever', 'Cold', 'Flu'].map((item, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: 'rgba(18,88,161,0.3)',
                      borderColor: '#1256A1',
                      borderWidth: 1,
                      marginHorizontal: scale(2),
                      padding: scale(3),
                      borderRadius: scale(5),
                    }}
                  >
                    <Text style={{ color: BLACK, fontSize: scale(8) }}>
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text style={{ color: BLACK, fontSize: scale(8) }}>
                Condition:
              </Text>

              <Text
                style={{
                  color: BLACK,
                  fontSize: scale(8),
                  marginLeft: scale(10),
                  flexWrap: 'wrap',
                  textAlign: 'left',
                  flexBasis: '50%',
                }}
              >
                {props.serviceRequest}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {props.showButton ? (
        <View style={{ flexDirection: 'row' }}>
          <Pressable
            onPress={() =>
              props?.reshceduleNav ? props?.reshceduleNav() : null
            }
            style={[
              GlobalStyle.outlinedButton,
              {
                marginTop: scale(10),
                flex: 1,
                padding: scale(5),
                marginHorizontal: scale(2),
              },
            ]}
          >
            <Text
              style={[GlobalStyle.outlinedButtonText, { fontSize: scale(10) }]}
            >
              Reschedule Appointment
            </Text>
          </Pressable>

          <Pressable
            onPress={() => (props?.joinNav ? props?.joinNav() : null)}
            style={[
              GlobalStyle.filedButton,
              {
                marginTop: scale(10),
                flex: 1,
                padding: scale(5),
                marginHorizontal: scale(2),
              },
            ]}
          >
            <Text
              style={[GlobalStyle.filedButtonText, { fontSize: scale(10) }]}
            >
              Joint Appointment
            </Text>
          </Pressable>
        </View>
      ) : //  : props.review ? (
      //   <View
      //     style={{
      //       borderTopWidth: 1,
      //       borderColor: WHITE_10,
      //       marginVertical: scale(5),
      //     }}
      //   >
      //     <Text
      //       style={{ color: BLACK, fontSize: scale(12), marginTop: scale(5) }}
      //     >
      //       Rating & Review
      //     </Text>
      //     <Text style={{ color: BLACK, textAlign: 'justify' }}>
      //       {props.review}
      //     </Text>
      //   </View>
      // )
      null}
    </View>
  );
};

export default Appointment;
