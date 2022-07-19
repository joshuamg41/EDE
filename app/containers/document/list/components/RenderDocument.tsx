import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useRef } from 'react';
import { RefreshControl, View } from 'react-native';
import { connect, ConnectedProps } from "react-redux";
import Container from '../../../../components/container/Container';
import ContentFlatList from '../../../../components/content/ContentFlatList';
import HorizontalLine from '../../../../components/horizontal-line/HorizontalLine';
import ListEmpty from '../../../../components/list-empty/ListEmpty';
import Loading from '../../../../components/loading/Loading';
import RenderDocumentItem from '../../../../components/render/document-item/RenderDocumentItem';
import { RootState } from '../../../../stores/AppReducers';
import DocumentListActions from '../../../../stores/document/list/Actions';
import { COLORS } from '../../../../themes';
import { filterArray, localToArray } from '../../../../utils/ArrayUtil';
import { RefreshControlBaseProps } from '../../../../utils/ConstantsUtil';
import { localToNumber } from '../../../../utils/NumberUtil';
import { DocumentNavigatorParamList } from '../../../root/navigators/flows/DocumentNavigator';
import { documentListScreens } from './RenderDocumentConstants';

const DocumentListItem = (props: ScreenProps) => {
  const mounted = useRef(false);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => doRequest(), 100)
      return () => { }
    }, [props.navigation])
  );

  //misc
  const doRequest = () => {
    //@ts-ignore
    if (localToArray(props.getData[documentListScreens[props.route.name]]?.data).length) {
      return
    }
    const request = {
      citizen_id: props.user.data?.citizen_id,
      origin: documentListScreens[props.route.name],
    }
    props.getDocumentList(request)
  }

  const loadMore = () => {
    if (props.getLoading ||
      props.moreLoading ||
      //@ts-ignore
      (props.getData?.[documentListScreens[props.route.name]]?.current_page == props.getData?.[documentListScreens[props.route.name]]?.last_page)) {
      return
    }
    const request = {
      body: {
        status: 1,
        type: 1,
        //@ts-ignore
        page: localToNumber(props.getData?.[documentListScreens[props.route.name]]?.current_page) + 1,
      },
      citizen_id: props.user.data?.citizen_id,
      origin: documentListScreens[props.route.name],
    }
    props.getMoreDocument(request)
  }

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    return () => { mounted.current = false }
  }, [])

  //rendering
  return (
    <Container>
      <ContentFlatList
        data={filterArray(
          props.query,
          //@ts-ignore
          localToArray(props.getData[documentListScreens[props.route.name]]?.data),
          ['name']
        )}
        renderItem={RenderDocumentItem}
        ItemSeparatorComponent={HorizontalLine}
        ListHeaderComponent={View}
        ListEmptyComponent={<ListEmpty isLoading={props.getLoading} errorText='Aún no existen documentos' />}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        ListFooterComponent={
          <Loading
            isLoading={props.moreLoading}
            color={COLORS.primary}
            bottomSeparate={true}
          />
        }
        refreshControl={
          <RefreshControl
            {...RefreshControlBaseProps}
            refreshing={props.getLoading}
            onRefresh={doRequest}
            progressViewOffset={0}
          />
        }
      />
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<DocumentNavigatorParamList, 'DocumentListItem'> {

}

const mapStateToProps = (state: RootState) => ({
  query: state.documentList.query,

  getData: state.documentList.getData,
  getLoading: state.documentList.getLoading,
  moreLoading: state.documentList.moreLoading,

  user: state.signin.user,
});

const mapDispatchToProps = {
  getDocumentList: DocumentListActions.getDocumentList,
  getMoreDocument: DocumentListActions.getMoreDocument,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(DocumentListItem)