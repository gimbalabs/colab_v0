import * as React from "react";
import { View, StyleSheet, Text, Pressable, TextInput } from "react-native";

import { Colors, Outlines, Typography, Forms } from "styles/index";

export interface CustomPlainInputProps {
  label: string;
  placeholder: string;
  onPressHandler?: () => void;
  icon?: any;
}

export const CustomPlainInput = (props: CustomPlainInputProps) => {
  const {
    icon,
    placeholder,
    label,
    onPressHandler,
  }: CustomPlainInputProps = props;

  const Icon = icon;

  return (
    <View style={styles.inputContainer}>
      <View style={styles.label}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput placeholder={placeholder} />
        <Pressable onPress={onPressHandler} style={styles.iconButton}>
          {Icon != null && (
            <Icon
              width="15"
              height="15"
              strokeWidth="3.5"
              stroke={Colors.primary.s600}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
