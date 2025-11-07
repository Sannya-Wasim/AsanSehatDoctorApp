import { ScaledSheet } from "react-native-size-matters";
import { RED_COLOR, WHITE } from "./color";


const GlobalStyle = ScaledSheet.create({
    filedButton: {
        padding: '10@s',
        backgroundColor: RED_COLOR,
        width: "100%",
        borderRadius: '3@s',
        marginVertical: '3@s'
    },
    filedButtonText: {
        color:WHITE,
        textAlign: "center"
    },
    outlinedButton: {
        padding: '10@s',
        borderWidth: '1@s',
        borderColor: RED_COLOR,
        width: "100%",
        borderRadius: '3@s',
        marginVertical: '3@s'
    },
    outlinedButtonText: {
        color: RED_COLOR,
        textAlign: "center"
    }
});

export default GlobalStyle