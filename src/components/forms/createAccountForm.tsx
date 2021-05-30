import * as React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { Formik, Field } from "formik";
import { Buttons, Typography, Colors, Sizing, Forms } from "styles";
import { formValidationSchema } from "../../lib/utils";
import { CustomInput } from "../forms/CustomInput";
import { EyeIcon } from "icons/index";

export interface CreateAccountFormProps {}

export const CreateAccountForm = () => {
  return (
    <Formik
      validationSchema={formValidationSchema()}
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      onSubmit={(values) => console.log(values)}>
      {({ handleSubmit, isValid }) => (
        <>
          <Field
            name="name"
            label="Name"
            component={CustomInput}
            placeholder="John Doe"
            keyboardType="default"
            autoCompleteType="name"
            styles={styles}
          />
          <Field
            name="email"
            label="Email"
            placeholder="User@example.com"
            component={CustomInput}
            keyboardType="email-address"
            autoCompleteType="email"
            styles={styles}
          />
          <Field
            name="password"
            label="Password"
            placeholder="password"
            component={CustomInput}
            autoCompleteType="password"
            keyboardType="default"
            styles={styles}
          />
          <Pressable
            onPress={handleSubmit}
            accessibilityLabel="Create new account."
            disabled={!isValid}
            style={Buttons.applyOpacity(styles.submitButton)}>
            <Text style={styles.submitButtonText}>Create account</Text>
          </Pressable>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formInput: {
    ...Forms.input.primary,
  },
  formLabel: {
    ...Forms.inputLabel.primary,
  },
  submitButton: {
    ...Buttons.bar.small,
    marginTop: Sizing.x10,
  },
  submitButtonText: {
    ...Buttons.barText.small,
  },
  /**
   * Styles passed as props to CustomInput
   */
  inputWrapper: {},
  inputLabel: {
    ...Forms.inputLabel.primary,
  },
  input: {
    ...Forms.input.primary,
  },
  inputError: {
    ...Forms.inputLabel.error,
    color: Colors.danger.s400,
  },
  inputErrorWrapper: {
    height: 21, // inspect element in expo to see how much pixels it needs
    alignItems: "flex-end",
  },
});
