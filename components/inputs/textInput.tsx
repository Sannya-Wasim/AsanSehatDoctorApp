import { Text, TextInput, TextInputProps, View } from 'react-native';
import { useState } from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { BLACK, GRAY } from '../../util/color';

export const useInputState = (initialValue = ''): TextInputProps => {
  const [value, setValue] = useState(initialValue);
  return { value, onChangeText: setValue };
};

interface InputBoxProps extends TextInputProps {
  inputState: ReturnType<typeof useInputState>;
  label: string | null;
  inputStyle? : any
}
export const Input = ({ inputState, label, inputStyle, ...props }: InputBoxProps) => {
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.lable}>{label}</Text>}
      <TextInput
        {...props}
        {...inputState}
        style={[styles.textInput,inputStyle]}
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
