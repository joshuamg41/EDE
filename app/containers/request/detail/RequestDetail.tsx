import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import update from 'immutability-helper';
import moment from 'moment';
import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { connect, ConnectedProps } from "react-redux";
import Button from '../../../components/button/Button';
import Container from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import Header from '../../../components/header/Header';
import ProgressBar from '../../../components/progress-bar/ProgressBar';
import RenderColumn from '../../../components/render/column/RenderColumn';
import RequestHeader from '../../../components/request-header/RequestHeader';
import CheckRender from '../../../components/security/CheckRender';
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import { RootState } from '../../../stores/AppReducers';
import RequestDetailActions from '../../../stores/request/detail/Actions';
import { COLORS, METRICS } from '../../../themes';
import { localToArray } from '../../../utils/ArrayUtil';
import { localToNumber } from '../../../utils/NumberUtil';
import { localToString, parseToMoneyWCents, tagToBold } from '../../../utils/StringUtil';
import { HomeNavigatorParamList } from '../../root/navigators/flows/HomeNavigator';
import { RequestDetailState } from './RequestDetailConstants';
import Styles from './RequestDetailStyles';

const RequestDetail = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<RequestDetailState>({})

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      return () => { }
    }, [props.navigation])
  );

  useFocusEffect(
    useCallback(() => {
      //function
      doRequest()
      return () => { }
    }, [props.route])
  );

  //misc
  const doRequest = () => {
    if (props.getLoading) {
      return
    }
    const request = {
      id: props.route.params?.id,
      body: {
        citizenId: props.user.data?.citizen_id,
      },
    }
    props.getRequestDetail(request)
  }

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  const messages = localToArray(props.getData?.request?.messages)

  //rendering
  return (
    <Container>
      <Header
        title={"Detalle de la Solicitud"}
        leftIcon
      />
      <Content contentContainerStyle={Styles.content}>
        <RequestHeader />
        <Separator />
        <View style={Styles.horizontalSeparator}>
          <RenderColumn
            title='Fecha de solicitud'
            body={moment(props.getData?.request?.created_at).format('DD [de] MMMM [de] YYYY')}
            size='regular'
            isLoading={props.getLoading}
          />
          <CheckRender allowed={props.getData?.request?.request_actions}>
            <RenderColumn
              title='Acción requerida'
              body={props.getData?.request?.request_actions?.name + '. '}
              extraBody={tagToBold(messages[messages.length - 1]?.message)}
              size='regular'
              bottomSeparate={false}
              isLoading={props.getLoading}
            />
            <Separator height={METRICS.large15} />
          </CheckRender>
          <RenderColumn
            title='Estatus actual'
            body={props.getData?.request?.status?.name}
            size='regular'
            isLoading={props.getLoading}
          />
          <CheckRender allowed={!props.getData?.request?.approval_number}>
            <RenderColumn
              title='Monto a pagar'
              body={parseToMoneyWCents(props.getData?.request?.payment?.payment_amount)}
              size='regular'
              isLoading={props.getLoading}
            />
          </CheckRender>
          <CheckRender allowed={props.getData?.request?.solution}>
            <RenderColumn
              title='Solución'
              body={localToString(props.getData?.request?.solution)}
              size='regular'
              isLoading={props.getLoading}
            />
          </CheckRender>
          <ProgressBar
            progress={localToNumber(props.getData?.request?.progress) / 100}
            //@ts-ignore
            color={COLORS[props.getData?.request?.status?.color || 'success']}
          />
        </View>
        <Separator height={METRICS.xxLarge30} />
        <CheckRender allowed={props.getData?.request?.request_actions && props.getData?.request?.request_actions?.type_id !== 3}>
          <Button
            title='Resolver acción requerida'
            onPress={() => props.navigation.navigate('RequestResolve')}
            theme='primaryOutline'
          />
        </CheckRender>
        <CheckRender allowed={props.getData?.request?.request_actions?.type_id == 3 || localToArray(props.getData?.request?.comments).length}>
          <Button
            title='Mensajes'
            onPress={() => props.navigation.navigate('Chat')}
            theme='primaryOutline'
          />
        </CheckRender>
        <Button
          title='Ver documentos enviados'
          onPress={() => props.navigation.navigate('DocumentSent')}
          theme='primaryOutline'
        />
        <Button
          title='Quejas y reclamaciones'
          onPress={() => props.navigation.navigate('ClaimList')}
          theme='primaryOutline'
        />
        <CheckRender allowed={localToNumber(props.getData?.request?.payment?.payment_amount)}>
          <Button
            title='Pagos'
            onPress={() => props.navigation.navigate('PaymentList')}
            theme='primaryOutline'
          />
        </CheckRender>
        <CheckRender allowed={!localToArray(props.getData?.request?.rating).length}>
          <Button
            title='Evaluar servicio'
            onPress={() => props.navigation.navigate('RatingSolicitude')}
            theme='primaryOutline'
          />
        </CheckRender>
      </Content>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<HomeNavigatorParamList, 'RequestDetail'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  getData: state.requestDetail.getData,
  getLoading: state.requestDetail.getLoading,
  getError: state.requestDetail.getError,
});

const mapDispatchToProps = {
  getRequestDetail: RequestDetailActions.getRequestDetail,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(RequestDetail)