import { Item } from 'react-native-picker-select';

export interface RequestListState {
  query: string;
  status: string;
}

export const statusSelect: Item[] = [
  {
    value: "1",
    label: "En proceso",
  },
  {
    value: "2",
    label: "Finalizada",
  },
]