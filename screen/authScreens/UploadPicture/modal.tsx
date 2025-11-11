import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';
import { BLACK, WHITE } from '../../../util/color';

interface UploadImageModalProps {
  show: boolean;
  navigation: any;
  setShow: any;
}

const UploadImageModal = ({
  show,
  setShow,
  navigation,
}: UploadImageModalProps) => {
  const press = () => {
    setShow(false);
    navigation?.navigate('Login');
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
          <Text style={styles?.header}>Request Submitted!</Text>
          <Text style={styles?.text}>
            We have received your request. Kindly wait for approval, our staff
            will get in touch with you shortly for confirmation.
          </Text>
          <Pressable style={styles?.button} onPress={press}>
            <Text style={styles?.buttonText}>Confirm</Text>
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

export default UploadImageModal;
