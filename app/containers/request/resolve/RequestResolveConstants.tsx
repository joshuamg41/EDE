export interface RequestResolveState {
  text?: string;
  doc?: any[];
}

const RequestTypes: { [key: string]: string } = {
  1: 'Documentos',
  3: 'Información requerida',
  7: 'Pago',
}