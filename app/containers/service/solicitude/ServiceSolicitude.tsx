import {useFocusEffect} from '@react-navigation/core';
import {StackScreenProps} from '@react-navigation/stack';
import moment from 'moment';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect, ConnectedProps} from 'react-redux';
import Container, {ContainerRef} from '../../../components/container/Container';
import ErrorContainer from '../../../components/error-container/ErrorContainer';
import Form, {FormRef} from '../../../components/form/Form';
import Header from '../../../components/header/Header';
import {navigateAndReset} from '../../../services/NavigationService';
import {RootState} from '../../../stores/AppReducers';
import ServiceSolicitudeActions from '../../../stores/service/solicitude/Actions';
import {COLORS, FONTS} from '../../../themes';
import {arrayArrayToArray, localToArray} from '../../../utils/ArrayUtil';
import {localToNumber} from '../../../utils/NumberUtil';
import {localToObject} from '../../../utils/ObjectUtil';
import {cleanString, localToString} from '../../../utils/StringUtil';
import {isEmpty} from '../../../utils/ValidationUtil';
import {ServiceNavigatorParamList} from '../../root/navigators/flows/ServiceNavigator';
import {ServiceSolicitudeState} from './ServiceSolicitudeConstants';
import Styles from './ServiceSolicitudeStyles';
import {
  reverseTransformFormData,
  reverseTransformFormGrid,
  transformFileData,
  transformFormData,
  transformFormGrid,
  transformSoftExpertData,
} from './ServiceSolicitudeUtils';

