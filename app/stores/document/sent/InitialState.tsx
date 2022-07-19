import { ErrorObject } from "../../StoreConstants";

export interface DocumentSentInitialState {
  getData: any[];
  getLoading: boolean;
  getError: ErrorObject;
}

export default {
  getData: [{
    documentType: 'pdf',
    title: 'pase de Capcana',
  },
  {
    documentType: 'image',
    title: 'Beach',
  },
  ],
  getLoading: false,
  getError: null,
} as DocumentSentInitialState;
