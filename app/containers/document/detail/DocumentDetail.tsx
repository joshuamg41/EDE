import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import update from 'immutability-helper';
import React, { useCallback, useRef, useState } from 'react';
import { Image, View } from 'react-native';
import Pdf from 'react-native-pdf';
import RNShare from "react-native-share";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from "react-redux";
import Container from '../../../components/container/Container';
import Header from '../../../components/header/Header';
import ProgressiveImage from '../../../components/progressive-image/ProgressiveImage';
import CheckRender from '../../../components/security/CheckRender';
import DocumentService from '../../../services/document/DocumentService';
import { RootState } from '../../../stores/AppReducers';
import { FONTS } from '../../../themes';
import { DocumentNavigatorParamList } from '../../root/navigators/flows/DocumentNavigator';
import { DocumentDetailState } from './DocumentDetailConstants';
import Styles from './DocumentDetailStyles';

const DocumentDetail = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<DocumentDetailState>({})

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      return () => { }
    }, [props.navigation])
  );

  //misc
  const shareScreen = async () => {
    try {
      const file = await DocumentService.getFile(props.route.params?.url)
      if (file.fail) {
        return
      }
      RNShare.open({
        title: `${props.route.params?.name}`,
        url: `data:${getExtension()};base64,${file?.data}`,
      });
    } catch (e) {

    }
  }

  const getExtension = () => {
    if (props.route.params?.extension == 'pdf') {
      return `application/${props.route.params?.extension}`
    } else {
      return `image/${props.route.params?.extension}`
    }
  }

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  //rendering
  return (
    <Container>
      <Header
        title={props.route.params?.name}
        onPressRightIcon={shareScreen}
        rightIcon={
          <Ionicons
            name='share-social-outline'
            size={FONTS.smallIcon}
          />
        }
        leftIcon
      />
      <View style={Styles.content}>
        <CheckRender allowed={props.route.params?.extension == 'pdf'}>
          <Pdf
            source={{ uri: props.route.params?.url }}
            style={Styles.pdf}
          />
        </CheckRender>
        <CheckRender allowed={props.route.params?.extension != 'pdf'}>
          <ProgressiveImage
            source={{ uri: props.route.params?.url }}
            style={Styles.image}
            resizeMode='contain'
          />
        </CheckRender>
      </View>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<DocumentNavigatorParamList, 'DocumentDetail'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  getData: state.serviceDetail.getData,
  getLoading: state.serviceDetail.getLoading,
  getError: state.serviceDetail.getError,
});

const mapDispatchToProps = {

}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(DocumentDetail)