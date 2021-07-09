import * as React from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

import { Formik, Field } from "formik";
import {
  Buttons,
  Typography,
  Colors,
  Sizing,
  Forms,
  Outlines,
} from "styles/index";
import { createAccountValidationScheme } from "lib/utils";
import { CustomInput } from "../forms/CustomInput";
import { CheckIcon } from "icons/index";
import { CustomPasswordInput } from "./CustomPasswordInput";

export interface CreateAccountFormProps {}

const AnimatedCheckIcon = Animated.createAnimatedComponent(CheckIcon);

export const CreateAccountForm = ({}: CreateAccountFormProps) => {
  const [acceptedCheckbox, setAcceptedChecbox] = React.useState<boolean>(false);
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const animatedOpacity = React.useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animatedOpacity, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  const onCheckBoxPress = () => {
    setAcceptedChecbox((prev) => !prev);
    acceptedCheckbox ? fadeIn() : fadeOut();
  };

  const onSubmit = (values: { name: string; password: string }) => {
    setSubmitted(true);
  };

  return (
    <Formik
      validationSchema={createAccountValidationScheme()}
      validateOnChange={submitted}
      validateOnBlur={submitted}
      initialValues={{
        name: "",
        password: "",
      }}
      onSubmit={onSubmit}>
      {({ handleSubmit, isValid, validateForm }) => (
        <>
          <Field
            key="name"
            name="name"
            label="Name"
            component={CustomInput}
            placeholder="John Doe"
            keyboardType="default"
            textContentType="name"
            autoCompleteType="name"
            validateForm={validateForm}
            submitted={submitted}
            styles={styles}
          />
          {/*<Field
            key="email"
            name="email"
            label="Email"
            placeholder="User@example.com"
            component={CustomInput}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCompleteType="email"
            styles={styles}
          />*/}
          <Field key="password" name="password" styles={styles}>
            {(props: any) => (
              <CustomPasswordInput validateForm={validateForm} {...props} />
            )}
          </Field>
          <View style={styles.checkboxWrapper}>
            <Pressable
              onPress={onCheckBoxPress}
              style={styles.pressableCheckbox}
              hitSlop={2}>
              <View style={styles.checkbox}>
                <AnimatedCheckIcon
                  opacity={animatedOpacity}
                  width="15"
                  height="15"
                  strokeWidth="3.5"
                  stroke={Colors.primary.s600}
                />
              </View>
            </Pressable>
            <Text style={styles.checkboxText}>I accept</Text>
            <Text style={styles.checkboxTextLink}>
              Privacy Policy + Terms of Use
            </Text>
          </View>
          <View style={styles.appendix}>
            <Text style={styles.appendixText}>Already have an account?</Text>
            <Text style={styles.appendixTextLink}>Sign in</Text>
          </View>
          <Pressable
            disabled={!isValid}
            onPress={handleSubmit}
            accessibilityLabel="Create new account."
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
    ...Buttons.bar.transparent_dark,
  },
  submitButtonText: {
    ...Buttons.barText.transparent_dark,
  },
  checkboxWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  pressableCheckbox: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    alignItems: "center",
    justifyContent: "center",
    width: 17,
    height: 17,
    padding: Sizing.x1,
    borderRadius: Sizing.x3,
    backgroundColor: Colors.primary.neutral,
  },
  checkboxText: {
    marginLeft: Sizing.x2,
    marginRight: Sizing.x5,
    ...Typography.body.x30,
    fontFamily: "Roboto-Regular",
    color: Colors.primary.neutral,
  },
  checkboxTextLink: {
    ...Typography.body.x30,
    fontFamily: "Roboto-Regular",
    color: Colors.primary.s300,
  },
  appendix: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: Sizing.x10,
    paddingBottom: Sizing.x5,
  },
  appendixText: {
    marginLeft: Sizing.x10,
    marginRight: Sizing.x5,
    ...Typography.body.x30,
    fontFamily: "Roboto-Regular",
    color: Colors.primary.neutral,
  },
  appendixTextLink: {
    ...Typography.body.x30,
    fontFamily: "Roboto-Regular",
    color: Colors.primary.s300,
  },
  /**
   * Styles passed as props to CustomInput
   */
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  labelContainer: {
    width: "100%",
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
  errorInput: {
    borderColor: Colors.danger.s400,
  },
  errorWrapper: {
    alignSelf: "center",
    height: 22, // inspect element in expo to see how much pixels it needs
    paddingHorizontal: Sizing.x8,
    marginTop: Sizing.x5,
    justifyContent: "center",
    backgroundColor: Colors.primary.neutral,
    borderRadius: Outlines.borderRadius.base,
  },
  error: {
    ...Forms.inputLabel.error,
    color: Colors.danger.s400,
  },
});
