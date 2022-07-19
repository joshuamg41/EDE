import React, { useState } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { COLORS, FONTS, METRICS } from '../../../themes';
import { horizontalScale, moderateScale, viewportWidth } from '../../../utils/StyleHelpers';
import CheckRender from '../../security/CheckRender';
import Separator from '../../separator/Separator';
import Text from '../../text/Text';
import { RenderColumnSize } from './RenderColumnConstants';

const RenderColumn = (props: propTypes) => {
  const [signatureSize, setSignatureSize] = useState<{ width: number, height: number }>({
    width: viewportWidth - (horizontalScale(METRICS.large15) * 2),
    height: moderateScale(45)
  })

  const viewLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setSignatureSize({ width, height })
  }

  return (
    <>
      <View style={Styles.columnContainer}>
        <CheckRender allowed={props.isLoading}>
          <ContentLoader
            speed={2}
            width={signatureSize.width}
            height={signatureSize.height}
            backgroundColor={COLORS.lightGray}
            foregroundColor={COLORS.gray}
          >
            <Rect x="0" y="0" rx="3" ry="3" width={(signatureSize.width / 3)} height={moderateScale(12)} />
            <Rect x="0" y={moderateScale(25)} rx="3" ry="3" width={signatureSize.width} height={moderateScale(15)} />
          </ContentLoader>
        </CheckRender>
        <CheckRender allowed={!props.isLoading}>
          <View onLayout={viewLayout} >
            <Text style={[Styles.columnTitle, RenderColumnSize[props.size || 'small'].title]}>{props.title}</Text>
            <Text style={[Styles.columnBody, RenderColumnSize[props.size || 'small'].body]}>{props.body} {props.extraBody}</Text>
          </View>
        </CheckRender>
      </View>
      <CheckRender allowed={props.bottomSeparate}>
        <Separator height={RenderColumnSize[props.size || 'small'].separator} />
      </CheckRender>
    </>
  )
}

interface propTypes {
  title?: string;
  body?: string;
  bottomSeparate?: boolean;
  isLoading?: boolean;
  size?: 'small' | 'regular' | 'large';
  extraBody?: any;
}

RenderColumn.defaultProps = {
  bottomSeparate: true,
  size: 'small',
  isLoading: false,
}

const Styles = StyleSheet.create({
  columnContainer: {
    flexDirection: 'column',
  },
  columnTitle: {
    fontSize: FONTS.medium,
  },
  columnBody: {
    fontSize: FONTS.regular,
    color: COLORS.primary,
  },
})

export default RenderColumn