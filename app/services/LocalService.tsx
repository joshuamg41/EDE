import { IModalListInDto } from 'react-native-picker-modal-view/dist/Interfaces';
import { Item } from 'react-native-picker-select';

export const documentTypeData: IModalListInDto[] = [
  {
    Id: "1",
    Name: "Cédula",
    Value: "1",
  },
  {
    Id: "2",
    Name: "Pasaporte",
    Value: "2",
  },
]

export const reasonClaimTypeData: IModalListInDto[] = [
  {
    Id: "1",
    Name: "test",
    Value: "1",
  },
  {
    Id: "2",
    Name: "test 2",
    Value: "2",
  },
]

export const documentTypeSelect: Item[] = [
  {
    value: "1",
    label: "Cédula",
  },
  {
    value: "2",
    label: "Pasaporte",
  },
]

export const sexToWord: {[key: string]: string} = {
  M: 'Masculino',
  F: 'Femenino',
}