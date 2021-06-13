/**
 * @description this file provides fonts references. RN-typography provides
 *              cross platform set of fonts weights.
 */

import { TextStyle, Platform } from "react-native";
import { systemWeights } from "react-native-typography";

import * as Colors from "./colors";

type FontSize =
  | "x5"
  | "x10"
  | "x20"
  | "x30"
  | "x35"
  | "x40"
  | "x50"
  | "x60"
  | "x70";
export const fontSize: Record<FontSize, TextStyle> = {
  x5: {
    fontSize: 10,
  },
  x10: {
    fontSize: 13,
  },
  x20: {
    fontSize: 14,
  },
  x30: {
    fontSize: 16,
  },
  x35: {
    fontSize: 18,
  },
  x40: {
    fontSize: 20,
  },
  x50: {
    fontSize: 24,
  },
  x60: {
    fontSize: 32,
  },
  x70: {
    fontSize: 38,
  },
};

type FontWeight = "thin" | "light" | "regular" | "semibold" | "bold";
export const fontWeight: Record<FontWeight, TextStyle> = {
  thin: {
    ...systemWeights.thin,
  },
  light: {
    ...systemWeights.light,
  },
  regular: {
    ...systemWeights.regular,
  },
  semibold: {
    ...systemWeights.semibold,
  },
  bold: {
    ...systemWeights.bold,
  },
};

type LetterSpacing = "x20" | "x30" | "x40";
export const letterSpacing: Record<LetterSpacing, number> = {
  x20: 1,
  x30: 2,
  x40: 3,
};

type LineHeight =
  | "x5"
  | "x10"
  | "x20"
  | "x30"
  | "x35"
  | "x40"
  | "x50"
  | "x60"
  | "x70";
export const lineHeight: Record<LineHeight, TextStyle> = {
  x5: {
    lineHeight: 10,
  },
  x10: {
    lineHeight: 20,
  },
  x20: {
    lineHeight: 22,
  },
  x30: {
    lineHeight: 24,
  },
  x35: {
    lineHeight: 24,
  },
  x40: {
    lineHeight: 26,
  },
  x50: {
    lineHeight: 32,
  },
  x60: {
    lineHeight: 38,
  },
  x70: {
    lineHeight: 44,
  },
};

type Header = "x10" | "x20" | "x30" | "x40" | "x50" | "x60" | "x70";
export const header: Record<Header, TextStyle> = {
  x10: {
    ...fontSize.x10,
    ...lineHeight.x10,
    ...fontWeight.bold,
    fontFamily: "Roboto-Medium",
  },
  x20: {
    ...fontSize.x20,
    ...lineHeight.x20,
    ...fontWeight.bold,
    fontFamily: "Roboto-Medium",
  },
  x30: {
    ...fontSize.x30,
    ...lineHeight.x30,
    ...fontWeight.bold,
    fontFamily: "Roboto-Medium",
  },
  x40: {
    ...fontSize.x40,
    ...lineHeight.x40,
    ...fontWeight.bold,
    fontFamily: "Roboto-Medium",
  },
  x50: {
    ...fontSize.x50,
    ...lineHeight.x50,
    ...fontWeight.bold,
    fontFamily: "Roboto-Medium",
  },
  x60: {
    ...fontSize.x60,
    ...lineHeight.x60,
    ...fontWeight.bold,
    fontFamily: "Roboto-Medium",
  },
  x70: {
    ...fontSize.x70,
    ...lineHeight.x70,
    ...fontWeight.bold,
    fontFamily: "Roboto-Medium",
  },
};

type SubHeader = "x5" | "x10" | "x20" | "x30" | "x35" | "x40" | "x50";
export const subHeader: Record<SubHeader, TextStyle> = {
  x5: {
    ...fontSize.x5,
    ...lineHeight.x5,
    ...fontWeight.semibold,
    fontFamily: "Roboto-Regular",
  },
  x10: {
    ...fontSize.x10,
    ...lineHeight.x10,
    ...fontWeight.semibold,
    fontFamily: "Roboto-Regular",
  },
  x20: {
    ...fontSize.x20,
    ...lineHeight.x20,
    ...fontWeight.semibold,
    fontFamily: "Roboto-Regular",
  },
  x30: {
    ...fontSize.x35,
    ...lineHeight.x30,
    ...fontWeight.semibold,
    fontFamily: "Roboto-Regular",
  },
  x35: {
    ...fontSize.x30,
    ...lineHeight.x30,
    ...fontWeight.semibold,
    fontFamily: "Roboto-Regular",
  },
  x40: {
    ...fontSize.x40,
    ...lineHeight.x40,
    ...fontWeight.semibold,
    fontFamily: "Roboto-Regular",
  },
  x50: {
    ...fontSize.x50,
    ...lineHeight.x50,
    ...fontWeight.semibold,
    fontFamily: "Roboto-Regular",
  },
};

type Body = "x5" | "x10" | "x20" | "x30" | "x40" | "x50";
export const body: Record<Body, TextStyle> = {
  x5: {
    ...fontSize.x5,
    ...lineHeight.x10,
    color: Colors.neutral.s800,
    fontFamily: "Roboto-Light",
  },
  x10: {
    ...fontSize.x10,
    ...lineHeight.x10,
    color: Colors.neutral.s800,
    fontFamily: "Roboto-Light",
  },
  x20: {
    ...fontSize.x20,
    ...lineHeight.x20,
    color: Colors.neutral.s800,
    fontFamily: "Roboto-Light",
  },
  x30: {
    ...fontSize.x30,
    ...lineHeight.x40,
    color: Colors.neutral.s800,
    fontFamily: "Roboto-Light",
  },
  x40: {
    ...fontSize.x40,
    ...lineHeight.x40,
    color: Colors.neutral.s800,
    fontFamily: "Roboto-Light",
  },
  x50: {
    ...fontSize.x50,
    ...lineHeight.x50,
    color: Colors.neutral.s800,
    fontFamily: "Roboto-Light",
  },
};

// depending on which platform user is running our app
const monospaceFontFamily = Platform.select({
  ios: "Menlo",
  android: "monospace",
});

type Monospace = "base";
export const monospace: Record<Monospace, TextStyle> = {
  base: {
    fontFamily: monospaceFontFamily,
    letterSpacing: letterSpacing.x30,
  },
};

type Roboto = "thin" | "light" | "regular" | "medium" | "bold" | "black";
export const roboto: Record<Roboto, TextStyle> = {
  thin: {
    fontFamily: "Roboto-Thin",
    letterSpacing: letterSpacing.x20,
  },
  light: {
    fontFamily: "Roboto-Light",
    letterSpacing: letterSpacing.x20,
  },
  regular: {
    fontFamily: "Roboto-Regular",
    letterSpacing: letterSpacing.x20,
  },
  medium: {
    fontFamily: "Roboto-Medium",
    letterSpacing: letterSpacing.x20,
  },
  bold: {
    fontFamily: "Roboto-Bold",
    letterSpacing: letterSpacing.x20,
  },
  black: {
    fontFamily: "Roboto-Black",
    letterSpacing: letterSpacing.x20,
  },
};
