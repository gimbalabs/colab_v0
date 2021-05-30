import * as React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {} from "formik";
import { EyeIcon, EyeOffIcon } from "icons/index";
import { Sizing, Forms, Colors } from "styles/index";

export const renderPasswordInput = (props: any) => {
  const [isVisiblePassword, setIsVisiblePassword] = React.useState<boolean>(
    true
  );

  const {
    field: { onChange, name, onBlur, value },
    form: { errors, touched, setFieldTouched },
    iconState,
    customHandler,
    ...inputProps
  } = props;

  const onEyeIconPress = () => {
    setIsVisiblePassword((prev) => !prev);
  };
  const PasswordEyeIcon = isVisiblePassword ? EyeIcon : EyeOffIcon;

  const hasError = errors[name] && touched[name];

  //@TODO: Fix form validation

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.inputContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Password</Text>
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
          name={name}
          style={[styles.input, hasError && styles.errorInput]}
          value={value}
          label="Password"
          placeholder="Enter your password"
          placeholderTextColor={styles.placeholderText.color}
          onChangeText={(text) => onChange(name)(text)}
          secureTextEntry={isVisiblePassword}
          textContentType="newPassword"
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          {...inputProps}
        />
        <Pressable onPress={onEyeIconPress} style={styles.iconWrapper}>
          <PasswordEyeIcon stroke={Colors.primary.s350} style={styles.icon} />
        </Pressable>
      </View>
      <View style={styles.errorWrapper}>
        {hasError && <Text style={styles.error}>{errors[name]}</Text>}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  labelContainer: {
    width: "100%",
    paddingHorizontal: Sizing.x12,
  },
  label: {
    ...Forms.inputLabel.primary,
  },
  textInputWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "100%",
    ...Forms.input.primary,
  },
  placeholderText: {
    color: Colors.primary.s300,
  },
  iconWrapper: {
    left: -45,
    width: Sizing.x40,
    height: Sizing.x40,
  },
  icon: {
    width: Sizing.x35,
    height: Sizing.x35,
  },
  errorInput: {},
  errorWrapper: {
    height: 21, // inspect element in expo to see how much pixels it needs
    alignItems: "flex-end",
  },
  error: {
    ...Forms.inputLabel.error,
    color: Colors.danger.s400,
  },
});
