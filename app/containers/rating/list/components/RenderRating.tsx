import moment from 'moment';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import Star from 'react-native-ratings/src/images/star.png';
import ButtonText from '../../../../components/button-text/ButtonText';
import CheckRender from '../../../../components/security/CheckRender';
import Separator from '../../../../components/separator/Separator';
import Text from '../../../../components/text/Text';
import { COLORS, FONTS, METRICS } from '../../../../themes';
import { cleanNumberWithDecimal } from '../../../../utils/StringUtil';

const RenderRating: FunctionComponent<propTypes> = props => {
  const [readMore, setReadMore] = useState(false)
  const [showMoreButton, setShowMoreButton] = useState(false)
  const MAX_LINES = 3
  const { item } = props

  const onTextLayout = useCallback(
    (e) => {
      if (e?.nativeEvent?.lines?.length > MAX_LINES && !readMore) {
        setShowMoreButton(true);
      }
    }, [readMore]
  );

  //Rendering
  return (
    <View style={Styles.container}>
      <View style={Styles.row}>
        <Text>{item?.citizen?.name}</Text>
        <Rating
          type='custom'
          ratingImage={Star}
          ratingBackgroundColor={COLORS.lightGray}
          imageSize={FONTS.regular}
          ratingCount={5}
          startingValue={Number(cleanNumberWithDecimal(item?.rating))}
          fractions={1}
          readonly
          style={Styles.rating}
        />
      </View>
      <Text style={Styles.date}>{moment(item?.created_at, 'YYYY-MM-DD HH:mm:ss').format('D/MMM/YYYY')}</Text>
      <Separator height={METRICS.small5} />
      <Text
        numberOfLines={readMore ? undefined : 3}
        onTextLayout={onTextLayout}
        style={Styles.comment}
      >
        {item?.comment}
      </Text>
      <CheckRender allowed={showMoreButton}>
        <Separator height={METRICS.medium10} />
        <ButtonText
          title={readMore ? 'Ocultar' : 'Ver más'}
          theme='tertiary'
          onPress={() => setReadMore(!readMore)}
          containerStyle={Styles.readMoreContainer}
          bottomSeparate={false}
        />
      </CheckRender>
    </View>
  );
}

interface propTypes {
  item?: {
    id: number;
    request_id: number;
    citizen_id: string;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
    citizen: {
      id: string;
      onesignal: string;
      mail: string;
      name: string;
      surname: string;
      secsurname: string;
      phone: string;
      city: string;
      created_at: string;
      updated_at: string;
    }
  };
  index: number;
}

RenderRating.defaultProps = {

}

const Styles = StyleSheet.create({
  container: {
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rating: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  readMoreContainer: {
    justifyContent: 'center',
  },
  comment: {
    fontSize: FONTS.medium,
  },
  date: {
    fontSize: FONTS.medium,
    color: COLORS.grayPlaceholder,
  },
})

export default RenderRating