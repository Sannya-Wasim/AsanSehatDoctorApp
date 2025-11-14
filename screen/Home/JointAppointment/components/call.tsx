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
import { BLACK, RED_COLOR, WHITE, WHITE_10 } from '../../../../util/color';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { callStyles } from '../styles';

const Call = ({ navigation, setShow }: any) => {
  const icons = [
    {
      id: 1,
      icon: <Icon name="clipboard" size={25} color={WHITE} />,
        press : () => navigation?.navigate("PatientRecord")
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
      press : () => setShow(false)
    },
  ];
  return (
    <ImageBackground
      source={require('../../../../assets/png/doctorImage.png')}
      style={callStyles?.imgBg}
      resizeMode="cover"
    >
      {/*Header  */}
      <View style={callStyles?.header}>
        <Icon name="arrow-left" size={25} />
        <Image
          source={require('../../../../assets/png/doctorImage.png')}
          style={callStyles?.image}
        />
      </View>
      {/* Text and Buttons */}
      <View style={callStyles?.footer}>
        <Text style={callStyles?.heading}>Dr. Nadeem Ahmed</Text>
        <Text style={callStyles?.text}>00:10:25</Text>
        {/* Buttons */}
        <View style={callStyles?.buttons}>
          {icons?.map((_i, index) => {
            return (
              <Pressable
                key={index}
                onPress={_i?.press}
                style={[
                  callStyles?.button,
                  {
                    backgroundColor: _i?.id === 5 ? 'red' : 'rgb(0,0,0,0.3)',
                  },
                ]}
              >
                {_i?.icon}
              </Pressable>
            );
          })}
        </View>
      </View>
    </ImageBackground>
  );
};

export default Call


