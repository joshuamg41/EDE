import React, { FunctionComponent } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import ProgressBar from '../../../../components/progress-bar/ProgressBar';
import CheckRender from '../../../../components/security/CheckRender';
import Separator from '../../../../components/separator/Separator';
import Text from '../../../../components/text/Text';
import { RequestListItem } from '../../../../services/request/RequestServiceConstants';
import { navigate } from '../../../../services/NavigationService';
import { COLORS, FONTS, FONTS_FAMILY, METRICS } from '../../../../themes';
import { localToNumber } from '../../../../utils/NumberUtil';
import { horizontalScale, moderateScale, verticalScale } from '../../../../utils/StyleHelpers';
import moment from 'moment';
import { parseToMoneyWCents } from '../../../../utils/StringUtil';

const RenderSolicitude: FunctionComponent<propTypes> = props => {
  //Rendering
  return (
    <>
      <TouchableHighlight
        underlayColor={COLORS.lightGray}
        onPress={() => navigate('RequestDetail', props.item)}
        style={Styles.container}
      >
        <View style={Styles.content}>

          <View style={Styles.mainSection}>
            <View style={Styles.textSection}>
              <Text style={Styles.title}>
                {props.item?.service.name}
              </Text>
              <Separator height={METRICS.small5} />
              <CheckRender allowed={props.item?.created_at}>
                <Text style={Styles.body}>
                  Fecha de solicitud: {moment(props.item?.created_at, 'YYYY-MM-DD HH:mm:ss').format('DD/MMM/YYYY')}
                </Text>
              </CheckRender>
              <Separator height={METRICS.small5} />
              {/* <CheckRender allowed={!props.item?.approval_number}>
                <Text style={Styles.body}>
                  Monto: {parseToMoneyWCents(props.item?.payment?.payment_amount)}
                </Text>
                <Separator height={METRICS.small5} />
              </CheckRender> */}
              <CheckRender allowed={!props.item?.provisional}>
                <Text style={Styles.body}>
                  Solicitud No.: {props.item?.code}
                </Text>
                <Separator height={METRICS.small5} />
              </CheckRender>
              <Text style={Styles.statusInfo}>
                {localToNumber(props.item?.progress)}% | Estado: {props.item?.status?.name}
              </Text>

            </View>
          </View>
          <Separator height={METRICS.small5} />
          <ProgressBar
            progress={localToNumber(props.item?.progress) / 100}
            //@ts-ignore
            color={COLORS[props.item?.status?.color || 'success']}
          />
          <CheckRender allowed={props.item?.request_actions}>
            <Separator height={METRICS.medium10} />
            <View style={[
              Styles.statusSection,
              //@ts-ignore
              { backgroundColor: COLORS[props.item?.request_actions?.class || 'grayPlaceholder'] }
            ]}>
              <Text style={Styles.statusTitle}>
                {props.item?.request_actions?.name}
              </Text>
            </View>
          </CheckRender>
        </View>
      </TouchableHighlight>
    </>
  );
}

interface propTypes {
  item?: RequestListItem;
  index?: number;
}

RenderSolicitude.defaultProps = {

}

const Styles = StyleSheet.create({
  container: {

  },
  content: {
    paddingVertical: verticalScale(METRICS.large15),
    paddingHorizontal: horizontalScale(METRICS.large15),
  },
  mainSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS_FAMILY.medium.body,
  },
  body: {
    fontFamily: FONTS_FAMILY.regular.body,
    color: COLORS.gray,
  },
  statusInfo: {
    fontFamily: FONTS_FAMILY.medium.body,
  },
  textSection: {
    flex: 1,
  },
  statusSection: {
    borderRadius: moderateScale(METRICS.small5),
    paddingVertical: verticalScale(METRICS.medium10),
    minWidth: horizontalScale(75),
    backgroundColor: COLORS.grayPlaceholder,
    paddingHorizontal: horizontalScale(METRICS.small5),
  },
  statusTitle: {
    textAlign: 'center',
    fontSize: FONTS.word,
    color: COLORS.white,
  },
})

export default RenderSolicitude