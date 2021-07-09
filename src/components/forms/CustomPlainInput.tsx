import * as React from "react";
import { View, Text, Pressable, TextInput } from "react-native";

import { Colors } from "styles/index";

export interface CustomPlainInputProps {
  label: string;
  placeholder: string;
  styles: any;
  onPressHandler?: () => void;
  icon?: any;
  customChild?: React.ReactNode;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: string;
  onChangeCallback?: (e: any) => void;
}

export const CustomPlainInput = (props: CustomPlainInputProps) => {
  const {
    icon,
    placeholder,
    label,
    customChild,
    onPressHandler,
    styles,
    multiline,
    numberOfLines,
    keyboardType,
    onChangeCallback,
  }: CustomPlainInputProps = props;

  const Icon = icon;
  const additionalProps = {
    keyboardType: `${keyboardType != null ? keyboardType : "default"}`,
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.textInputWrapper}>
        {/*@ts-ignore*/}
        <TextInput
          style={[styles.input, multiline != null ? { height: 80 } : {}]}
          multiline={multiline != null ? multiline : false}
          numberOfLines={numberOfLines != null ? numberOfLines : 1}
          placeholder={placeholder}
          onChangeText={onChangeCallback}
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
