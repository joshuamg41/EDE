import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import PickerSelect from '../../../../components/picker-select/PickerSelect';
import CheckRender from '../../../../components/security/CheckRender';
import Separator from '../../../../components/separator/Separator';
import Text from '../../../../components/text/Text';
import { COLORS, FONTS, FONTS_FAMILY, METRICS } from '../../../../themes';
import { localToArray } from '../../../../utils/ArrayUtil';
import { parseToMoneyWCents } from '../../../../utils/StringUtil';

const RenderPrice: FunctionComponent<propTypes> = props => {
  //misc functions
  const LocalOnValueChange = (val: any) => {
    props.onValueChange(props.item?.key, val)
  }

  const handleValidationOnBlur = () => {
    props.setFieldTouched(props.item?.key, true, true)
  }

  const getPrice = () => {
    return props.item?.variations.find(variation => props.value == variation.key)?.price
  }

  //Rendering
  return (
    <View style={Styles.container}>
      <PickerSelect
        value={props.value}
        onValueChange={LocalOnValueChange}
        data={props.item?.variations}
        showError={props.error}
        placeholder={props.item?.concept}
        widthSeparator={0}
        bottomSeparate={false}
        onPickerBlur={handleValidationOnBlur}
        disabled={localToArray(props.item?.variations).length == 1}
      />
      <Separator height={METRICS.small5} />
      <CheckRender allowed={getPrice()}>
        <Text style={Styles.priceTitle}>{props.item.concept}</Text>
        <Text style={Styles.priceBody}>
          {parseToMoneyWCents(getPrice())}
        </Text>
      </CheckRender>
      <Separator height={METRICS.medium10} />
    </View>
  );
}

interface propTypes {
  item: {
    id: number;
    key: string;
    concept: string;
    description: string;
    service_id: number;
    status: string;
    created_at: string;
    updated_at: string;
    variations: {
      key: string;
      label: string;
      value: string;
      id: number;
      concept: string;
      description: string;
      method_payment: null;
      time: number;
      price: number;
      coin: string;
      quantity: number;
      required: number;
      created_at: string;
      updated_at: string;
      pivot: {
        prices_id: number;
        price_variations_id: number
      };
      delivery_time: {
        id: number;
        months: number;
        days: number;
        hours: number;
        created_at: string;
        updated_at: string
      }
    }[];
  };
  value?: any;
  onValueChange: (field: string, val: any) => void;
  setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean | undefined) => void;
  error?: string | boolean;
  index?: number;
}

RenderPrice.defaultProps = {

}

const Styles = StyleSheet.create({
  container: {

  },
  priceTitle: {
    textAlign: 'center',
  },
  priceBody: {
    fontSize: FONTS.mediumIcon,
    color: COLORS.tertiary,
    fontFamily: FONTS_FAMILY.medium.title,
    textAlign: 'center',
  },
})

export default RenderPrice