import { Pressable, Text, TextInput, TextInputProps, View } from 'react-native';
import { useState } from 'react';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { BLACK, GRAY, WHITE } from '../../util/color';
import Icon from 'react-native-vector-icons/Feather';

export const usePasswordInputState = (initialValue = ''): TextInputProps => {
  const [value, setValue] = useState(initialValue);
  return { value, onChangeText: setValue };
};

interface InputBoxProps extends TextInputProps {
  inputState: ReturnType<typeof usePasswordInputState>;
  label: string | null;
}
export const PasswordInput = ({
  inputState,
  label,
  ...props
}: InputBoxProps) => {
  const [show, setShow] = useState(false);
  const toggleVisibility = () => setShow(!show);
  return (
    <View style={style.inputContainer}>
      {label && <Text style={style.lable}>{label}</Text>}
      <View style={style.inputView}>
        <TextInput
          {...props}
          secureTextEntry={show}
          {...inputState}
          placeholderTextColor={GRAY}
          style={style?.input}
        />
        <Pressable
          onPress={toggleVisibility}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}
        >
          {!show ? (
            <Icon name="eye" size={scale(12)} color={GRAY} />
          ) : (
            <Icon name="eye-off" size={scale(12)} color={GRAY} />
          )}
        </Pressable>
      </View>
    </View>
  );
};

const style = ScaledSheet.create({
  inputContainer: {
    width: '100%',
    marginVertical: '5@s',
  },
  inputView: {
    borderWidth: 2,
    borderColor: '#070707',
    borderRadius: '5@s',
    marginVertical: '5@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: '10@s',
  },
  input: {
    // backgroundColor : 'red',
    flex: 1,
    marginLeft: '5@s',
    color : BLACK
  },
  lable: {
    color: BLACK,
    fontSize: '16@s',
  },
});
