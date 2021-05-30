/**
 *  @description This is a custom form input which can be customized
 *               by passing props (label, styles, name, etc.)
 *
 *               This file doesn't hold any styles declared, as to
 *               provide flexibility on passing custom styles.
 */

import * as React from "react";
import {
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";

export interface CustomInputProps {}

export const CustomInput = (props: any) => {
  const {
    field: { onChange, name, onBlur, value },
    form: { errors, touched, setFieldTouched },
    styles,
    iconState,
    customHandler,
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.inputContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
          name={props.name}
          style={[styles.input, hasError && styles.errorInput]}
          value={value}
          placeholderTextColor={styles.placeholderText.color}
          onChangeText={(text) => onChange(name)(text)}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          {...inputProps}
        />
      </View>
      <View style={styles.errorWrapper}>
        {hasError && <Text style={styles.error}>{errors[name]}</Text>}
      </View>
    </KeyboardAvoidingView>
  );
};
