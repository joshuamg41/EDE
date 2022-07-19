import * as yup from 'yup';
import { defaultString } from '../../utils/StringUtil';

export interface ChatState {
  text?: string;
}

export const schemaValidation = yup.object().shape({
  text: yup.string().required(defaultString.requiredText),
})