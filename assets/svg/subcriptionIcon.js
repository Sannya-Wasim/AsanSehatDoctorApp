
import { Svg, G, Path, Rect, Defs, ClipPath } from 'react-native-svg';
import { scale } from 'react-native-size-matters';

const SubcriptionIcon = ({ color }) => {
    return (
        <Svg width={scale(25)} height={scale(24)} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M13.29 21L3.5 11.21V13.21C3.5 13.74 3.71 14.25 4.09 14.62L11.88 22.41C12.66 23.19 13.93 23.19 14.71 22.41L20.92 16.2C21.7 15.42 21.7 14.15 20.92 13.37L13.29 21Z" fill={color} />
            <Path d="M11.88 17.41C12.27 17.8 12.78 18 13.29 18C13.8 18 14.31 17.8 14.7 17.41L20.91 11.2C21.69 10.42 21.69 9.15 20.91 8.37L13.12 0.58C12.75 0.21 12.24 0 11.71 0H5.5C4.4 0 3.5 0.9 3.5 2V8.21C3.5 8.74 3.71 9.25 4.09 9.62L11.88 17.41ZM5.5 2H11.71L19.5 9.79L13.29 16L5.5 8.21V2Z" fill={color}  />
            <Path d="M7.75 5.5C8.44036 5.5 9 4.94036 9 4.25C9 3.55964 8.44036 3 7.75 3C7.05964 3 6.5 3.55964 6.5 4.25C6.5 4.94036 7.05964 5.5 7.75 5.5Z" fill={color}/>
        </Svg>

    )
}

export default SubcriptionIcon