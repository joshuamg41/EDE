import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect, ConnectedProps } from "react-redux";
import Button from '../../../components/button/Button';
import Container, { ContainerRef } from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import Header from '../../../components/header/Header';
import InputArea from '../../../components/Input-area/InputArea';
import ModalPicker from '../../../components/modal-picker/ModalPicker';
import RequestHeader from '../../../components/request-header/RequestHeader';
import Separator from '../../../components/separator/Separator';
import { reasonClaimTypeData } from '../../../services/LocalService';
import { RootState } from '../../../stores/AppReducers';
import { HomeNavigatorParamList } from '../../root/navigators/flows/HomeNavigator';
import { ClaimSolicitudeState, schemaValidation } from './ClaimSolicitudeConstants';
import ClaimSolicitudeActions from '../../../stores/claim/solicitude/Actions';
import { localToArray } from '../../../utils/ArrayUtil';

const ClaimSolicitude = (props: ScreenProps) => {
  const mounted = useRef(false);
  const containerRef = useRef<ContainerRef>(null);
  const [state, setState] = useState<ClaimSolicitudeState>({
    reasonType: undefined,
    problemDetail: undefined,
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
      props.getClaimSolicitude()
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
  const doRequest = (values: ClaimSolicitudeState, actions: any) => {
    const request = {
      issue_id: values.reasonType?.Id,
      citizen_id: props.user?.data?.citizen_id,
      service_id: props.requestDetail?.request?.service_id,
      request_code: props.requestDetail?.request?.code,
      citizen_name: props.user?.data?.name,
      description: values.problemDetail,
    }
    props.postClaimSolicitude(request)
  }

  //Value change handlers
  const onStateChange = (key: string) => (value: any) => {
    return setFieldValue(key, value);
  };

  //rendering
  return (
    <Container
      ref={containerRef}
      successMessage='Reclamación enviada correctamente'
      successFunction={() => resetForm()}
    >
      <Header
        title="Nueva reclamación"
        leftIcon
      />
      <Content>
        <RequestHeader />
        <Separator />
        <ModalPicker
          label='Motivo de la reclamación'
          data={localToArray(props.getData?.issueList)}
          value={values.reasonType}
          onValueChange={onStateChange('reasonType')}
          placeholder="Seleccionar motivo"
          showError={touched.reasonType && errors.reasonType}
        />
        <InputArea
          label='Detalles del problema'
          value={values.problemDetail}
          onValueChange={onStateChange('problemDetail')}
          placeholder="Seleccionar motivo"
          showError={touched.problemDetail && errors.problemDetail}
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

interface ScreenProps extends ReduxProps, StackScreenProps<HomeNavigatorParamList, 'ClaimSolicitude'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  requestDetail: state.requestDetail.getData,

  getData: state.claimSolicitude.getData,
  getLoading: state.claimSolicitude.getLoading,
  getError: state.claimSolicitude.getError,

  postData: state.claimSolicitude.postData,
  postLoading: state.claimSolicitude.postLoading,
  postError: state.claimSolicitude.postError,
});

const mapDispatchToProps = {
  getClaimSolicitude: ClaimSolicitudeActions.getClaimSolicitude,
  postClaimSolicitude: ClaimSolicitudeActions.postClaimSolicitude,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(ClaimSolicitude)