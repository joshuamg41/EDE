import * as yup from 'yup';
import {RootState} from '../../stores/AppReducers';
import {store} from '../../stores/index';
import {safeValExtraction} from '../../utils/ObjectUtil';
import {defaultString, localToString} from '../../utils/StringUtil';
import {RenderFieldProps} from './components/RenderField';
import {FIELD_TYPES, FormState, MASK_LIST, RULE_LIST} from './FormConstants';

export const getFieldValidation = (field: RenderFieldProps) => {
  const state: RootState = store?.getState();
  const user = state.signin.user;

  if (!field || !field.type || field.hidden) {
    return;
  } else if (field.type == FIELD_TYPES.select && !field.required) {
    return;
  }

  let validator = undefined;

  switch (field.type) {
    case FIELD_TYPES.time:
      validator = yup.date();
      break;
    case FIELD_TYPES.date:
      validator = yup.date();
      break;
    case FIELD_TYPES.radioGroup:
      validator = yup.string();
      break;
    case FIELD_TYPES.text:
      validator = yup.string();
      break;
    case FIELD_TYPES.textArea:
      validator = yup.string();
      break;
    case FIELD_TYPES.select:
      validator = yup.object().shape({
        Value: yup.mixed().required(defaultString.requiredText),
      });
      break;
    case FIELD_TYPES.file:
      if (field?.required) {
        validator = yup
          .array()
          .min(1, defaultString.requiredText)
          .required(defaultString.requiredText);
      }
      break;
    case FIELD_TYPES.grid:
      validator = yup
        .array()
        .min(1, defaultString.requiredText)
        .required(defaultString.requiredText);
      break;
    default:
      break;
  }

  if (field?.required && validator) {
    validator = validator.required(defaultString.requiredText);
  }

  switch (MASK_LIST[localToString(field.Mask)]) {
    case MASK_LIST[5]:
      validator = validator.email(defaultString.validEmail);
      break;
    case MASK_LIST[9]:
      validator = validator
        .email(defaultString.validEmail)
        .notOneOf(
          [user.data?.email, user.data?.email2],
          'El correo ingresado no puede ser el mismo que ya posee registrado',
        );
      break;
    default:
      break;
  }

  return validator;
};

export const fieldRuleChanger = ({
  field,
  ruleAction,
  ruleField,
  ruleList,
  values,
  setFieldValue,
}: {
  field: RenderFieldProps;
  ruleAction: string[];
  ruleField: string[];
  ruleList: string[];
  values: FormState;
  setFieldValue: (field: string, val: any) => void;
}): RenderFieldProps => {
  const findRuleField = ruleField.find(
    fieldName => field?.fieldKey == fieldName,
  );

  let _field = {
    ...field,
  };

  //Main field modifier
  if (findRuleField) {
    const rulesToApply = ruleField
      .map((fieldName, index) => {
        if (field?.fieldKey == fieldName) {
          return RULE_LIST[ruleAction[index]];
        } else {
          return null;
        }
      })
      .filter(item => item !== null);

    //add more ruleList if its rule five and the other field (select) has value
    if (
      rulesToApply.find(item => item == RULE_LIST[5]) &&
      safeValExtraction(values[field?.fieldKey], 'Rule')
    ) {
      ruleList.push(safeValExtraction(values[field?.fieldKey], 'Rule'));
    }

    //return the modified object
    _field = {
      ...dataObjectRuleChanger(field, rulesToApply, setFieldValue),
    };
  }

  return _field;
};

export const dataObjectRuleChanger = (
  item: RenderFieldProps,
  rules: (string | null)[],
  valChange: (field: string, val: any) => void,
) => {
  const _item = {...item};
  for (const rule of rules) {
    switch (rule) {
      case RULE_LIST[0]:
        _item.hidden = true;
        break;
      case RULE_LIST[1]:
        _item.hidden = false;
        break;
      case RULE_LIST[2]:
        _item.enabled = false;
        break;
      case RULE_LIST[3]:
        _item.enabled = true;
        break;
      case RULE_LIST[4]:
        _item.required = true;
        break;
      case RULE_LIST[5]:
        //
        break;
      case RULE_LIST[6]:
        _item.required = false;
        break;
      case RULE_LIST[7]:
        valChange(_item?.fieldKey, undefined);
        break;
      case RULE_LIST[8]:
        _item.Mask = '0';
        _item.label = 'No. de Cédula';
        break;
      case RULE_LIST[9]:
        _item.Mask = null;
        _item.label = 'Pasaporte';
        break;
      case RULE_LIST[10]:
        _item.Mask = '1';
        _item.label = 'RNC';
        break;
      case RULE_LIST[11]:
        _item.value = 11;
        console.log('hola');
        break;
      default:
        break;
    }
  }
  return _item;
};
