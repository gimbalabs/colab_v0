/**
 *  @description This is a custom form input which can be customized
 *               by passing props (label, styles, name, etc.)
 */

import * as React from "react";
import { TextInput, Text, StyleSheet, View } from "react-native";

export interface CustomInputProps {}

export const CustomInput = (props: any) => {
  const {
    field: { onChange, name, onBlur, value },
    form: { errors, touched, setFieldTouched },
    styles,
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{props.label}</Text>
      <TextInput
        name={props.name}
        style={[styles.input, hasError && styles.errorInput]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      <View style={styles.inputErrorWrapper}>
        <Text style={styles.inputError}>{errors[name]}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // pass in the styles passed from parent component
  inputWrapper: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "90%",
    marginHorizontal: "auto",
    borderWidth: 1,
    padding: 5,
  },
  errorInput: {
    fontSize: 14,
    color: "red",
  },
  inputLabel: {
    paddingVertical: 10,
  },
});
