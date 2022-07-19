import { useFormik } from 'formik';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import * as yup from 'yup';
import Button from '../../../../components/button/Button';
import Input from '../../../../components/Input/Input';
import ListRender from '../../../../components/list-render/ListRender';
import ModalPicker from '../../../../components/modal-picker/ModalPicker';
import Modal from '../../../../components/modal/Modal';
import Separator from '../../../../components/separator/Separator';
import Text from '../../../../components/text/Text';
import { RootState } from '../../../../stores/AppReducers';
import SignupActions from "../../../../stores/signup/Actions";
import { localToArray, mapArrayDiff } from '../../../../utils/ArrayUtil';
import { cleanString, defaultString, localToString } from '../../../../utils/StringUtil';
import { isEmpty } from '../../../../utils/ValidationUtil';

const SecurityForm: FunctionComponent<SecurityFormProps> = props => {
  const QUESTION_LENGTH: number[] = [1, 2, 3]
  const mounted = useRef(false);
  const [questionList, setQuestionList] = useState<any[]>();
  const [state, setState] = useState<any>()
  const [schemaValidation, setSchemaValidation] = useState<{ [key: string]: any }>({})
  const { errors, setFieldTouched, handleChange, handleBlur, setFieldValue, values, touched, handleSubmit, resetForm } = useFormik({
    initialValues: state,
    onSubmit: (values, actions) => doRequest({ values, actions }),
    validationSchema: yup.object().shape(schemaValidation),
    enableReinitialize: true,
  })

  //componentDidUpdate
  useEffect(() => {
    if (localToArray(props.signupData.securityQuestion).length !== 0) {
      setQuestionList(props.signupData.securityQuestion)
    }
    return () => { }
  }, [props.signupData])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      const innerState: any = {}
      const innerSchema: { [key: string]: any } = {}
      QUESTION_LENGTH.map(number => {
        innerState[`securityQuestion${number}`] = undefined
        innerState[`securityAnswer${number}`] = undefined
        innerSchema[`securityQuestion${number}`] = yup.object().shape({
          Value: yup.mixed().required(defaultString.requiredText),
        })
        innerSchema[`securityAnswer${number}`] = yup.string().required(defaultString.requiredText)
      })
      setState(innerState)
      setSchemaValidation(innerSchema)
      return
    }
    return () => { mounted.current = false }
  }, [])

  //misc
  const doRequest = ({ values, actions }: { values: any; actions: any }) => {
    const request = {
      registerRequest: props.isVisible,
      questionRequest: QUESTION_LENGTH.map(number => {
        return {
          citizen_question: localToString(values[`securityQuestion${number}`]?.Name),
          citizen_answer: cleanString(values[`securityAnswer${number}`]),
          citizen_id: localToString(props.isVisible?.citizen_id),
        }
      }),
    }
    props.postRegister(request)
    props.onVisibleChange(false)
  }

  //Value change handlers
  const onFieldChange = (key: string) => (value: any) => {
    const filledQuestions: any[] = []
    QUESTION_LENGTH.map(number => {
      const securityKey = `securityQuestion${number}`
      if (key == securityKey && !isEmpty(value)) {
        return filledQuestions.push(value)
      } else if (!isEmpty(values[securityKey])) {
        return filledQuestions.push(values[securityKey])
      }
    })
    const diff = mapArrayDiff(localToArray(props.signupData.securityQuestion), filledQuestions)
    setQuestionList(diff)
    return setFieldValue(key, value)
  };

  //rendering
  const RenderQuestion = ({ item, index }: { item: number, index: number }) => {
    return (
      <View key={String(item)}>
        <ModalPicker
          data={questionList}
          placeholder={`Pregunta de seguridad ${item}`}
          value={values[`securityQuestion${item}`]}
          onPickerBlur={() => setFieldTouched(`securityQuestion${item}`)}
          onValueChange={onFieldChange(`securityQuestion${item}`)}
          showError={touched[`securityQuestion${item}`] && errors[`securityQuestion${item}`]}
        />
        <Input
          placeholder={`Respuesta de seguridad ${item}`}
          value={values[`securityAnswer${item}`]}
          onValueChange={handleChange(`securityAnswer${item}`)}
          onInputBlur={handleBlur(`securityAnswer${item}`)}
          showError={touched[`securityAnswer${item}`] && errors[`securityAnswer${item}`]}
        />
      </View>
    )
  }

  return (
    <Modal
      isVisible={!!props.isVisible}
      onVisibleChange={props.onVisibleChange}
    >
      <Text>Preguntas de seguridad</Text>
      <Separator />
      <ListRender
        data={QUESTION_LENGTH}
        renderItem={RenderQuestion}
      />
      <Button
        title='Registrarme'
        onPress={handleSubmit}
        bottomSeparate={false}
        isLoading={props.signupLoading || props.postLoading}
      />
    </Modal>
  )
};

interface SecurityFormProps extends ReduxProps {
  isVisible: any;
  onVisibleChange: (val: boolean) => void;
}

SecurityForm.defaultProps = {

};

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  signupData: state.signup.signupData,
  signupLoading: state.signup.signupLoading,
  signupError: state.signup.signupError,

  postData: state.signup.postData,
  postLoading: state.signup.postLoading,
  postError: state.signup.postError,
});

const mapDispatchToProps = {
  postRegister: SignupActions.postRegister,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(SecurityForm)