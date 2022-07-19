import { FONTS, METRICS } from "../../../themes";

interface RenderColumnSizeProp {
  [key: string]: {
    [key: string]: any;
  }
}

export const RenderColumnSize: RenderColumnSizeProp = {
  small: {
    title: {
      fontSize: FONTS.medium,
    },
    body: {
      fontSize: FONTS.regular,
    },
    separator: METRICS.small5,
  },
  regular: {
    title: {
      fontSize: FONTS.regular,
    },
    body: {
      fontSize: FONTS.title,
    },
    separator: METRICS.large15,
  },
  large: {
    title: {
      fontSize: FONTS.title,
    },
    body: {
      fontSize: FONTS.large,
    },
    separator: METRICS.large15,
  },
}