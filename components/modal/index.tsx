import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BLACK, WHITE } from '../../util/color';
import { useDispatch } from 'react-redux';
import { setDetails } from '../../store/reducer/authReducer';

interface CustomModalProps {
  show: boolean;
  navigation: any;
  setShow: any;
  title: string;
  text: string;
  buttonText : string;
  type: 'auth' | 'prescription' | 'reschedule';
}

const CustomModal = ({
  show,
  setShow,
  navigation,
  type,
  title,
  text,
  buttonText
}: CustomModalProps) => {
  const dispatch = useDispatch()
  const press = async () => {
    if (type === 'auth') {
      try {
        setShow(false);
        // await AsyncStorage.clear();
        const formattedUser = {
          token: '',
          id: '',
          role: '',
          name: '',
          email: '',
          designation: '',
          number: '',
        };
        dispatch(setDetails(formattedUser))
        navigation.replace('Login');
      } catch (error) {
        console.error('Failed to clear AsyncStorage:', error);
      }
    } else {
      setShow(false);
      navigation?.navigate('Home');
    }
  };

  return (
    <Modal
      visible={show}
      animationType="slide"
      navigationBarTranslucent
      transparent
      backdropColor={BLACK}
    >
      <View style={styles?.content}>
        <View style={styles?.modalView}>
          <Icon name="check-circle" size={scale(100)} color="green" />
          <Text style={styles?.header}>{title}</Text>
          <Text style={styles?.text}>
            {text}
          </Text>
          <Pressable style={styles?.button} onPress={press}>
            <Text style={styles?.buttonText}>{buttonText}</Text>
          </Pressable>
          <Text style={styles?.link}>support@asaansehat.com</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet?.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)  ',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: scale(10),
    paddingVertical: scale(50),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    fontSize: scale(16),
    color: BLACK,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: scale(10),
  },
  text: {
    fontSize: scale(11),
    color: BLACK,
    textAlign: 'center',
    marginVertical: scale(15),
    marginHorizontal: scale(20),
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: scale(8),
    paddingHorizontal: scale(80),
    alignItems: 'center',
    borderRadius: scale(5),
  },
  buttonText: {
    fontSize: scale(11),
    color: WHITE,
    textAlign: 'center',
  },
  link: {
    fontSize: scale(11),
    color: 'green',
    textAlign: 'center',
    marginTop: scale(10),
  },
});

export default CustomModal;
