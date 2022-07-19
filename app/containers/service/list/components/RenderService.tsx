import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {TouchableHighlight, Image} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import Misc from '../../../../assets/images/misc/Misc';
import Container from '../../../../components/container/Container';
import ContentFlatList from '../../../../components/content/ContentFlatList';
import ErrorContainer from '../../../../components/error-container/ErrorContainer';
import ListEmpty from '../../../../components/list-empty/ListEmpty';
import Text from '../../../../components/text/Text';
import {navigate} from '../../../../services/NavigationService';
import {RootState} from '../../../../stores/AppReducers';
import {COLORS, FONTS, FONTS_FAMILY, METRICS} from '../../../../themes';
import {filterArray, localToArray} from '../../../../utils/ArrayUtil';
import {horizontalScale, verticalScale} from '../../../../utils/StyleHelpers';
import {ServiceNavigatorParamList} from '../../../root/navigators/flows/ServiceNavigator';
import {RenderItemTypes} from './RenderServiceConstants';
import Styles from './RenderServiceStyles';

const RenderItem = (itemProps: RenderItemTypes) => {
  return (
    <TouchableHighlight
      onPress={() =>
        navigate('ServiceDetail', {
          id: String(itemProps.item?.id),
          name: itemProps.item?.name,
        })
      }
      underlayColor={COLORS.lightGray}
      style={Styles.itemContent}>
      <>
        <Image source={Misc.service_card} style={{width: '100%'}} />
        <Text
          style={{
            fontFamily: FONTS_FAMILY.medium.title,
            fontSize: FONTS.regular,
            color: COLORS.primary,
            textAlign: 'center',
            alignSelf: 'center',
            marginVertical: verticalScale(METRICS.xLargeMedium25),
            paddingHorizontal: horizontalScale(METRICS.medium10),
          }}>
          {itemProps.item?.name}
        </Text>
        {/* <Text numberOfLines={3}>{itemProps.item?.description}</Text> */}
      </>
    </TouchableHighlight>
  );
};

const ServiceListItem = (props: ScreenProps) => {
  const data = filterArray(
    props.query,
    localToArray(props.getData).find(item => item.name == props.route.name)
      ?.services,
    ['name'],
  );

  //rendering
  return (
    <Container>
      <ErrorContainer isLoading={props.getLoading}>
        <ContentFlatList
          data={data}
          //@ts-ignore
          renderItem={RenderItem}
          ListEmptyComponent={
            <ListEmpty
              separator={false}
              errorText={
                props.query == ''
                  ? undefined
                  : 'No existen servicios para esta búsqueda'
              }
            />
          }
        />
      </ErrorContainer>
    </Container>
  );
};

interface ScreenProps
  extends ReduxProps,
    StackScreenProps<ServiceNavigatorParamList, 'ServiceListItem'> {}

const mapStateToProps = (state: RootState) => ({
  getData: state.serviceList.getData,
  getLoading: state.serviceList.getLoading,
  getError: state.serviceList.getError,

  query: state.serviceList.query,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ServiceListItem);
