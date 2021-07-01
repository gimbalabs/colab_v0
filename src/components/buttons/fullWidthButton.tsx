import * as React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

import { Buttons } from "styles/index";

export interface FullWidthButton {
  colorScheme: "light" | "dark";
  onPressCallback: () => any;
  text: string;
}

export const FullWidthButton = ({
  colorScheme,
  onPressCallback,
  text,
}: FullWidthButton) => {
  const isLightMode = colorScheme === "light";
  return (
    <Pressable
      onPress={onPressCallback}
      style={Buttons.applyOpacity(
        isLightMode ? styles.button_light : styles.button_dark
      )}>
      <Text style={isLightMode ? styles.text_light : styles.text_dark}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button_light: {
    ...Buttons.bar.primary,
  },
  button_dark: {
    ...Buttons.bar.transparent,
  },
  text_light: {
    ...Buttons.barText.primary,
  },
  text_dark: {
    ...Buttons.barText.transparent,
  },
});
