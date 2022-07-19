import React, { FunctionComponent } from 'react';
import { StyleProp, StyleSheet, Text as RnText, TextProps, TextStyle } from 'react-native';
import { COLORS, FONTS, FONTS_FAMILY } from '../../themes';

const Text: FunctionComponent<TextPropTypes> = props => {
  interface themeProps {
    [key: string]: any
  }

  const theme: themeProps = StyleSheet.create({
    bodyRegular: {
      fontFamily: FONTS_FAMILY.regular.body,
    },
    bodyMedium: {
      fontFamily: FONTS_FAMILY.medium.body,
    },
    bodyBold: {
      fontFamily: FONTS_FAMILY.bold.body,
    },
    titleRegular: {
      fontFamily: FONTS_FAMILY.regular.title,
    },
    titleMedium: {
      fontFamily: FONTS_FAMILY.medium.title,
    },
    titleBold: {
      fontFamily: FONTS_FAMILY.bold.title,
    },
  })

  return (
    <RnText
      {...props}
      style={[
        Styles.text,
        theme[props.theme ?? 'bodyRegular'],
        props.style
      ]}>
      {props.children}
    </RnText>
  )
};

export interface TextPropTypes extends TextProps {
  children?: string | string[] | Element | null;
  theme?: 'bodyRegular' | 'bodyMedium' | 'bodyBold' | 'titleRegular' | 'titleMedium' | 'titleBold';
}

Text.defaultProps = {

}

const Styles = StyleSheet.create({
  text: {
    color: COLORS.black,
    fontSize: FONTS.regular,
  },
})


export default React.memo(Text);