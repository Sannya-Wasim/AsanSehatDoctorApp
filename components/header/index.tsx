import { Dimensions, Image, Text, View } from 'react-native';
import { BLACK, RED_COLOR, WHITE } from '../../util/color';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Pressable } from 'react-native';
import LogoDrawer from '../../assets/svg/logoDrawer';
import { scale } from 'react-native-size-matters';
import GlobalStyle from '../../util/styles';

type PropsMainScreen = {
  toggleDrawer: Function;
  walletNav: Function;
};

export function MainScreenHeader({ toggleDrawer, walletNav }: PropsMainScreen) {
  return (
    <View
      style={{
        backgroundColor: WHITE,
        width: Dimensions.get('screen').width,
        position: 'absolute',
        top: 0,
        paddingVertical: 10,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Icon
        name="menu"
        size={30}
        color={BLACK}
        style={{ flexBasis: '25%' }}
        onPress={() => toggleDrawer()}
      />
      <Image
        source={require('../../assets/png/DrawerLogo.png')}
        style={{ height: scale(40), flexBasis: '50%', alignSelf: 'center' }}
        resizeMode="contain"
      />
      <View
        style={{
          flexBasis: '25%',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignContent: 'flex-end',
        }}
      >
        <Icon name="bell" size={20} color={BLACK} />
        <Pressable onPress={() => walletNav()}>
          <MaterialIcon name="wallet" size={20} color={BLACK} />
        </Pressable>
      </View>
    </View>
  );
}

type PropsComonHeader = {
  navigate?: Function;
  back: Function;
  title: string;
};

export function AllHeader({ navigate, back, title }: PropsComonHeader) {
  return (
    <View
      style={{
        backgroundColor: WHITE,
        width: Dimensions.get('screen').width,
        position: 'absolute',
        top: 0,
        paddingVertical: 10,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Pressable
        onPress={() => back()}
        style={{ paddingVertical: 10, paddingHorizontal: 20 }}
      >
        <Icon name="arrow-left" size={scale(15)} color={BLACK} />
      </Pressable>
      <Text style={{ color: BLACK, textAlign: 'center' }}>
        {String(title).length > 20
          ? String(title).slice(0, 20) + '...'
          : String(title)}
      </Text>
      <Pressable
        onPress={() => navigate()}
        style={[
          GlobalStyle.filedButton,
          {
            flexDirection: 'row',
            padding: scale(5),
            justifyContent: 'center',
            alignContent: 'center',
            width: '25%',
          },
        ]}
      >
        <Icon name="phone-call" size={scale(15)} color={WHITE} />
        <Text style={[GlobalStyle.filedButtonText, { marginLeft: scale(4), }]}>
          Help
        </Text>
      </Pressable>
    </View>
  );
}
