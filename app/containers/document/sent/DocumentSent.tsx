import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import update from 'immutability-helper';
import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { connect, ConnectedProps } from "react-redux";
import Attach from '../../../components/attach/Attach';
import Container from '../../../components/container/Container';
import ContentFlatList from '../../../components/content/ContentFlatList';
import Header from '../../../components/header/Header';
import HorizontalLine from '../../../components/horizontal-line/HorizontalLine';
import ListEmpty from '../../../components/list-empty/ListEmpty';
import RenderDocumentItem from '../../../components/render/document-item/RenderDocumentItem';
import RequestHeader from '../../../components/request-header/RequestHeader';
import { RootState } from '../../../stores/AppReducers';
import { COLORS } from '../../../themes';
import { localToArray } from '../../../utils/ArrayUtil';
import { HomeNavigatorParamList } from '../../root/navigators/flows/HomeNavigator';
import { DocumentSentState } from './DocumentSentConstants';

const DocumentSent = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [documentList, setDocumentList] = useState<any[]>([])
  const [state, setState] = useState<DocumentSentState>({})

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      return () => { }
    }, [props.navigation])
  );

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  //rendering
  return (
    <Container>
      <Header
        title="Documentos enviados"
        leftIcon
      />
      <ContentFlatList
        data={localToArray(props.getData?.request?.request_document)}
        renderItem={RenderDocumentItem}
        ItemSeparatorComponent={HorizontalLine}
        ListHeaderComponent={<RequestHeader />}
        ListFooterComponent={View}
        ListEmptyComponent={
          <ListEmpty
            errorText='Aún no existen documentos enviados'
            errorColor={COLORS.grayPlaceholder}
          />
        }
      />
      {/* <Attach
        value={documentList}
        onValueChange={setDocumentList}
        title='Subir Documentos'
        buttonTheme='primaryOutline'
        showButton={true}
        bottomSeparate={false}
        options={['camera', 'document']}
      /> */}
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<HomeNavigatorParamList, 'DocumentSent'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  getData: state.requestDetail.getData,
  getLoading: state.requestDetail.getLoading,
  getError: state.requestDetail.getError,
});

const mapDispatchToProps = {

}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(DocumentSent)