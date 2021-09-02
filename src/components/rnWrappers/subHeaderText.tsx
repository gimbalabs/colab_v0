/**
 * @description A wrapper around react native Text component
 * @param children - text node
 * @param colors - an array of two colors for light/dark mode
 * @param customStyle - custom styles for Text component
 * @param callbackFn - callback function which will be called on onPress
 */

import * as React from "react";
import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";

import { appContext } from "contexts/contextApi";
import { Typography } from "styles/index";

export interface SubHeaderTextProps {
  children?: any;
  colors: string[];
  customStyle?: StyleProp<TextStyle>;
  callbackFn?: () => any;
}

export const SubHeaderText = ({
  children,
  colors,
  customStyle,
  callbackFn,
}: SubHeaderTextProps) => {
  const { colorScheme } = appContext();

  const textColor =
    colors.length > 1
      ? colorScheme != null && colorScheme === "light"
        ? { color: colors[0] }
        : { color: colors[1] }
      : { color: colors[0] };

  const onPress = () => callbackFn && callbackFn();

  return (
    <Text onPress={onPress} style={[styles.text, textColor, customStyle]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    ...Typography.subHeader.x30,
  },
});
