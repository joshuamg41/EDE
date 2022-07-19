import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FONTS, FONTS_FAMILY } from '../../themes';
import COLORS from "../../themes/Colors";
import METRICS from '../../themes/Metrics';
import { localToString } from '../../utils/StringUtil';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/StyleHelpers';
import TrashIcon from '../icon/TrashIcon';
import CheckRender from '../security/CheckRender';
import Separator from '../separator/Separator';

const InputSearch: FunctionComponent<propTypes> = props => {
  const [inputRef, setInputRef] = useState({ focus: () => { } });

  const leftIconPress = () => {
    inputRef?.focus()
  }

  const setRef = (ref: any) => {
    setInputRef(ref)
  }

  return (
    <>
      <View style={[
        Styles.container,
        props.containerStyle,
        { marginHorizontal: props.widthSeparator },
      ]}>
        <Ionicons
          name="search"
          size={FONTS.smallIcon}
          color={COLORS.gray}
          style={Styles.iconLeft}
          onPress={leftIconPress}
        />
        <TextInput
          ref={setRef}
          style={Styles.input}
          placeholderTextColor={COLORS.grayPlaceholder}
          placeholder={props.placeholder}
          underlineColorAndroid="transparent"
          onChangeText={props.onValueChange}
          value={props.value}
          editable={!props.disabled}
          hitSlop={{ top: 15, right: 0, bottom: 15, left: 30 }}
        />
        <Separator width={10} />
        <CheckRender allowed={localToString(props.value).length > 0}>
          <TrashIcon
            onTouchablePress={() => props.onValueChange('')}
          />
        </CheckRender>
      </View>
      <CheckRender allowed={props.bottomSeparate}>
        <Separator />
      </CheckRender>
    </>
  )
};

interface propTypes {
  bottomSeparate?: boolean;
  placeholder?: string;
  value?: any;
  onValueChange: (val?: string) => void;
  filterText?: string;
  disabled?: any;
  showFilter?: any;
  containerStyle?: object;
  widthSeparator?: number;
  children?: JSX.Element | JSX.Element[] | undefined;
}

InputSearch.defaultProps = {
  bottomSeparate: true,
  placeholder: 'Buscar',
  filterText: 'Filtro',
  value: '',
  onValueChange: (val) => console.log(val),
  disabled: false,
  showFilter: true,
  containerStyle: {},
  widthSeparator: horizontalScale(METRICS.large15),
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparent,
    paddingHorizontal: horizontalScale(METRICS.large15),
    borderRadius: moderateScale(10),
    height: verticalScale(55),
    borderColor: COLORS.lightGray,
    borderWidth: moderateScale(1),
    justifyContent: 'center',
    alignContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: FONTS.regular,
    color: COLORS.gray,
    paddingLeft: 0,
    flex: 1,
    fontFamily: FONTS_FAMILY.regular.body,
  },
  filterText: {
    textAlign: 'center',
    paddingTop: 10
  },
  iconLeft: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingRight: 10,
  },
  trashCan: {
    marginRight: METRICS.medium10,
    backgroundColor: "transparent",
  },
  iconRight: {
    backgroundColor: "transparent",
  },
});

export default InputSearch;
