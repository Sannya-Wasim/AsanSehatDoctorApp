import { Text, TextInput, TextInputProps, View } from 'react-native';
import { useState } from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { BLACK, GRAY } from '../../util/color';

interface InputState {
  value: string;
  onChangeText: (text: string) => void;
}

export const useInputState = (initialValue = ''): InputState => {
  const [value, setValue] = useState(initialValue);
  return { value, onChangeText: setValue };
};

interface InputBoxProps extends TextInputProps {
  inputState: ReturnType<typeof useInputState>;
  label: string | null;
  inputStyle?: any;
}
export const Input = ({
  inputState,
  label,
  inputStyle,
  ...props
}: InputBoxProps) => {
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.lable}>{label}</Text>}
      <TextInput
        {...props}
        {...inputState}
        onChangeText={text => {
          inputState?.onChangeText?.(text);
          props?.onChangeText?.(text);
        }}
        style={[styles.textInput, inputStyle]}
        placeholderTextColor={GRAY}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  inputContainer: {
    width: '100%',
    // marginVertical: '5@s',
  },
  textInput: {
    borderWidth: 1,
    borderColor: GRAY,
    borderRadius: '5@s',
    marginVertical: '5@s',
    padding: '10@s',
  },
  lable: {
    color: BLACK,
    fontSize: '16@s',
  },
});
