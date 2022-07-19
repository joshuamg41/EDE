export type ErrorObject = null | undefined | {
  code?: string | number;
  message?: string;
}

export interface ActionObject {
  type: string;
  payload: any;
}