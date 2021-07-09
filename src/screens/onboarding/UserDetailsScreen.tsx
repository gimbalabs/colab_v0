import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { CustomPlainInput } from "components/forms/CustomPlainInput";
import { CalendarIcon, DownIcon, PencilAltIcon } from "icons/index";
import {
  Typography,
  Colors,
  Sizing,
  Outlines,
  Buttons,
  Forms,
} from "styles/index";
import { FullWidthButton } from "components/buttons/fullWidthButton";

export interface UserDetailScreenProps {}

export const UserDetailsScreen = ({}) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={40}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
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
            onPressHandler={() => {}}
          />
          <CustomPlainInput
            label="Job Title"
            placeholder="Full Stack Engineer, Sr Business..."
            icon={DownIcon}
            styles={styles}
            onPressHandler={() => {}}
          />
          {/* when handling events with multiline, use ref._lastNativeText */}
          <CustomPlainInput
            label="About yourself"
            multiline={true}
            numberOfLines={2}
            placeholder="Passionate in helping others draw business goals and needs..."
            icon={PencilAltIcon}
            styles={styles}
            onPressHandler={() => {}}
          />
          <CustomPlainInput
            label="Availability"
            placeholder="weekly, weekends, mornings, e..."
            icon={CalendarIcon}
            styles={styles}
            onPressHandler={() => {}}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.inputContainer}>
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
              />
            </View>
          </KeyboardAvoidingView>
          <CustomPlainInput
            label="Skills"
            placeholder="Organized, Motivated, Critical Th..."
            icon={DownIcon}
            styles={styles}
            onPressHandler={() => {}}
          />
        </View>
        <FullWidthButton
          onPressCallback={() => {}}
          text="Next"
          buttonType="transparent"
          colorScheme="dark"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
  },
  scrollView: {
    width: "100%",
    height: "100%",
    marginTop: Sizing.x20,
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
