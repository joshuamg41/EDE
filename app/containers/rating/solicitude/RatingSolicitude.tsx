import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Rating } from 'react-native-ratings';
import { connect, ConnectedProps } from "react-redux";
import Button from '../../../components/button/Button';
import Container, { ContainerRef } from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import Header from '../../../components/header/Header';
import InputArea from '../../../components/Input-area/InputArea';
import RequestHeader from '../../../components/request-header/RequestHeader';
import CheckRender from '../../../components/security/CheckRender';
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import { RootState } from '../../../stores/AppReducers';
import RatingSolicitudeActions from '../../../stores/rating/solicitude/Actions';
import { FONTS, METRICS } from '../../../themes';
import ApplicationStyles from '../../../themes/ApplicationStyles';
import { localToNumber } from '../../../utils/NumberUtil';
import { localToString } from '../../../utils/StringUtil';
import { HomeNavigatorParamList } from '../../root/navigators/flows/HomeNavigator';
import { RatingSolicitudeState, schemaValidation } from './RatingSolicitudeConstants';
import Styles from './RatingSolicitudeStyles';

const RatingSolicitude = (props: ScreenProps) => {
  const mounted = useRef(false);
  const containerRef = useRef<ContainerRef>(null);
  const [state, setState] = useState<RatingSolicitudeState>({
    comment: undefined,
    rating: undefined,
  })
  const { errors, handleBlur, setFieldValue, values, handleSubmit, touched, setFieldTouched, resetForm } = useFormik({
    initialValues: state,
    onSubmit: (values, actions) => doRequest(values, actions),
    validationSchema: schemaValidation,
  });

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      return () => { }
    }, [props.navigation])
  );

  //componentDidUpdate
  useEffect(() => {
    if (mounted.current && props.postData?.success) {
      containerRef.current?.showSuccess()
    }
    return () => { }
  }, [props.postData])

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    return () => { mounted.current = false }
  }, [])

  //misc
  const doRequest = (values: RatingSolicitudeState, actions: any) => {
    const request = {
      request_id: props.requestDetail?.request?.id,
      rating: localToNumber(values?.rating),
      comment: localToString(values?.comment),
    }
    props.postRating(request)
  }

  //Value change handlers
  const onStateChange = (key: string) => (value: any) => {
    return setFieldValue(key, value);
  };

  const onFieldTouched = (key: string) => () => {
    return setFieldTouched(key, true, true);
  };

  //rendering
  return (
    <Container
      ref={containerRef}
      successMessage='Gracias por tus comentarios'
      successFunction={() => props.navigation.goBack()}
    >
      <Header
        title="Evaluar servicio"
        leftIcon
      />
      <Content>
        <RequestHeader />
        <Separator />
        <Text style={ApplicationStyles.hPLarge}>Puntuación</Text>
        <Separator height={METRICS.medium10} />
        <Rating
          type='star'
          imageSize={FONTS.mediumIcon}
          ratingCount={5}
          startingValue={0}
          fractions={1}
          onStartRating={onFieldTouched('rating')}
          onFinishRating={onStateChange('rating')}
        />
        <CheckRender allowed={touched.rating && errors.rating}>
          <Separator height={METRICS.medium10} />
          <Text style={[Styles.errorText]}>
            {touched.rating && errors.rating}
          </Text>
        </CheckRender>
        <Separator />
        <InputArea
          label='Comentarios'
          value={values.comment}
          onValueChange={onStateChange('comment')}
          placeholder="Comentario"
          showError={touched.comment && errors.comment}
          numberOfLines={9}
        />
        <Button
          title='Enviar'
          theme='primary'
          onPress={handleSubmit}
          isLoading={props.postLoading}
        />
      </Content>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<HomeNavigatorParamList, 'RatingSolicitude'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  requestDetail: state.requestDetail.getData,

  postData: state.ratingSolicitude.postData,
  postLoading: state.ratingSolicitude.postLoading,
  postError: state.ratingSolicitude.postError,
});

const mapDispatchToProps = {
  postRating: RatingSolicitudeActions.postRating,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(RatingSolicitude)