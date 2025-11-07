import { Image, View ,Text, Pressable} from 'react-native'
import {  } from 'react-native-svg'
import Icon from 'react-native-vector-icons/Feather'
import { BLACK, WHITE } from '../util/color'
import { scale } from 'react-native-size-matters'
type Props = {
    image?: any,
    name: string,
    navigate:Function
}

// const demo = require('../assets/png/BookADoctor.png')
const IconButton = ({ image, name,navigate }: Props) => {
    return (
        <Pressable onPress={()=>navigate()} style={{paddingVertical:scale(10),borderRadius:scale(10),paddingHorizontal:scale(3),flexBasis:'22%',marginHorizontal:scale(5),justifyContent:"center",alignContent:"center",alignItems:"center",backgroundColor:image?'rgba(62,101,160,0.14)':"#3E65A0"}}>
            {image?<Image source={image} style={{height:scale(40)}} resizeMode='contain' />:<Icon name='arrow-right' size={30} color={WHITE}/>}
            <Text style={{textAlign:"center",color:image?BLACK:WHITE,fontSize:scale(9)}}>{name}</Text>
        </Pressable>
    )
}

export default IconButton