import { StackScreenProps } from '@react-navigation/stack';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { AirbnbRating, Rating } from 'react-native-ratings';
import Star from 'react-native-ratings/src/images/star.png';
import { connect, ConnectedProps } from "react-redux";
import * as yup from 'yup';
import ButtonText from '../../../components/button-text/ButtonText';
import Button from '../../../components/button/Button';
import Container from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import ErrorContainer from '../../../components/error-container/ErrorContainer';
import Header from '../../../components/header/Header';
import ListRender from '../../../components/list-render/ListRender';
import Modal from '../../../components/modal/Modal';
import CheckRender from '../../../components/security/CheckRender';
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import { RootState } from '../../../stores/AppReducers';
import ServiceDetailActions from '../../../stores/service/detail/Actions';
import { COLORS, FONTS, METRICS } from '../../../themes';
import ApplicationStyles from '../../../themes/ApplicationStyles';
import { localToArray } from '../../../utils/ArrayUtil';
import { cleanNumberWithDecimal, defaultString } from '../../../utils/StringUtil';
import { ServiceNavigatorParamList } from '../../root/navigators/flows/ServiceNavigator';
import RenderAddressed from './components/RenderAddressed';
import RenderPrice from './components/RenderPrice';
import RenderProcedures from './components/RenderProcedures';
import RenderRating from '../../rating/list/components/RenderRating';
import RenderRequirement from './components/RenderRequirement';
import RenderResponsible from './components/RenderResponsible';
import RenderSchedule from './components/RenderSchedule';
import { ServiceDetailState } from './ServiceDetailConstants';
import Styles from './ServiceDetailStyles';

