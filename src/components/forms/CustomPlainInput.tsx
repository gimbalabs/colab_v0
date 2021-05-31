import * as React from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ViewStyle,
  TextStyle,
  ImageStyle,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Colors } from "styles/index";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export interface CustomPlainInputProps {
  label: string;
  placeholder: string;
  styles: NamedStyles<any>;
  onPressHandler?: () => void;
  icon?: any;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: string;
}

export const CustomPlainInput = (props: CustomPlainInputProps) => {
  const {
    icon,
    placeholder,
    label,
    onPressHandler,
    styles,
    multiline,
    numberOfLines,
    keyboardType,
  }: CustomPlainInputProps = props;

  const Icon = icon;

  return (
    <View style={styles.inputContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
          //@ts-ignore
          keyboardType={keyboardType != null ? keyboardType : "default"}
          style={[styles.input, multiline != null ? { height: 80 } : {}]}
          multiline={multiline != null ? multiline : false}
          numberOfLines={numberOfLines != null ? numberOfLines : 1}
          placeholder={placeholder}
          //@ts-ignore
          placeholderTextColor={styles.placeholderText.color}
        />
        <Pressable onPress={onPressHandler} style={styles.iconWrapper}>
          {Icon != null && (
            <Icon style={styles.icon} stroke={Colors.primary.s350} />
          )}
        </Pressable>
      </View>
    </View>
  );
};
