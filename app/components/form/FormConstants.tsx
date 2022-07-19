export const FIELD_TYPES = {
  header: 'header',
  select: 'select',
  text: 'text',
  date: 'date',
  time: 'time',
  radioGroup: 'radio-group',
  checkboxGroup: 'checkbox-group',
  grid: 'grid',
  initialValues: 'rules',
  rulesPrice: 'rulesprice',
  file: 'file',
  textArea: 'textarea',
};

export const RULE_LIST: {[key: string]: string} = {
  '0': 'ocultar',
  '1': 'visualizar',
  '2': 'inhabilitado',
  '3': 'habilitado',
  '4': 'requerido',
  '5': 'clickear',
  '6': 'no Requerido',
  '7': 'limpiar',
  '8': 'cambiarACedula',
  '9': 'cambiarAPasaporte',
  '10': 'cambiarARnc',
  '11': '2,2:longitud,latitud',
};

//How it's set in DB
export const MASK_LIST: {[key: string]: string} = {
  '0': 'Cédula',
  '1': 'RNC',
  '2': 'telefono',
  '3': 'celular',
  '5': 'email',
  '6': 'solo numero',
  '7': 'solo letra',
  '8': 'empresas',
  '9': 'diffEmail',
  '10': 'fecha',
  '11': 'hora',
  '12': 'decimal',
  '20': 'DPP',
  '21': 'MIMARENA',
};

//How i need the string
export const MASK_TYPE: {[key: string]: string} = {
  '0': 'identification',
  '1': 'rnc',
  '2': 'phone',
  '3': 'phone',
  // '5': 'email',
  '6': 'solo numero',
  // '7': 'solo letra',
  // '8': 'inmueble',
  // '9': 'COD.sistema caasd',
  // '10': 'fecha',
  // '11': 'hora',
  // '12': 'decimal',
};

export interface FormState {
  [key: string]: any;
}
