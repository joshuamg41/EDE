import {DrawerContentComponentProps} from '@react-navigation/drawer';
import React from 'react';
import {Image, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import Images from '../../../assets/images';
import SVG from '../../../assets/svg/SVG';
import Container from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import {navigateAndReset} from '../../../services/NavigationService';
import {RootState} from '../../../stores/AppReducers';
import {COLORS} from '../../../themes';
import {moderateScale} from '../../../utils/StyleHelpers';
import DrawerItem from './components/DrawerItem';
import Styles from './DrawerMenuStyles';

const DrawerMenu = (props: ScreenProps) => {
  return (
    <Container style={Styles.container}>
      <Content showsVerticalScrollIndicator>
        <View style={Styles.logoContent}>
          <Image
            source={Images.logo_mitur_horizontal}
            style={Styles.logo}
            resizeMode="contain"
          />
        </View>
        <DrawerItem
          name="Escritorio"
          goTo="HomeNavigator"
          subName=""
          Svg={SVG.svg_home}
        />
        <DrawerItem
          name="Solicitar servicios"
          goTo="ServiceNavigator"
          subName="Acceder al catalogo de servicios"
          Svg={SVG.svg_add}
        />
        <DrawerItem
          name="Notificationes"
          goTo="Notification"
          subName="Acceda a sus notificaciones"
          Svg={SVG.svg_bell}
        />
        <DrawerItem
          name="Ver mis servicios"
          goTo="DocumentNavigator"
          subName="Ver los servicios solicitados"
          Svg={SVG.svg_document}
        />
        <DrawerItem
          name="Mi configuración"
          goTo="ProfileNavigator"
          subName="Perfil, contraseña y preferencias"
          Svg={SVG.svg_settings}
        />
        <DrawerItem
          name="Borrador"
          goTo="DraftNavigator"
          subName="Borradores de formularios"
          Svg={SVG.svg_comment_info}
        />
      </Content>
      <DrawerItem
        onPress={() => navigateAndReset('Welcome')}
        name="Cerrar Sesión"
        iconName="log-out"
        iconStyle={{color: COLORS.error}}
        touchableStyle={{
          borderTopWidth: moderateScale(2),
          borderColor: COLORS.lightGray,
        }}
        textStyle={{textAlign: 'center'}}
      />
    </Container>
  );
};

interface ScreenProps extends ReduxProps, DrawerContentComponentProps {}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(DrawerMenu);
