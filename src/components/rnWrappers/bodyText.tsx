/**
 * @description A wrapper around react native Text component
 * @param children - text node
 * @param colors - an array of two colors for light/dark mode
 */

import * as React from "react";
import { View, Text, StyleSheet, ColorSchemeName } from "react-native";

import { appContext } from "contexts/contextApi";
import { Typography } from "styles/index";

export interface BodyTextProps {
  children?: any;
  colors: string[];
}

export const BodyText = ({ children, colors }: BodyTextProps) => {
  const { colorScheme } = appContext();

  const textColor =
    colorScheme != null && colorScheme === "light"
      ? { color: colors[0] }
      : { color: colors[1] };

  return <Text style={[styles.text, textColor]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    ...Typography.body.x30,
  },
});
