import * as React from "react";
import { TextInput, Text, StyleSheet } from "react-native";

export interface ICustomInput {
  field: {};
  form: {};
  name: string;
  value: string;
}

export const CustomInput = (props: any) => {
  const {
    field: { onChange, name, onBlur, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
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
      {hasError && <Text style={styles.errorInput}>{errors[name]}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
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
