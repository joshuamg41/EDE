import { IModalListInDto } from "react-native-picker-modal-view/dist/Interfaces";
import * as yup from 'yup';
import { defaultString } from "../../../utils/StringUtil";

export interface ClaimSolicitudeState {
  reasonType?: IModalListInDto;
  problemDetail?: string;
}

export const schemaValidation = yup.object().shape({
  reasonType: yup.object().shape({
    Value: yup.mixed().required(defaultString.requiredText),
  }),
  problemDetail: yup.string().required(defaultString.requiredText).min(5, defaultString.requiredText),
})