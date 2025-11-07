import { Image, Pressable, Text } from 'react-native';
import { View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { BLACK, WHITE, WHITE_10 } from '../util/color';
import GlobalStyle from '../util/styles';


type Props = {
    id: number;
    name: string;
    image: any;
    symptoms: string[];
    condition: string;
    date: string;
    time: string;
    rating: null | string;
    review: null | string;
    showButton: boolean;
    joinNav?: Function;
    reshceduleNav?: Function;

}

const Appointment = (props: Props) => {
    return (
        <View style={{ backgroundColor: WHITE_10, borderColor: WHITE_10, paddingHorizontal: scale(10), paddingVertical: scale(20), marginVertical: scale(5) }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: scale(10), borderBottomWidth: 2, borderColor: WHITE_10, marginBottom: scale(10) }}>
                <Text style={{ color: BLACK }}>{props.time}</Text>
                <Text style={{ color: BLACK }}>{props.date}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Image source={props.image} style={{ height: scale(90), width: scale(90), borderRadius: scale(10) }} />
                <View style={{ marginHorizontal: scale(10) }}>
                    <Text style={{ fontWeight: "bold", fontSize: scale(18), color: BLACK }}>{props.name}</Text>
                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: scale(5) }}>
                            <Text style={{ color: BLACK, fontSize: scale(8) }}>Symptoms:</Text>

                            <View style={{ flexDirection: "row", marginLeft: scale(5) }}>
                                {props.symptoms.map((item, index) => (<View key={index} style={{ backgroundColor: 'rgba(18,88,161,0.3)', borderColor: "#1256A1", borderWidth: 1, marginHorizontal: scale(2), padding: scale(3), borderRadius: scale(5) }}><Text style={{ color: BLACK, fontSize: scale(8) }}>{item}</Text></View>))}
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'flex-start' }}>
                            <Text style={{ color: BLACK, fontSize: scale(8) }}>Condition:</Text>

                            <Text style={{ color: BLACK, fontSize: scale(8), marginLeft: scale(10), flexWrap: "wrap", textAlign: "left", flexBasis: "50%" }}>{props.condition}</Text>
                        </View>
                    </View>

                </View>
            </View>
            {props.showButton ? <View style={{ flexDirection: "row" }}>
                <Pressable onPress={() => props?.reshceduleNav ? props?.reshceduleNav() : null} style={[GlobalStyle.outlinedButton, { marginTop: scale(10), flex: 1, padding: scale(5), marginHorizontal: scale(2) }]}>
                    <Text style={[GlobalStyle.outlinedButtonText, { fontSize: scale(10) }]}>Reschedule Appointment</Text>
                </Pressable>

                <Pressable onPress={() => props?.joinNav ? props?.joinNav() : null} style={[GlobalStyle.filedButton, { marginTop: scale(10), flex: 1, padding: scale(5), marginHorizontal: scale(2) }]}>
                    <Text style={[GlobalStyle.filedButtonText, { fontSize: scale(10) }]}>Joint Appointment</Text>
                </Pressable>
            </View> : props.review ?
                <View style={{ borderTopWidth: 1, borderColor: WHITE_10, marginVertical: scale(5) }}>
                    <Text style={{ color: BLACK, fontSize: scale(12), marginTop: scale(5) }}>Rating  & Review</Text>
                    <Text style={{ color: BLACK, textAlign: "justify" }}>{props.review}</Text>
                </View> : null}
        </View>
    )
}

export default Appointment