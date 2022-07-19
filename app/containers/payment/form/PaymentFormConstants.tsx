import * as yup from 'yup';
import { defaultString } from '../../../utils/StringUtil';

export interface PaymentFormState {
  transference?: any[],
  deposit?: any[],
}

export const schemaValidation = yup.object().shape({
  doc: yup.array().min(1, defaultString.requiredText).required(defaultString.requiredText),
})