const ServiceDetail = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<ServiceDetailState>({})
  const [readMore, setReadMore] = useState<boolean>(false)
  const [schemaValidation, setSchemaValidation] = useState<{ [key: string]: any }>({})
  const [askForDraft, setAskForDraft] = useState<boolean>(false)
  const { errors, handleBlur, setFieldValue, handleChange, values, handleSubmit, touched, setFieldTouched, resetForm, setFieldError } = useFormik({
    initialValues: state,
    onSubmit: (values, actions) => doRequest(values, actions),
    validationSchema: yup.object().shape(schemaValidation),
    enableReinitialize: true,
  });

  //Screen Initiators
  useEffect(() => {
    const request = {
      head: {
        id: props.route.params.id,
      },
      body: {
        citizen_id: props.user.data?.citizen_id
      },
    }
    props.getServiceDetail(request)
    return () => { }
  }, [props.route])

  //componentDidUpdate
  useEffect(() => {
    if (mounted.current) {
      const innerSchema: { [key: string]: any } = {}
      const innerState: { [key: string]: any } = {}
      for (const field of localToArray(props.getData?.prices)) {
        if (localToArray(field.variations).length == 1) {
          innerState[field.key] = field.variations[0].id
        } else {
          innerState[field.key] = undefined
        }
        if (field.status == 'SI') {

        } else {
          innerSchema[field.key] = yup.string().required(defaultString.requiredText)
        }
      }
      setState(innerState)
      setSchemaValidation(innerSchema)
      setAskForDraft(Boolean(props.getData?.has_draft))
    }
    return () => { }
  }, [props.getData])

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    return () => { mounted.current = false }
  }, [])

  //Misc
  const doRequest = (values: ServiceDetailState, actions: any) => {
    const request = values
    props.setServicePrice(request)
    props.navigation.navigate('ServiceSolicitude')
  }

  //rendering
  const LocalRenderPrice = (itemProps: any) => {
    return (
      <RenderPrice
        {...itemProps}
        value={values[itemProps.item?.key]}
        error={touched[itemProps.item?.key] && errors[itemProps.item?.key]}
        onValueChange={setFieldValue}
        setFieldTouched={setFieldTouched}
      />
    )
  }

  return (
    <Container>
      <Header
        title="Información de servicio"
        leftIcon
      />
      <ErrorContainer isLoading={!!props.getLoading}>
        <Content contentContainerStyle={Styles.content}>
          <Text style={Styles.serviceType}>{'Confotur'}</Text>
          <Text style={Styles.serviceTitle}>{props.getData?.name}</Text>
          <Separator height={METRICS.medium10} />
          <Rating
            type='custom'
            ratingImage={Star}
            ratingBackgroundColor={COLORS.lightGray}
            imageSize={FONTS.mediumIcon}
            ratingCount={5}
            startingValue={Number(cleanNumberWithDecimal(props.getData?.rating))}
            fractions={1}
            readonly
          />
          <Separator />
          <ListRender
            data={localToArray(props.getData?.requirements)}
            renderItem={RenderRequirement}
          />
          <Separator />
          <Text style={Styles.priceTitle}>{props.getData?.direction?.id == 1 ? 'Elegir monto del servicio' : 'Costo'}</Text>
          <Separator height={METRICS.medium10} />
          <ListRender
            data={localToArray(props.getData?.prices)}
            renderItem={LocalRenderPrice}
          />
          <Button
            title='Solicitar'
            bottomSeparate={false}
            widthSeparator={0}
            theme='tertiary'
            onPress={handleSubmit}
          />
          <Separator />
          <Text style={Styles.generalInformationTitle}>
            Información general
          </Text>
          <Separator />
          <Text
            style={Styles.generalInformationBody}
            numberOfLines={readMore ? undefined : 3}
          >
            {props.getData?.description}
          </Text>
          <Separator />
          <CheckRender allowed={localToArray(props.getData?.rating_list).length}>
            <Text style={Styles.subTitle}>
              Últimas reseñas
            </Text>
            <Separator height={METRICS.medium10} />
            <ListRender
              data={localToArray(props.getData?.rating_list)}
              renderItem={RenderRating}
              ItemSeparatorComponent={<Separator height={METRICS.medium10} />}
              renderSeparator
            />
            <Separator height={METRICS.medium10} />
            <ButtonText
              title='Ver todas las reseñas'
              onPress={() => props.navigation.navigate('RatingList')}
              containerStyle={Styles.readMoreContainer}
            />
          </CheckRender>
          <CheckRender allowed={localToArray(props.getData?.schedules).length}>
            <Text style={Styles.subTitle}>
              Horario
            </Text>
            <Separator height={METRICS.medium10} />
            <ListRender
              data={localToArray(props.getData?.schedules)}
              renderItem={RenderSchedule}
            />
            <Separator />
          </CheckRender>
          <CheckRender allowed={localToArray(props.getData?.procedures).length}>
            <Text style={Styles.subTitle}>
              Procedimiento
            </Text>
            <Separator height={METRICS.medium10} />
            <ListRender
              data={localToArray(props.getData?.procedures)}
              renderItem={RenderProcedures}
            />
            <Separator />
          </CheckRender>
          <CheckRender allowed={localToArray(props.getData?.responsibles).length}>
            <Text style={Styles.subTitle}>
              Responsables
            </Text>
            <Separator height={METRICS.medium10} />
            <ListRender
              data={localToArray(props.getData?.responsibles)}
              renderItem={RenderResponsible}
              renderSeparator
            />
            <Separator />
          </CheckRender>
          <CheckRender allowed={localToArray(props.getData?.addresseds).length}>
            <Text style={Styles.subTitle}>
              Dirigido a
            </Text>
            <Separator height={METRICS.medium10} />
            <ListRender
              data={localToArray(props.getData?.addresseds)}
              renderItem={RenderAddressed}
            />
            <Separator />
          </CheckRender>
        </Content>
      </ErrorContainer>
      <Modal
        isVisible={askForDraft}
        onVisibleChange={setAskForDraft}
      >
        <Text>Existe un borrador disponible para este servicio, ¿Desea abrir el formulario donde los dejaste?</Text>
        <Separator />
        <View style={ApplicationStyles.row}>
          <Button
            title='No'
            theme='primaryOutline'
            widthSeparator={0}
            bottomSeparate={false}
            containerStyle={ApplicationStyles.flex1}
            onPress={() => setAskForDraft(false)}
          />
          <Separator />
          <Button
            title='Sí'
            widthSeparator={0}
            bottomSeparate={false}
            containerStyle={ApplicationStyles.flex1}
            onPress={() => {
              setAskForDraft(false)
              props.navigation.navigate('ServiceSolicitude', { draft: true })
            }}
          />
        </View>
      </Modal>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<ServiceNavigatorParamList, 'ServiceDetail'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  getData: state.serviceDetail.getData,
  getLoading: state.serviceDetail.getLoading,
  getError: state.serviceDetail.getError,
});

const mapDispatchToProps = {
  getServiceDetail: ServiceDetailActions.getServiceDetail,
  setServicePrice: ServiceDetailActions.setServicePrice,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(ServiceDetail)