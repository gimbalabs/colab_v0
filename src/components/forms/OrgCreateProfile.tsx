import * as React from "react";
import { formValidationSchema } from "../../lib/utils";
import { Pressable, StyleSheet, Text } from "react-native";
import { CustomInput } from "../forms/CustomInput";
import { Formik, Field } from "formik";
import { ProfileContext } from "contexts/profileContext";
import { OrganizerForm } from "common/interfaces/organizerFormInterface";
import { Buttons, Typography, Colors, Sizing, Forms } from "styles";

export interface OrgCreateProfileProps {}

export const OrgCreateProfile = () => {
  const {
    setAlias,
    setAboutURL,
    setImageURL,
    setTimeBlockCostADA,
    setTimeBlockLengthMin,
  } = React.useContext(ProfileContext);

  const updateBioContext = ({
    alias,
    aboutURL,
    imageURL,
    timeBlockCostADA,
    timeBlockLengthMin,
  }: OrganizerForm): void => {
    alias && setAlias(alias);
    aboutURL && setAboutURL(aboutURL);
    imageURL && setImageURL(imageURL);
    timeBlockCostADA && setTimeBlockCostADA(timeBlockCostADA);
    timeBlockLengthMin && setTimeBlockLengthMin(timeBlockLengthMin);
  };

  return (
    <Formik
      validationSchema={formValidationSchema()}
      initialValues={{
        alias: "",
        aboutURL: "",
        imageURL: "",
        timeBlockCostADA: "",
        timeBlockLengthMin: "",
      }}
      onSubmit={(values: OrganizerForm) => updateBioContext(values)}>
      {({ handleSubmit, isValid }) => (
        <>
          <Field
            name="alias"
            label="Alias"
            component={CustomInput}
            placeholder="How should we call you..."
            styles={styles}
          />
          <Field
            name="timeBlockLengthMin"
            label="Time block length"
            placeholder="30"
            component={CustomInput}
            keyboardType="numeric"
            styles={styles}
          />
          <Field
            name="timeBlockCostADA"
            label="Time block cost"
            placeholder="1000"
            component={CustomInput}
            keyboardType="numeric"
            styles={styles}
          />
          <Field
            name="aboutURL"
            label="Personal URL"
            component={CustomInput}
            keyboardType="url"
            placeholder="Share a personal URL here"
            styles={styles}
          />
          <Field
            name="imageURL"
            label="Personal Image"
            component={CustomInput}
            keyboardType="url"
            placeholder="Share an image here"
            styles={styles}
          />
          <Pressable
            onPress={handleSubmit}
            accessibilityLabel="Set up your profile as organizer"
            disabled={!isValid}
            style={Buttons.applyOpacity(styles.submitButton)}>
            <Text style={styles.submitButtonText}>Submit your Bio</Text>
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
