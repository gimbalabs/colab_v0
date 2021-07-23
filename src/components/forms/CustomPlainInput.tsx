import * as React from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  TextInputProps,
  KeyboardType,
} from "react-native";

import { Colors, Forms, Outlines, Sizing } from "styles/index";

export interface CustomPlainInputProps {
  label: string;
  placeholder: string;
  styles?: any;
  isLightMode?: boolean;
  onPressHandler?: () => void;
  icon?: any;
  customChild?: React.ReactNode;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: KeyboardType;
  onChangeCallback?: (e: any) => void;
  onPressInCallback?: (e: any) => void;
  onBlurCallback?: (e: any) => void;
}

export const CustomPlainInput = (props: CustomPlainInputProps) => {
  var {
    icon,
    placeholder,
    label,
    customChild,
    onPressHandler,
    styles = defaultStyles,
    isLightMode = true,
    multiline,
    numberOfLines,
    keyboardType,
    onBlurCallback,
    onChangeCallback,
  }: CustomPlainInputProps = props;
  const Icon = icon;

  const additionalProps: TextInputProps = {
    keyboardType: keyboardType ?? "default",
  };

  if (multiline && numberOfLines) {
    additionalProps.multiline = true;
    additionalProps.numberOfLines = numberOfLines;
  }

  if (isLightMode) {
    styles = Object.assign({}, styles, formStyleLight);
  } else {
    styles = Object.assign({}, styles, formStyleDark);
  }

  return (
    <View style={styles.inputContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.textInputWrapper}>
        {/*@ts-ignore*/}
        <TextInput
          style={[styles.input, multiline != null ? { height: 80 } : {}]}
          numberOfLines={numberOfLines != null ? numberOfLines : 1}
          placeholder={placeholder}
          onChangeText={onChangeCallback}
          onBlur={onBlurCallback}
          placeholderTextColor={styles.placeholderText.color}
          {...additionalProps}
        />
        {customChild && customChild}
        <Pressable onPress={onPressHandler} style={styles.iconWrapper}>
          {Icon != null && (
            <Icon style={styles.icon} stroke={Colors.primary.s350} />
          )}
        </Pressable>
      </View>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginBottom: Sizing.x10,
  },
  labelContainer: {
    width: "100%",
  },
  textInputWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    left: -40,
    width: Sizing.x35,
    height: Sizing.x35,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: Sizing.x30,
    height: Sizing.x30,
  },
});

const formStyleLight = StyleSheet.create({
  label: {
    ...Forms.inputLabel.primary_light,
  },
  input: {
    width: "100%",
    ...Forms.input.primary_light,
    ...Outlines.shadow.lifted,
  },
  placeholderText: {
    color: Colors.primary.s300,
  },
});

const formStyleDark = StyleSheet.create({
  label: {
    ...Forms.inputLabel.primary_dark,
  },
  input: {
    width: "100%",
    ...Forms.input.primary_dark,
    ...Outlines.shadow.lifted,
  },
  placeholderText: {
    color: Colors.primary.s300,
  },
});
