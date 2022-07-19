export interface ServiceSolicitudeState {
  rules?: string[];
  data?: {
    [key: string]: any;
  },
  grid?: {
    [key: string]: any;
  };
  fakeStep?: number;
  step?: number;
  totalPayment: number;
  variations: string[];
}