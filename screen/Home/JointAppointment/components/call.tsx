import { useCallback, useEffect, useRef, useState } from 'react';
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
import { BLACK, RED_COLOR, WHITE, WHITE_10 } from '../../../../util/color';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { callStyles } from '../styles';
import { JitsiMeeting } from '@jitsi/react-native-sdk';

const Call = ({ navigation, setShow }: any) => {
  const jitsiMeeting = useRef<any>(null);
  const room = 'DoctorApp123';
  const icons = [
    {
      id: 1,
      icon: <Icon name="clipboard" size={25} color={WHITE} />,
      press: () => navigation?.navigate('PatientRecord'),
    },
    {
      id: 2,
      icon: <Icon name="message-circle" size={25} color={WHITE} />,
      // press :
    },
    {
      id: 3,
      icon: <Icon name="video" size={25} color={WHITE} />,
      // press :
    },
    {
      id: 4,
      icon: <Icon name="mic" size={25} color={WHITE} />,
      // press :
    },
    {
      id: 5,
      icon: <MaterialIcon name="call-end" size={25} color={WHITE} />,
      press: () => setShow(false),
    },
  ];
  const onReadyToClose = useCallback(() => {
    // @ts-ignore
    navigation.navigate('Home');
    // @ts-ignore
    jitsiMeeting.current.close();
  }, [navigation]);

  const onEndpointMessageReceived = useCallback(() => {
    console.log('You got a message!');
  }, []);

  const eventListeners = {
    onReadyToClose,
    onEndpointMessageReceived,
  };

  return (
    // <ImageBackground
    //   source={require('../../../../assets/png/doctorImage.png')}
    //   style={callStyles?.imgBg}
    //   resizeMode="cover"
    // >
    //   {/*Header  */}
    //   <View style={callStyles?.header}>
    //     <Icon name="arrow-left" size={25} />
    //     <Image
    //       source={require('../../../../assets/png/doctorImage.png')}
    //       style={callStyles?.image}
    //     />
        <JitsiMeeting
          config={{
            hideConferenceTimer: true,
            // customToolbarButtons: [
            //   {
            //     icon: "https://w7.pngwing.com/pngs/987/537/png-transparent-download-downloading-save-basic-user-interface-icon-thumbnail.png",
            //     id: "btn1",
            //     text: "Button one"
            //   }, {
            //     icon: "https://w7.pngwing.com/pngs/987/537/png-transparent-download-downloading-save-basic-user-interface-icon-thumbnail.png",
            //     id: "btn2",
            //     text: "Button two"
            //   }
            // ],
            // toolbarButtons: [ 'microphone', 'camera', 'screensharing', 'overflowmenu', 'hangup' ],
            whiteboard: {
              enabled: true,
              collabServerBaseUrl: 'https://meet.jit.si/',
            },
            analytics: {
              disabled: true,
            },
          }}
          eventListeners={eventListeners as any}
          flags={{
            'audioMute.enabled': true,
            'ios.screensharing.enabled': true,
            'fullscreen.enabled': false,
            'audioOnly.enabled': false,
            'android.screensharing.enabled': true,
            'pip.enabled': true,
            'pip-while-screen-sharing.enabled': true,
            'conference-timer.enabled': true,
            'close-captions.enabled': false,
            'toolbox.enabled': true,
          }}
          ref={jitsiMeeting}
          style={{ flex: 1 }}
          room={room}
          serverURL={'https://meet.jit.si/'}
        />
    //   </View>
    //   {/* Text and Buttons */}
    //   <View style={callStyles?.footer}>
    //     <Text style={callStyles?.heading}>Dr. Nadeem Ahmed</Text>
    //     <Text style={callStyles?.text}>00:10:25</Text>
    //     {/* Buttons */}
    //     <View style={callStyles?.buttons}>
    //       {icons?.map((_i, index) => {
    //         return (
    //           <Pressable
    //             key={index}
    //             onPress={_i?.press}
    //             style={[
    //               callStyles?.button,
    //               {
    //                 backgroundColor: _i?.id === 5 ? 'red' : 'rgb(0,0,0,0.3)',
    //               },
    //             ]}
    //           >
    //             {_i?.icon}
    //           </Pressable>
    //         );
    //       })}
    //     </View>
    //   </View>
    // </ImageBackground>
  );
};

export default Call;
