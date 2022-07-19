import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/AppReducers';
import ApplicationStyles from '../../themes/ApplicationStyles';
import HorizontalLine from '../horizontal-line/HorizontalLine';
import RenderColumn from '../render/column/RenderColumn';
import CheckRender from '../security/CheckRender';

const RequestHeader: FunctionComponent<RequestHeaderPropTypes> = props => {
  const { getData, getLoading } = useSelector((state: RootState) => state.requestDetail)

  return (
    <View style={ApplicationStyles.hPLarge}>
      <RenderColumn
        title='Servicio'
        body={getData?.request?.service?.name}
        size='regular'
        isLoading={getLoading}
      />
      <CheckRender allowed={!getData?.request?.provisional}>
        <RenderColumn
          title='Número de solicitud'
          body={getData?.request?.code}
          size='regular'
          isLoading={getLoading}
        />
      </CheckRender>
      <HorizontalLine marginHorizontal={0} />
    </View>
  );
}

interface RequestHeaderPropTypes {

}

RequestHeader.defaultProps = {

}

const Styles = StyleSheet.create({

})

export default React.memo(RequestHeader);