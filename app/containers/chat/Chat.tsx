import { useFocusEffect } from '@react-navigation/core';
import update from 'immutability-helper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect, ConnectedProps } from "react-redux";
import Container, { ContainerRef } from '../../components/container/Container';
import ContentFlatList from '../../components/content/ContentFlatList';
import Header from '../../components/header/Header';
import Input from '../../components/Input/Input';
import Separator from '../../components/separator/Separator';
import { COLORS } from '../../themes';
import { localToArray } from '../../utils/ArrayUtil';
import { IS_IOS, moderateScale, verticalScale } from '../../utils/StyleHelpers';
import RenderChat from './components/RenderMessage';
import Styles from './ChatStyles';
import { RootState } from '../../stores/AppReducers';
import { HomeNavigatorParamList } from '../root/navigators/flows/HomeNavigator';
import { DrawerScreenProps } from '@react-navigation/drawer';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ChatState, schemaValidation } from './ChatConstants';
import RequestResolveActions from '../../stores/request/resolve/Actions';
import CheckRender from '../../components/security/CheckRender';

const Chat = (props: ScreenProps) => {
  const mounted = useRef(false);
  const containerRef = useRef<ContainerRef>(null);
  const [state, setState] = useState<ChatState>({
    text: undefined,
  })
  const { errors, handleBlur, setFieldValue, handleChange, values, handleSubmit, touched, setFieldTouched, resetForm } = useFormik({
    initialValues: state,
    onSubmit: (values, actions) => postTextResolve(values, actions),
    validationSchema: schemaValidation,
  });

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      return () => { }
    }, [props.route])
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
  const postTextResolve = (values: ChatState, actions: any) => {
    const request = {
      request_id: props.requestDetail?.request?.id,
      text: values?.text,
    }
    props.postRequestResolve(request)
  }

  //Value change handlers
  const _handleChange = (key: string) => (value: any) => {
    return setFieldValue(key, value)
  }

  //rendering
  return (
    <Container style={Styles.container}>
      <Header
        title='Comentarios'
        leftIcon
      />
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={IS_IOS ? 0 : verticalScale(-200)}
        style={[Styles.container]}
      >
        <ContentFlatList
          inverted={true}
          extraData={props.postData}
          data={localToArray(props.requestDetail?.request?.comments)}
          //@ts-ignore
          renderItem={RenderChat}
          contentContainerStyle={Styles.flatListContainer}
          ListFooterComponent={View}
          ListHeaderComponent={<Separator height={10} />}
          ItemSeparatorComponent={() => <Separator height={10} />}
        />
        <CheckRender allowed={props.requestDetail?.request?.request_actions?.type_id == 3 && !props.postData?.success}>
          <Input
            value={values.text}
            onSubmitEditing={handleSubmit}
            onValueChange={_handleChange('text')}
            placeholder={'Envía un mensaje'}
            maxLength={144}
            rightSection={
              <MaterialCommunityIcons
                name='send-circle-outline'
                size={moderateScale(35)}
                color={COLORS.secondary}
                onPress={handleSubmit}
              />
            }
          />
        </CheckRender>
      </KeyboardAvoidingView>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, DrawerScreenProps<HomeNavigatorParamList, 'Chat'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  requestDetail: state.requestDetail.getData,

  postData: state.requestResolve.postData,
  postLoading: state.requestResolve.postLoading,
  postError: state.requestResolve.postError,
});

const mapDispatchToProps = {
  postRequestResolve: RequestResolveActions.postRequestResolve,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(Chat)