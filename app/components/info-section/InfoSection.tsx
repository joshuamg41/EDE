import React from "react"
import { StyleSheet, View } from "react-native"
import Separator from "../separator/Separator"
import Text from "../text/Text"
import { COLORS, FONTS, METRICS } from "../../themes"
import CheckRender from "../security/CheckRender"
import { horizontalScale } from "../../utils/StyleHelpers"

const InfoSection = (props: InfoSectionProps) => {
  return (
    <CheckRender allowed={props.body && props.body !== ''}>
      <View
        style={[
          Styles.container,
          { marginHorizontal: props.widthSeparator }
        ]}
      >
        <Text style={Styles.title}>{props.title}</Text>
        <Separator height={METRICS.small5} />
        <Text style={Styles.body}>{props.body}</Text>
      </View>
      <CheckRender allowed={props.bottomSeparate}>
        <Separator />
      </CheckRender>
    </CheckRender>
  )
}

interface InfoSectionProps {
  title?: string;
  body?: string;
  bottomSeparate?: boolean;
  widthSeparator?: number;
}

InfoSection.defaultProps = {
  bottomSeparate: true,
  widthSeparator: horizontalScale(METRICS.large15),
}

const Styles = StyleSheet.create({
  container: {

  },
  title: {
    fontSize: FONTS.title,
    color: COLORS.black,
  },
  body: {
    fontSize: FONTS.title,
    color: COLORS.primary,
  },
})

export default React.memo(InfoSection);