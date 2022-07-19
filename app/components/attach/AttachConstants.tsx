export interface ItemProps {
  item: AttachItem;
  index: number;
}

export interface OptionProps {
  [key: string]: string
}

export const OptionTitle: OptionProps = {
  camera: 'Cámara',
  library: 'Galería',
  document: 'Documentos',
  myDocument: 'Mis Documentos',
}

export const OptionIconName: OptionProps = {
  camera: 'camera-outline',
  library: 'image-outline',
  document: 'document-outline',
  myDocument: 'documents-outline',
}

export interface AttachItem {
  uri: string;
  type: string;
  name: string;
  library: string;
  extension: string;
}