import { TextStyle, ViewStyle, PressableStateCallbackType } from "react-native";

import * as Colors from "./colors";
import * as Outlines from "./outlines";
import * as Sizing from "./sizing";
import * as Typography from "./typography";

type Bar = "primary" | "secondary" | "transparent" | "small";
export const bar: Record<Bar, ViewStyle> = {
  primary: {
    alignItems: "center",
    justifyContent: "center",
    padding: Sizing.x15,
    borderRadius: Outlines.borderRadius.base,
    backgroundColor: Colors.primary.neutral,
  },
  secondary: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: Sizing.x10,
    borderRadius: Outlines.borderRadius.base,
    backgroundColor: Colors.secondary.brand,
  },
  transparent: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: Sizing.x10,
    borderRadius: Outlines.borderRadius.base,
  },
  small: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: Sizing.x10,
    borderRadius: Outlines.borderRadius.base,
    backgroundColor: Colors.primary.s200,
  },
};

// text style for each bar (button) type above
type BarText = "primary" | "secondary" | "transparent" | "small";
export const barText: Record<BarText, TextStyle> = {
  primary: {
    ...Typography.fontSize.x30,
    ...Typography.fontWeight.semibold,
    color: Colors.primary.s600,
  },
  transparent: {
    ...Typography.fontSize.x30,
    ...Typography.fontWeight.semibold,
    color: Colors.neutral.s800,
  },
  small: {
    ...Typography.fontSize.x20,
    ...Typography.fontWeight.semibold,
    color: Colors.neutral.white,
  },
  secondary: {
    ...Typography.fontSize.x10,
    ...Typography.fontWeight.regular,
    color: Colors.neutral.s500,
  },
};

type Circular = "primary";
export const circular: Record<Circular, ViewStyle> = {
  primary: {
    height: Sizing.x30,
    width: Sizing.x30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary.brand,
    borderRadius: Outlines.borderRadius.max,
  },
};

const opacity = (state: PressableStateCallbackType): ViewStyle => {
  var opacity = state.pressed ? 0.65 : 1;
  return { opacity };
};

export const applyOpacity = (style: ViewStyle) => {
  return (state: PressableStateCallbackType): ViewStyle => {
    return {
      ...style,
      ...opacity(state),
    };
  };
};
