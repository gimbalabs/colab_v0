import * as React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  StyleProp,
  ActivityIndicator,
  LayoutChangeEvent,
} from "react-native";

import { Buttons, Colors } from "styles/index";

export interface FullWidthButton {
  colorScheme: "light" | "dark";
  onPressCallback: () => any;
  loadingIndicator?: boolean;
  text: string;
  disabled?: boolean;
  style?: StyleProp<any>;
}

export const FullWidthButton = ({
  colorScheme,
  onPressCallback,
  loadingIndicator,
  text,
  disabled,
  style,
}: FullWidthButton) => {
  const [textWidth, setTextWidth] = React.useState<number>(0);
  const [pressableWidth, setPressableWidth] = React.useState<number>(0);
  const isLightMode = colorScheme === "light";

  const buttonStyle = [
    isLightMode ? styles.button_light : styles.button_dark,
    disabled && { backgroundColor: Colors.neutral.s400 },
  ];

  const onLayoutText = (e: LayoutChangeEvent) => {
    setTextWidth(e.nativeEvent?.layout?.width);
  };

  const onLayoutPressable = (e: LayoutChangeEvent) => {
    setPressableWidth(e.nativeEvent?.layout?.width);
  };

  return (
    <Pressable
      onPress={onPressCallback}
      onLayout={onLayoutPressable}
      disabled={disabled}
      hitSlop={5}
      style={Buttons.applyOpacity(Object.assign({}, ...buttonStyle, style))}>
      <Text
        onLayout={onLayoutText}
        style={isLightMode ? styles.text_light : styles.text_dark}>
        {text}
      </Text>
      {loadingIndicator && pressableWidth && textWidth && (
        <ActivityIndicator
          color={Colors.primary.neutral}
          size="small"
          animating={true}
          style={{
            position: "absolute",
            right: pressableWidth / 2 - textWidth / 2 - 25,
          }}
        />
      )}
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