const ServiceSolicitude = (props: ScreenProps) => {
  const mounted = useRef(false);
  const containerRef = useRef<ContainerRef>(null);
  const formRef = useRef<FormRef>(null);
  const [state, setState] = useState<ServiceSolicitudeState>({
    rules: [],
    data: {},
    grid: {},
    fakeStep: 0,
    step: 0,
    totalPayment: 0,
    variations: [],
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showDraftSuccess, setShowDraftSuccess] = useState<boolean>(true);
  const [payment, setPayment] = useState<{
    totalPayment: number;
    variations: string[];
  }>({totalPayment: 0, variations: []});

  //Screen Initiators
  useEffect(() => {
    doRequest();
    return () => {};
  }, [props.detailData]);

  //componentDidUpdate
  useEffect(() => {
    if (
      !localToArray(props.getData.plainData).length ||
      !props.getData?.saved_fields ||
      !localToArray(props.getData?.saved_fields?.data).length ||
      !props.route.params?.draft
    ) {
      return;
    }
    const {
      appliedRuleList,
      data,
      grid,
      fakeStep,
      step,
      variations,
      totalPayment,
    } = props.getData?.saved_fields;
    setPayment({totalPayment, variations});
    setState({
      rules: localToArray(appliedRuleList),
      fakeStep: localToNumber(fakeStep),
      data: reverseTransformFormData(data, props.getData.plainData),
      grid: reverseTransformFormGrid(grid, props.getData.plainData),
      step: localToNumber(step),
      totalPayment: totalPayment,
      variations: variations,
    });
    return () => {};
  }, [props.getData]);

  useEffect(() => {
    if (mounted.current && props.postError) {
      setIsVisible(true);
    }
    return () => {};
  }, [props.postError]);

  useEffect(() => {
    if (mounted.current && props.postData.RequestID) {
      containerRef.current?.showSuccess();
    }
    return () => {};
  }, [props.postData]);

  useEffect(() => {
    if (
      mounted.current &&
      localToArray(props.draftData.data).length &&
      showDraftSuccess
    ) {
      containerRef.current?.showSuccess();
    }
    return () => {};
  }, [props.draftData]);

  useEffect(() => {
    getPayment();
    return () => {};
  }, [props.servicePrice]);

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    return () => {
      mounted.current = false;
    };
  }, []);

  //Misc
  const doRequest = () => {
    if (!props.detailData.expertform_id) {
      return;
    }
    const request = {
      id: props.detailData.expertform_id,
      citizen_id: props.user.data?.citizen_id,
    };
    props.getServiceSolicitude(request);
  };

  const getPayment = () => {
    let totalPayment = 0;
    const variations: string[] = [];
    const _servicePrice = localToObject(props.servicePrice);
    for (const key in _servicePrice) {
      const originalPrice = props.detailData?.prices.find(
        price => price.key == key,
      );
      const originalVariation = originalPrice?.variations.find(
        variation => String(variation.id) == props.servicePrice[key],
      );
      variations.push(String(originalVariation?.id));
      totalPayment += localToNumber(originalVariation?.price);
    }
    setPayment({totalPayment, variations});
  };

  const postService = ({values, actions}: {values: any; actions: any}) => {
    const {data: userData} = props.user;
    const {totalPayment, variations} = payment;
    const formData = formRef.current?.saveForm();
    const _plainData = arrayArrayToArray(formData?.localData);

    const request = {
      fileRequest: transformFileData(values, _plainData),
      softExpertData: transformSoftExpertData(values, _plainData),
      solicitudeRequest: {
        req: {
          service_id: props.detailData.id,
          doc_identification: userData?.citizen_id,
          name_service: props.detailData.name,
          process_flow: props.detailData.process_flow,
          form_version: cleanString(props.getData.formulary_data?.version),
          payment_amount: totalPayment,
          payment_status: '1',
          payment_method: '2',
          total: totalPayment,
          variations: variations,
          cant: '1',
          idAutorizacionPortal: '',
        },
        form: {
          citizen_record_id: userData?.citizen_id,
          expertform_id: props.detailData?.expertform_id,
          data: transformFormData(values, _plainData),
          grid: transformFormGrid(values, _plainData),
        },
        documents: [],
        userInfo: {
          numdocsolicita: userData?.citizen_id,
          tipodocsolicita: 1,
          nombressolicita: userData?.name,
          apellidossolici: `${userData?.first_last_name} ${userData?.second_last_name}`,
          fechasolicitud: moment().format('YYYY-MM-DD'),
          direccsolic: userData?.address,
          nacionsolic: 'Dominicano',
          solicitudonline: 1,
          celularsolic: userData?.phone,
          emailsolic: userData?.email,
        },
      },
      associateRequest: {
        process_id: props.detailData?.process_id,
        activity_id: props.detailData?.activity_id,
        new_request: true,
      },
      citizen_id: userData?.citizen_id,
      send: props.detailData?.send,
    };
    props.postServiceSolicitude(request);
  };

  const handleFormSave = (showSuccess = true) => {
    setShowDraftSuccess(showSuccess);
    const formData = formRef.current?.saveForm();
    const {data: userData} = props.user;
    const {totalPayment, variations} = payment;
    const _plainData = arrayArrayToArray(formData?.localData);
    const request = {
      citizen_id: userData?.citizen_id,
      service_id: props.detailData.id,
      expertform_id: props.detailData?.expertform_id,
      //@ts-ignore
      data: transformFormData(formData?.values, _plainData, formData?.errors),
      //@ts-ignore
      grid: transformFormGrid(formData?.values, _plainData),
      appliedRuleList: localToArray(formData?.appliedRuleList),
      fakeStep: formData?.fakeStep,
      step: formData?.step,
      variations,
      totalPayment,
    };
    if (isEmpty(request.data)) {
      return;
    }
    props.saveServiceSolicitude(request);
  };

  const nextStep = () => {
    if (!props.postData.RequestID) {
      return;
    } else if (
      !props.detailData?.sirit_code &&
      !props.detailData?.external_pay
    ) {
      return navigateAndReset('HomeNavigator');
    }
    const {totalPayment, variations} = payment;
    navigateAndReset('PaymentForm', {
      date: moment().format('DD [de] MMMM [de] YYYY'),
      businessName: 'Negocio de Prueba',
      requestId: localToNumber(props.postData?.RequestID),
      servicePrice: localToString(totalPayment),
      solicitudeId: localToString(props.postData?.code),
      serviceName: localToString(props.detailData?.name),
      authorizationId: localToString(props.postData?.idAutorizacionPortal),
      recaudationCode: localToString(
        props.detailData?.institution?.recaudationCode,
      ),
      siritCode: props.detailData?.sirit_code,
      externalPay: props.detailData?.external_pay,
      paymentComplete: false,
      from: 'ServiceSolicitude',
    });
  };

  //rendering
  return (
    <Container
      ref={containerRef}
      modalProps={{
        isVisible: isVisible,
        onVisibleChange: setIsVisible,
      }}
      style={Styles.container}
      errorBody={props.postError?.message}
      successMessage={
        props.postData.RequestID ? 'Solicitud enviada' : 'Borrador guardado'
      }
      successFunction={nextStep}
      modalLoading={props.postLoading}>
      <Header
        title={props.detailData.name}
        leftIcon
        onPressRightIcon={handleFormSave}
        rightIcon={
          <Ionicons
            name="save-outline"
            color={COLORS.black}
            size={FONTS.mediumIcon}
          />
        }
      />
      <ErrorContainer
        isLoading={props.getLoading}
        error={props.getError}
        errorText>
        <Form
          ref={formRef}
          doRequest={postService}
          data={props.getData.data}
          plainData={props.getData.plainData}
          postLoading={props.postLoading}
          initialForm={state}
          handleFormSave={handleFormSave}
          variations={payment.variations}
          multipleDocument={!!props.detailData.multiple_document}
          isDraft={!!props.route.params?.draft}
        />
      </ErrorContainer>
    </Container>
  );
};

interface ScreenProps
  extends ReduxProps,
    StackScreenProps<ServiceNavigatorParamList, 'ServiceSolicitude'> {}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  detailData: state.serviceDetail.getData,

  servicePrice: state.serviceDetail.servicePrice,

  draftData: state.serviceSolicitude.saveData,

  getData: state.serviceSolicitude.getData,
  getLoading: state.serviceSolicitude.getLoading,
  getError: state.serviceSolicitude.getError,

  postData: state.serviceSolicitude.postData,
  postLoading: state.serviceSolicitude.postLoading,
  postError: state.serviceSolicitude.postError,
});

const mapDispatchToProps = {
  getServiceSolicitude: ServiceSolicitudeActions.getServiceSolicitude,
  postServiceSolicitude: ServiceSolicitudeActions.postServiceSolicitude,
  saveServiceSolicitude: ServiceSolicitudeActions.saveServiceSolicitude,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ServiceSolicitude);
