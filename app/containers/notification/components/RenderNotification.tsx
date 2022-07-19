import React, { FunctionComponent } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CheckRender from '../../../components/security/CheckRender';
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import { navigate } from '../../../services/NavigationService';
import { NotificationListItem } from '../../../services/notification/NotificationServiceConstants';
import { RootState } from '../../../stores/AppReducers';
import NotificationActions from '../../../stores/notification/Actions';
import { COLORS, FONTS, FONTS_FAMILY, METRICS } from '../../../themes';
import { localToString } from '../../../utils/StringUtil';
import { horizontalScale, moderateScale, verticalScale } from '../../../utils/StyleHelpers';

const RenderNotification: FunctionComponent<propTypes> = props => {
  const user = useSelector((state: RootState) => state.signin.user)
  const dispatch = useDispatch();

  const onPress = () => {
    const request = {
      citizen_id: user?.data?.citizen_id,
      body: {
        notification: props.item?.notification_id,
      }
    }
    dispatch(NotificationActions.postNotificationRead(request))
    navigate('RequestDetail', { ...props.item, id: props.item?.['iD de solicitud'] })
  }

  //Rendering
  return (
    <TouchableHighlight
      underlayColor={COLORS.lightGray}
      onPress={onPress}
      style={Styles.container}
    >
      <View>
        <CheckRender allowed={localToString(props.item?.title) !== ''}>
          <Text
            style={Styles.title}
          >
            {props.item?.title}
          </Text>
        </CheckRender>
        <CheckRender allowed={localToString(props.item?.content) !== ''}>
          <Separator height={METRICS.small5} />
          <Text
            style={Styles.subTitle}
          >
            {props.item?.content}
          </Text>
        </CheckRender>
      </View>
    </TouchableHighlight>
  );
}

interface propTypes {
  item?: NotificationListItem;
  index?: number;
}

RenderNotification.defaultProps = {

}

const Styles = StyleSheet.create({
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
  title: {
    fontFamily: FONTS_FAMILY.medium.body,
    color: COLORS.primary
  },
  subTitle: {
    fontFamily: FONTS_FAMILY.regular.body,
    color: COLORS.gray,
  },
  textSection: {
    flexShrink: 1,
  },
  statusSection: {
    borderRadius: moderateScale(METRICS.small5),
    paddingVertical: verticalScale(METRICS.medium10),
    width: horizontalScale(100),
  },
  statusTitle: {
    textAlign: 'center',
    fontSize: FONTS.word,
  },
  dateText: {
    color: COLORS.grayPlaceholder,
  },
})

export default RenderNotification;