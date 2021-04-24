import * as React from "react";
import { formValidationSchema } from "../../lib/utils";
import { Button, SafeAreaView, StyleSheet } from "react-native";
import { CustomInput } from "../forms/CustomInput";
import { Formik, Field } from "formik";
import { ProfileContext } from "contexts/profileContext";
import { IOrganizerForm } from "common/interfaces/organizerFormInterface";

export interface IOrgCreateProfile {}

export const OrgCreateProfile = () => {
  const { alias, setAlias } = React.useContext(ProfileContext);
  const { aboutURL, setAboutURL } = React.useContext(ProfileContext);
  const { imageURL, setImageURL } = React.useContext(ProfileContext);
  const { timeBlockCostADA, setTimeBlockCostADA } = React.useContext(
    ProfileContext
  );
  const { timeBlockLengthMin, setTimeBlockLengthMin } = React.useContext(
    ProfileContext
  );

  const updateBioContext = ({
    alias,
    aboutURL,
    imageURL,
    timeBlockCostADA,
    timeBlockLengthMin,
  }: IOrganizerForm): void => {
    alias && setAlias(alias);
    aboutURL && setAboutURL(aboutURL);
    imageURL && setImageURL(imageURL);
    timeBlockCostADA && setTimeBlockCostADA(timeBlockCostADA);
    timeBlockLengthMin && setTimeBlockLengthMin(timeBlockLengthMin);
  };

  return (
    <SafeAreaView style={styles.formBox}>
      <Formik
        validationSchema={formValidationSchema()}
        initialValues={{
          alias: "",
          aboutURL: "",
          imageURL: "",
          timeBlockCostADA: "",
          timeBlockLengthMin: "",
        }}
        onSubmit={(values: IOrganizerForm) => updateBioContext(values)}
      >
        {({ handleSubmit, isValid }) => (
          <>
            <Field
              name="alias"
              label="Alias"
              component={CustomInput}
              placeholder="How should we call you..."
            />
            <Field
              name="timeBlockLengthMin"
              label="Time block length"
              placeholder="30"
              component={CustomInput}
              keyboardType="numeric"
            />
            <Field
              name="timeBlockCostADA"
              label="Time block cost"
              placeholder="1000"
              component={CustomInput}
              keyboardType="numeric"
            />
            <Field
              name="aboutURL"
              label="Personal URL"
              component={CustomInput}
              keyboardType="url"
              placeholder="Share a personal URL here"
            />
            <Field
              name="imageURL"
              label="Personal Image"
              component={CustomInput}
              keyboardType="url"
              placeholder="Share an image here"
            />
            <Button
              title="Submit your Bio"
              onPress={handleSubmit}
              accessibilityLabel="Set up your profile as organizer"
              disabled={!isValid}
            />
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formBox: {
    borderWidth: 1,
    backgroundColor: "#fff0d2",
    marginTop: 20,
    padding: 20,
    width: "80%",
  },
});
