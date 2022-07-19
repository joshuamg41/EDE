import { IModalListInDto } from "react-native-picker-modal-view/dist/Interfaces";
import * as yup from 'yup';
import { defaultString } from "../../../utils/StringUtil";

export interface RatingSolicitudeState {
  rating?: number;
  comment?: string;
}

export const schemaValidation = yup.object().shape({
  rating: yup.number().required(defaultString.requiredText).min(0.1, defaultString.requiredText),
  comment: yup.string().required(defaultString.requiredText).min(5, defaultString.requiredText),
})