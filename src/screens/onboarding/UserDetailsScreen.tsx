import * as React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

import { CustomPlainInput } from "components/forms/CustomPlainInput";
import { CalendarIcon, DownIcon, PencilAltIcon } from "icons/index";
import { Typography, Colors, Sizing, Forms } from "styles/index";
import { FullWidthButton } from "components/buttons/fullWidthButton";
import { ProfileContext } from "contexts/profileContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export interface UserDetailScreenProps {}

export const UserDetailsScreen = ({ pagerRef }: any) => {
  const {
    setProfession,
    setJobTitle,
    setDescription,
    setSkills,
    setTimeBlockCostADA,
  } = React.useContext(ProfileContext);
  const [_profession, _setProfession] = React.useState<string | string[]>("");
  const [_jobTitle, _setJobTitle] = React.useState<string | string[]>("");
  const [_description, _setDescription] = React.useState<string | string[]>("");
  const [_timeBlockCostAda, _setTimeBlockCostAda] = React.useState<string>("");
  const [_skills, _setSkills] = React.useState<string | string[]>("");

  const submitBioState = () => {
    setProfession(_profession);
    setJobTitle(_jobTitle);
    setDescription(_description);
    setTimeBlockCostADA(_timeBlockCostAda);
    setSkills(_skills);
    pagerRef.current.setPage(1);
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      style={{ width: "90%", marginVertical: Sizing.x15 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Tell us a little bit{"\n"}about you
        </Text>
      </View>
      <View style={styles.formContainer}>
        <CustomPlainInput
          label="Profession"
          placeholder="Doctor, therapist, developer, etc..."
          icon={DownIcon}
          styles={styles}
          isLightMode={false}
          onChangeCallback={(val) => _setProfession(val)}
        />
        <CustomPlainInput
          label="Job Title"
          placeholder="Full Stack Engineer, Sr Business..."
          icon={DownIcon}
          styles={styles}
          isLightMode={false}
          onChangeCallback={(val) => _setJobTitle(val)}
        />
        {/* when handling events with multiline, use ref._lastNativeText */}
        <CustomPlainInput
          label="About yourself"
          multiline={true}
          numberOfLines={8}
          placeholder="Passionate in helping others draw business goals and needs..."
          icon={PencilAltIcon}
          styles={styles}
          isLightMode={false}
          onChangeCallback={(val) => _setDescription(val)}
        />
        <CustomPlainInput
          label="Availability"
          placeholder="weekly, weekends, mornings, e..."
          icon={CalendarIcon}
          styles={styles}
          isLightMode={false}
          onChangeCallback={() => {}}
        />
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Hourly rate</Text>
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              textContentType="none"
              placeholder="35 ₳ an hour"
              placeholderTextColor={styles.placeholderText.color}
              onChangeText={(val) => _setTimeBlockCostAda(val)}
            />
          </View>
        </View>
        <CustomPlainInput
          label="Skills"
          placeholder="Organized, Motivated, Critical Th..."
          icon={DownIcon}
          styles={styles}
          isLightMode={false}
          onChangeCallback={(val) => _setSkills(val)}
        />
      </View>
      <FullWidthButton
        onPressCallback={submitBioState}
        text="Next"
        buttonType="transparent"
        colorScheme="dark"
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
  },
  scrollView: {
    width: "100%",
    height: "100%",
    marginVertical: Sizing.x20,
  },
  header: {
    marginVertical: Sizing.x10,
  },
  headerText: {
    ...Typography.header.x65,
    color: Colors.primary.neutral,
  },
  formContainer: {
    flex: 1,
    marginVertical: Sizing.x10,
  },
  /**
   * styles passed as prop to CustomPlainInput
   */
  inputContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginBottom: Sizing.x10,
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
  iconWrapper: {
    left: -40,
    width: Sizing.x35,
    height: Sizing.x35,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: Sizing.x30,
    height: Sizing.x30,
  },
});
