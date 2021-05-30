import * as React from "react";
import { View, StyleSheet, Text, Pressable, TextInput } from "react-native";

import { CustomPlainInput } from "components/forms/CustomPlainInput";
import { CalendarIcon, CheckIcon, PencilAltIcon } from "icons/index";

export interface UserDetailScreenProps {}

export const UserDetailsScreen = ({}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tell us a little bit about you</Text>
      </View>
      <View style={styles.formContainer}>
        <CustomPlainInput
          label="Profession"
          placeholder="Doctor, therapist, developer, etc..."
          icon={CheckIcon}
          textContentType="jobTitle"
          onPressHandler={() => {}}
        />
      </View>
      <View style={styles.formContainer}>
        <CustomPlainInput
          label="Job Title"
          placeholder="Full Stack Engineer, Sr Business..."
          icon={CheckIcon}
          onPressHandler={() => {}}
        />
      </View>
      <View style={styles.formContainer}>
        <CustomPlainInput
          label="About yourself"
          multiline={true}
          placeholder="Passionate in helping others draw business goals and needs..."
          icon={PencilAltIcon}
          onPressHandler={() => {}}
        />
      </View>
      <View style={styles.formContainer}>
        <CustomPlainInput
          label="Availability"
          placeholder="weekly, weekends, mornings, e..."
          icon={CalendarIcon}
          onPressHandler={() => {}}
        />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.label}>
          <Text style={styles.labelText}>Hourly rate</Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput placeholder="$35 an hour" />
          <Pressable onPress={() => {}} style={styles.iconButton}></Pressable>
        </View>
      </View>
      <View style={styles.formContainer}>
        <CustomPlainInput
          label="Skills"
          placeholder="Organized, Motivated, Critical Th..."
          icon={CheckIcon}
          onPressHandler={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
