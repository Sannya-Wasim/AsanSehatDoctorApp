
import { Svg, G, Path, Rect, Defs, ClipPath } from 'react-native-svg';
import { scale } from 'react-native-size-matters';

const HomeLogo = ({color}) => {
    return (
        <Svg width={scale(19)} height={scale(20)} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M2.72222 17.7778H6.05556V11.1111H12.7222V17.7778H16.0556V7.77778L9.38889 2.77778L2.72222 7.77778V17.7778ZM0.5 20V6.66667L9.38889 0L18.2778 6.66667V20H10.5V13.3333H8.27778V20H0.5Z" fill={color} />
        </Svg>

    )
}

export default HomeLogo