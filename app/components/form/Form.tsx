import {useFormik} from 'formik';
import {isEmpty} from 'lodash';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  FunctionComponent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {FlatList, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {ServiceSolicitudeState} from '../../containers/service/solicitude/ServiceSolicitudeConstants';
import {RootState} from '../../stores/AppReducers';
import SignupActions from '../../stores/signup/Actions';
import ServiceSolicitudeActions from '../../stores/service/solicitude/Actions';
import ApplicationStyles from '../../themes/ApplicationStyles';
import {localToArray} from '../../utils/ArrayUtil';
import {isObjectEmpty, localToObject} from '../../utils/ObjectUtil';
import {localToString} from '../../utils/StringUtil';
import Button from '../button/Button';
import CheckRender from '../security/CheckRender';
import Text from '../text/Text';
import RenderField, {RenderFieldProps} from './components/RenderField';
import {FIELD_TYPES, FormState} from './FormConstants';
import {fieldRuleChanger, getFieldValidation} from './FormFunctions';

const Form: ForwardRefRenderFunction<FormRef, FormPropTypes> = (props, ref) => {
  const mounted = useRef(false);
  const dispatch = useDispatch();
  const documentData = useSelector(
    (state: RootState) => state.signup.documentData,
  );
  const documentLoading = useSelector(
    (state: RootState) => state.signup.documentLoading,
  );
  const mimarenaData = useSelector(
    (state: RootState) => state.serviceSolicitude.mimarenaData,
  );
  const mimarenaLoading = useSelector(
    (state: RootState) => state.serviceSolicitude.mimarenaLoading,
  );
  const dppData = useSelector(
    (state: RootState) => state.serviceSolicitude.dppData,
  );
  const dppLoading = useSelector(
    (state: RootState) => state.serviceSolicitude.dppLoading,
  );
  const flatListRef = useRef<FlatList>();
  const [localLoading, setLocalLoading] = useState<boolean>(true);
  const [localData, setLocalData] = useState<RenderFieldProps[][]>([]);
  const [localError, setLocalError] = useState<{[key: string]: string}>({});
  const steps = localToArray(localData).length;
  const [fakeSteps, setFakeSteps] = useState<number>(0);
  const [fakeStep, setFakeStep] = useState<number>(0);
  const [step, setStep] = useState<number>(0);
  const lastStep = steps - 1 == step;
  const fakeLastStep = fakeSteps - 1 == fakeStep;
  const [state, setState] = useState<FormState>({});
  const [appliedRuleList, setAppliedRuleList] = useState<string[]>([]);
  const [schemaValidation, setSchemaValidation] = useState<{
    [key: string]: any;
  }>({});
  const {
    errors,
    handleBlur,
    setFieldValue,
    handleChange,
    values,
    handleSubmit,
    touched,
    setFieldTouched,
    setFieldError,
    setErrors,
    setTouched,
  } = useFormik({
    initialValues: state,
    onSubmit: (values, actions) => localDoRequest({values, actions}),
    // MOCK
    validationSchema: yup.object().shape(schemaValidation),
    enableReinitialize: true,
  });

  //Hooks
  useImperativeHandle(ref, () => ({
    saveForm: () => {
      return {
        appliedRuleList: appliedRuleList,
        values: values,
        fakeStep: fakeStep,
        fakeSteps: fakeSteps,
        step: step,
        errors: {...localToObject(errors), ...localError},
        localData: localData,
      };
    },
  }));

  //componentDidUpdate
  useEffect(() => {
    if (localToArray(localData).length > 0) {
      const notHidden = localData.filter(step => !step[0].hidden);
      setFakeSteps(notHidden.length);
    }
    return () => {};
  }, [localData]);

  useEffect(() => {
    if (localToArray(localData).length > 0) {
      const innerSchema: {[key: string]: any} = {};
      localData[step].map(field => {
        const validator = getFieldValidation(field);
        if (validator) {
          innerSchema[field.fieldKey] = getFieldValidation(field);
        }
      });
      setSchemaValidation(innerSchema);
      setLocalLoading(false);
    }
    return () => {};
  }, [localData, step]);

  useEffect(() => {
    const _data = localToArray(props.data);
    if (_data.length > 0) {
      //setting every key to undefined so formik mark red error
      const innerState: {[key: string]: any} = {...state, ...values};
      const innerRules: string[] = [];

      for (const field of props.plainData) {
        if (!innerState[field.fieldKey]) {
          innerState[field.fieldKey] = undefined;
        }
      }

      //initial rules
      const initialState = localToArray(
        props.plainData.find(field => field.type == FIELD_TYPES.initialValues)
          ?.rules,
      );
      if (initialState.length) {
        for (const row of initialState) {
          const _row = localToArray(JSON.parse(row));
          for (const field of _row) {
            const originalObject = props.plainData.find(
              plainField => plainField.name == field.name,
            );
            switch (field.type) {
              case FIELD_TYPES.checkboxGroup:
                const checkRule = originalObject?.values.find(
                  values => values.value == field.name,
                )?.rule;
                if (checkRule) {
                  innerRules.push(checkRule);
                }
                innerState[field.name] = true;
                break;
              case FIELD_TYPES.radioGroup:
                const radioRule = originalObject?.values.find(
                  values => values.value == field.value,
                )?.rule;
                if (radioRule) {
                  innerRules.push(radioRule);
                }
                innerState[field.name] = field.value;
                break;
              case FIELD_TYPES.select:
                const selectObject = originalObject?.data?.find(
                  values => values.Value == field.value,
                );
                if (selectObject?.rule) {
                  innerRules.push(selectObject?.rule);
                }
                innerState[field.name] = selectObject;
                break;
              default:
                innerState[field.name] = field.value;
                break;
            }
            innerRules.push(`2:${field.name}`);
          }
        }
      }

      //Initial rulesprice
      const rulesPrice = localToArray(
        props.plainData.find(field => field.type == FIELD_TYPES.rulesPrice)
          ?.data,
      ).filter(rulePrice =>
        [
          ...props.variations,
          ...localToArray(props.initialForm?.variations),
        ].includes(localToString(rulePrice?.id)),
      );
      if (rulesPrice.length) {
        for (const row of rulesPrice) {
          const _row = localToArray(JSON.parse(row?.rules));
          for (const field of _row) {
            const originalObject = props.plainData.find(
              plainField => plainField.name == field.name,
            );
            switch (field.type) {
              case FIELD_TYPES.checkboxGroup:
                const checkRule = originalObject?.values.find(
                  values => values.value == field.name,
                )?.rule;
                if (checkRule) {
                  innerRules.push(checkRule);
                }
                innerState[field.name] = true;
                break;
              case FIELD_TYPES.radioGroup:
                const radioRule = originalObject?.values.find(
                  values => values.value == field.value,
                )?.rule;
                if (radioRule) {
                  innerRules.push(radioRule);
                }
                innerState[field.name] = field.value;
                break;
              case FIELD_TYPES.select:
                const selectObject = originalObject?.data?.find(
                  values => values.Value == field.value,
                );
                if (selectObject?.rule) {
                  innerRules.push(selectObject?.rule);
                }
                innerState[field.name] = selectObject;
                break;
              default:
                innerState[field.name] = field.value;
                break;
            }
            innerRules.push(`2:${field.name}`);
          }
        }
      }

      //setting initial rules && values
      //don't apply innerRules if its draft
      if (props.isDraft) {
        changeRule(localToArray(props.initialForm?.rules), _data, true);
      } else {
        changeRule(innerRules, _data, true);
      }
      setState({
        ...innerState,
        ...localToObject(props.initialForm?.data),
        ...localToObject(props.initialForm?.grid),
      });
      setFakeStep(props.initialForm?.fakeStep || 0);
      setStep(props.initialForm?.step || 0);
    }
    return () => {};
  }, [props.data, props.initialForm]);

  useEffect(() => {
    if (mounted.current && documentData?.payload?.fieldKey) {
      if (documentData.exist) {
        const _localError = {
          ...localError,
        };
        delete _localError[documentData?.payload?.fieldKey];
        delete _localError.undefined;
        setLocalError(_localError);
      } else {
        const _localError = {
          ...localError,
        };
        _localError[documentData?.payload?.fieldKey] =
          'Cédula no válida, introduzca otra cédula';
        delete _localError.undefined;
        setLocalError(_localError);
      }
    }
    return () => {};
  }, [documentData]);

  useEffect(() => {
    if (mounted.current && mimarenaData?.payload?.fieldKey) {
      if (mimarenaData.success) {
        const _localError = {
          ...localError,
        };
        delete _localError[mimarenaData?.payload?.fieldKey];
        delete _localError.undefined;
        setLocalError(_localError);
      } else {
        const _localError = {
          ...localError,
        };
        _localError[mimarenaData?.payload?.fieldKey] = mimarenaData.message;
        delete _localError.undefined;
        setLocalError(_localError);
      }
    }
    return () => {};
  }, [mimarenaData]);

  useEffect(() => {
    if (mounted.current && dppData?.payload?.fieldKey) {
      if (dppData.success) {
        const _localError = {
          ...localError,
        };
        delete _localError[dppData?.payload?.fieldKey];
        delete _localError.undefined;
        setLocalError(_localError);
      } else {
        const _localError = {
          ...localError,
        };
        _localError[dppData?.payload?.fieldKey] = dppData.message;
        delete _localError.undefined;
        setLocalError(_localError);
      }
    }
    return () => {};
  }, [dppData]);

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    return () => {
      mounted.current = false;
      setState({});
      setSchemaValidation({});
      setLocalLoading(true);
    };
  }, []);

  //Misc
  const handleSend = () => {
    handleSubmit();
    if (!isObjectEmpty(errors)) {
      flatListRef.current?.scrollToIndex({index: 0});
    }
  };

  //NextStep or Send
  const localDoRequest = ({values, actions}: {values: any; actions: any}) => {
    //Mocked
    // props.doRequest({ values, actions })
    // return
    if (!isEmpty(localError)) {
      flatListRef.current?.scrollToIndex({index: 0});
      return;
    }
    if (fakeLastStep) {
      props.doRequest({values, actions});
    } else {
      let extraStep = 0;
      for (let i = step + 1; i < localData.length; i++) {
        const fields = localData[i];
        if (fields[0].hidden) {
          extraStep++;
        } else {
          break;
        }
      }
      props.handleFormSave(false);
      setStep(step + 1 + extraStep);
      setFakeStep(fakeStep + 1);
      flatListRef.current?.scrollToIndex({index: 0});
      actions?.setTouched({});
      actions?.setSubmitting(false);
    }
  };

  //PrevStep
  const prevStep = () => {
    let extraStep = 0;
    for (let i = step - 1; i > 0; i--) {
      const fields = localData[i];
      if (fields[0].hidden) {
        extraStep++;
      } else {
        break;
      }
    }
    setStep(step - 1 - extraStep);
    setFakeStep(fakeStep - 1);
  };

  //Validation callers
  const validateDocument = (fieldKey: string, value: string) => {
    if (value == '') {
      return;
    }
    dispatch(
      SignupActions.getDocumentValidate({
        citizen_id: value,
        fieldKey,
      }),
    );
  };

  const validateMimarena = (fieldKey: string, value: string) => {
    if (value == '') {
      return;
    }
    dispatch(
      ServiceSolicitudeActions.getMimarenaValidate({
        invoiceNumber: value,
        fieldKey,
      }),
    );
  };

  const validateDpp = (fieldKey: string, type: string, value: string) => {
    if (value == '') {
      return;
    }
    dispatch(
      ServiceSolicitudeActions.getDppValidate({
        code: value,
        type,
        fieldKey,
      }),
    );
  };

  //Rule Handler
  const changeRule = (
    rule?: string | string[],
    initialData?: RenderFieldProps[][],
    initialCall = false,
  ) => {
    if (!initialCall && (!rule || !rule.length)) {
      return;
    } else if (initialCall && (!rule || !rule.length)) {
      setLocalData(localToArray(initialData ?? localData));
      return;
    }

    const ruleList: string[] = Array.isArray(rule)
      ? rule
      : [localToString(rule)];
    let _localData = localToArray(initialData ?? localData);
    for (let index = 0; index < ruleList.length; index++) {
      if (!ruleList[index] || ruleList[index] == '') {
        continue;
      }
      const ruleSeparated = localToString(ruleList[index]).split(':');
      const ruleAction: string[] = localToString(ruleSeparated[0]).split(',');
      const ruleField: string[] = localToString(ruleSeparated[1]).split(',');

      _localData = _localData.map((step: any[]) => {
        return step.map((field: RenderFieldProps) => {
          //Main field modifier
          let _field = fieldRuleChanger({
            field,
            ruleAction,
            ruleField,
            ruleList,
            values,
            setFieldValue,
          });

          //Secondary field modifier (for fields inside field)
          if (
            field.type == FIELD_TYPES.grid &&
            localToArray(field.fields).length
          ) {
            _field = {
              ..._field,
              fields: field.fields.map((fieldsField: RenderFieldProps) => {
                const _fieldsField = fieldRuleChanger({
                  field: fieldsField,
                  ruleAction,
                  ruleField,
                  ruleList,
                  values,
                  setFieldValue,
                });
                return _fieldsField;
              }),
            };
          }

          return _field;
        });
      });
    }

    initialCall
      ? setAppliedRuleList(ruleList)
      : setAppliedRuleList([...appliedRuleList, ...ruleList]);
    setLocalData(_localData);
  };

  //rendering
  const LocalRenderField = ({
    item,
    index,
  }: {
    item: RenderFieldProps;
    index: number;
  }) => {
    return (
      <RenderField
        {...item}
        index={index}
        value={values[item.fieldKey]}
        fatherValue={values[localToString(item.father_id)]}
        //@ts-ignore
        error={
          touched[item.fieldKey] &&
          (errors[item.fieldKey] || localError[item.fieldKey])
        }
        onValueChange={setFieldValue}
        setFieldTouched={setFieldTouched}
        step={step}
        steps={steps}
        changeRule={changeRule}
        validateDocument={validateDocument}
        validateMimarena={validateMimarena}
        validateDpp={validateDpp}
        documentLoading={documentLoading}
        mimarenaLoading={mimarenaLoading}
        dppLoading={dppLoading}
        multipleDocument={props.multipleDocument}
      />
    );
  };

  return (
    <FlatList
      data={localData[step]}
      //@ts-ignore
      ref={flatListRef}
      //@ts-ignore
      renderItem={LocalRenderField}
      removeClippedSubviews={false}
      ListHeaderComponent={
        <View style={ApplicationStyles.hPLarge}>
          <Text>
            Paso {fakeStep + 1} de {fakeSteps}
          </Text>
        </View>
      }
      ListFooterComponent={
        <View>
          <CheckRender allowed={!localLoading}>
            <Button
              title={fakeLastStep ? 'Enviar' : 'Siguiente'}
              onPress={handleSend}
              theme="primaryOutline"
              // isLoading={props.postLoading}
            />
          </CheckRender>
          <CheckRender allowed={step > 0}>
            <Button title={'Atrás'} onPress={prevStep} theme="primary" />
          </CheckRender>
        </View>
      }
    />
  );
};

export interface FormRef {
  saveForm: () => {
    appliedRuleList: string[];
    values: FormState;
    fakeStep: number;
    fakeSteps: number;
    step: number;
    errors: {[key: string]: string};
    localData: RenderFieldProps[][];
  };
}

interface FormPropTypes {
  doRequest: ({values, actions}: {values: any; actions: any}) => void;
  data: RenderFieldProps[][];
  plainData: RenderFieldProps[];
  postLoading: boolean;
  initialForm: ServiceSolicitudeState;
  handleFormSave: (showSuccess: boolean) => void;
  variations: string[];
  multipleDocument: boolean;
  isDraft: boolean;
}

export default forwardRef(Form);
