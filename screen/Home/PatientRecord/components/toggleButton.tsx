import { Pressable, Text, View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { GRAY, LIGHT_GRAY, RED_COLOR, WHITE } from '../../../../util/color';

const ToggleButton = ({
  toggle,
  setToggle,
}: {
  toggle: string;
  setToggle: Function;
}) => {
  return (
    <View style={styles?.container}>
      <Pressable
        onPress={() => setToggle('reports')}
        style={[
          styles?.button,
          { backgroundColor: toggle === 'reports' ? RED_COLOR : 'transparent' },
        ]}
      >
        <Text
          style={[
            styles?.buttonText,
            { color: toggle === 'reports' ? WHITE : RED_COLOR },
          ]}
        >
          Reports
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setToggle('prescriptions')}
        style={[
          styles?.button,
          {
            backgroundColor:
              toggle === 'prescriptions' ? RED_COLOR : 'transparent',
          },
        ]}
      >
        <Text
          style={[
            styles?.buttonText,
            { color: toggle === 'prescriptions' ? WHITE : RED_COLOR },
          ]}
        >
          Prescriptions
        </Text>
      </Pressable>
    </View>
  );
};

const styles = ScaledSheet?.create({
  container: {
    flexDirection: 'row',
    backgroundColor: LIGHT_GRAY,
    margin: scale(15),
    borderRadius: scale(30),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(40),
    borderRadius: scale(30),
  },
  buttonText: {
    fontSize: scale(14),
    fontWeight: 'bold',
  },
});

export default ToggleButton;
