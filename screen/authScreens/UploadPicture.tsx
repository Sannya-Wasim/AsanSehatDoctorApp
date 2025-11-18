import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyle from '../../util/styles';
import { useCallback, useState } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import ProfileIcon from '../../assets/svg/profileIcon';
import { BLACK, RED_COLOR, WHITE } from '../../util/color';
import { scale } from 'react-native-size-matters';
import axios from 'axios';
import { config } from '../../config';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../../navigations/drawerNavigation';
import CustomModal from '../../components/modal';
import { POST } from '../../methods/apiClient';
import { endpoints } from '../../methods/endpoints';

type Props = DrawerScreenProps<DrawerParamList, 'EditProfile'>;

const UploadPicture = ({ navigation }: Props) => {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const onButtonPress = useCallback(
    (
      type: String,
      options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions,
    ) => {
      if (type === 'capture') {
        ImagePicker.launchCamera(options, setResponse);
      } else {
        ImagePicker.launchImageLibrary(options, setResponse);
      }
    },
    [],
  );

  //   console.log("response", response?.assets[0])

  const uploadPicutre = async () => {
    // setLoading(true);
    try {
      const formData = new FormData();
      formData?.append('userId', 3785);
      formData?.append('profileImage', {
        uri: response?.assets[0]?.uri,
        type: response?.assets[0]?.type,
        name: response?.assets[0]?.fileName,
      });
      if (response) {
        setModal(true);
      } else {
        ToastAndroid?.show('upload image first', ToastAndroid?.BOTTOM);
      }

        const res = await POST(endpoints?.uploadProfileImage, formData)
        if (res?.status) {
          console.log('Profile image uploaded successfully', res);
        } else {
          console.log('Profile image failed', res?.message);
        }
    } catch (error) {
      console.log('Error updating profile image', error);
    }
    finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles?.container}>
      {!modal ? (
        <>
          <View style={styles?.imageView}>
            {response ? (
              <Image
                source={{ uri: response?.assets[0]?.uri }}
                style={styles?.image}
              />
            ) : (
              <ProfileIcon
                color={'#696969'}
                width={scale(200)}
                height={scale(200)}
              />
            )}
          </View>
          <Pressable
            style={[styles?.button, { width: scale(120), alignSelf: 'center' }]}
            onPress={() =>
              onButtonPress('library', {
                selectionLimit: 0,
                mediaType: 'photo',
                includeBase64: false,
                includeExtra: true,
              })
            }
          >
            <Text style={styles?.buttonText}>Upload Photo</Text>
          </Pressable>
          <Pressable
            onPress={uploadPicutre}
            style={[
              styles?.button,
              {
                position: 'absolute',
                bottom: scale(20),
                width: '95%',
                alignSelf: 'center',
              },
            ]}
          >
            {loading ? (
              <ActivityIndicator size={'small'} color={WHITE} />
            ) : (
              <Text style={styles?.buttonText}>Save</Text>
            )}
          </Pressable>
        </>
      ) : (
        <CustomModal
          show={modal}
          setShow={setModal}
          title="Request Submitted!"
          text="We have received your request. Kindly wait for approval, our staff
            will get in touch with you shortly for confirmation."
          type="auth"
          navigation={navigation}
          buttonText={'Confirm'}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet?.create({
  container: {
    flex: 1,
    padding: scale(10),
  },
  imageView: {
    backgroundColor: '#D3D3D3',
    width: '90%',
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(10),
    marginTop: scale(20),
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: scale(10),
  },
  button: {
    backgroundColor: RED_COLOR,
    margin: scale(15),
    paddingVertical: scale(8),
    borderRadius: scale(5),
    alignItems: 'center',
  },
  buttonText: {
    color: WHITE,
  },
});

export default UploadPicture;
