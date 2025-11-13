import { Dimensions } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { WHITE } from '../../../util/color';

export const styles = ScaledSheet?.create({
mainContainer: {
    // backgroundColor: 'red',
    flex: 1,
  },
})

export const callStyles = ScaledSheet.create({
  imgBg: {
    flex: 1,
    // alignItems : "center",
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: scale(35),
    paddingHorizontal: scale(15),
  },
  image: {
    width: scale(120),
    height: scale(190),
    borderRadius: scale(10),
    // margin
  },
  footer: {
    alignItems: 'center',
    marginVertical : '30@s'
  },
  heading: {
    fontSize: '18@s',
    color: WHITE,
    fontWeight: 'bold',
  },
  text: { 
    fontSize: '10@s', 
    color: WHITE, 
    marginVertical : '5@s'
},

  buttons: {
    flexDirection: 'row',
    alignItems : "center",
    justifyContent : "space-evenly"
  },
  button: {
    padding : '15@s',
    borderRadius : '40@s',
    margin : '5@s'
  },
});

export const prescriptionStyles = ScaledSheet?.create({
    container : {
        flex : 1
    }
})
