/**
 *  @description This is a custom form input which can be customized
 *               by passing props (label, styles, name, etc.)
 *
 *               This file doesn't hold any styles declared, as to
 *               provide flexibility on passing custom styles.
 */

import * as React from "react";
import { TextInput, Text, View } from "react-native";

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
        {hasError && <Text style={styles.inputError}>{errors[name]}</Text>}
      </View>
    </View>
  );
};
