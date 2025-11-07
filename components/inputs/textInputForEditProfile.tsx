import { Text, TextInput, TextInputProps, View } from "react-native";
import { useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { BLACK } from "../../util/color";

export const useInputState = (initialValue = ''): TextInputProps => {
    const [value, setValue] = useState(initialValue);
    return { value, onChangeText: setValue };
};

interface InputBoxProps extends TextInputProps {
    inputState: ReturnType<typeof useInputState>;
    label: string | null,
    width?:string,
}
export const Input = ({ inputState, label,width, ...props }: InputBoxProps) => {

    return (
        <View style={style.inputContainer}>
            {label && <Text style={style.lable}>{label}</Text>}
            <TextInput {...props}
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






