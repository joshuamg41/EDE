import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import RenderColumn from '../../../../components/render/column/RenderColumn';
import RenderRow from '../../../../components/render/row/RenderRow';
import { navigate } from '../../../../services/NavigationService';
import { ProfileBusinessItem } from '../../../../services/profile/ProfileServiceConstants';
import { COLORS, METRICS } from '../../../../themes';
import { horizontalScale, moderateScale, verticalScale } from '../../../../utils/StyleHelpers';

const RenderBusiness = (props: propTypes) => {
  const localPress = () => {
    if (props.screen) {
      navigate(props.screen)
    } else {
      navigate('ProfileBusiness', props.item)
    }
  }

  return (
    <TouchableHighlight
      onPress={localPress}
      underlayColor={COLORS.lightGray}
      style={Styles.container}
    >
      <>
        <RenderColumn
          title="Nombre completo"
          body={props.item?.company_name}
        />
        <RenderRow
          title1={'Rnc'}
          body1={props.item?.company_rnc}
          title2={'Estatus'}
          body2={props.item?.active ? 'Activa' : 'Inactiva'}
        />
      </>
    </TouchableHighlight>
  )
}

interface propTypes {
  item?: ProfileBusinessItem;
  index?: number;
  screen?: string;
}

RenderBusiness.defaultProps = {

}

const Styles = StyleSheet.create({
  //RenderBusiness
  container: {
    paddingVertical: verticalScale(METRICS.large15),
    paddingHorizontal: horizontalScale(METRICS.large15),
    marginHorizontal: horizontalScale(METRICS.large15),
    borderRadius: moderateScale(METRICS.small5),
    backgroundColor: COLORS.white,
    borderColor: COLORS.tertiaryOpacity,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
})

export default React.memo(RenderBusiness);
