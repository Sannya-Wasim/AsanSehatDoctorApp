import { Text, TextInput, TextInputProps, View } from "react-native";
import { useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { BLACK } from "../../util/color";

export const usePasswordInputState = (initialValue = ''): TextInputProps => {
    const [value, setValue] = useState(initialValue);
    return { value, onChangeText: setValue };
};

interface InputBoxProps extends TextInputProps {
    inputState: ReturnType<typeof usePasswordInputState>;
    label: string | null
}
export const PasswordInput = ({ inputState, label, ...props }: InputBoxProps) => {

    return (
        <View style={style.inputContainer}>
            {label && <Text style={style.lable}>{label}</Text>}
            <TextInput {...props} secureTextEntry={true}
                {...inputState} style={style.textInput} />
        </View>
    )

}


const style = ScaledSheet.create({
    inputContainer:{
       width:"100%",
       marginVertical:'5@s'
    },
    textInput: {
        borderWidth: 2,
        borderColor: "#070707",
        borderRadius:'5@s',
        marginVertical:'5@s',
        padding:'10@s'
    },
    lable:{
        color:BLACK,
        fontSize:"16@s"
    }
})






