import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";

import { CreditCardIcon, PencilAltIcon } from "icons/index";
import {
  Tags,
  Typography,
  Colors,
  Sizing,
  Outlines,
  Buttons,
} from "styles/index";
import { ProfileTag } from "components/profile/profileTag";

export interface PaymentConfirmationScreenProps {}

const SCREEN_WIDTH = Dimensions.get("screen").width;

const USER_TAGS = [
  { tagName: "Teach", tagBackgroundColor: "#FEF3C7", tagTextColor: "#92400E" },
  { tagName: "Code", tagBackgroundColor: "#E0E7FF", tagTextColor: "#3730A3" },
  {
    tagName: "Innovation",
    tagBackgroundColor: "#FEE2E2",
    tagTextColor: "#92400E",
  },
];

export const PaymentConfirmationScreen = () => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={60}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollView}>
        <View style={styles.headerImage}>
          <CreditCardIcon style={styles.image} />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Confirm details and make payment
          </Text>
          <Text style={styles.subHeaderText}>
            You will be able to edit any personal information in your account
            profile if needed.
          </Text>
        </View>
        <View style={styles.userDetails}>
          <PencilAltIcon
            stroke={Colors.primary.s350}
            style={styles.userDetailsIcon}
          />
          <Text style={styles.userDetailsHeader}>Profession</Text>
          <Text style={styles.userDetailsText}>Software engineer</Text>
          <Text style={styles.userDetailsHeader}>Job title</Text>
          <Text style={styles.userDetailsText}>Fullstack engineer</Text>
          <Text style={styles.userDetailsHeader}>About yourself</Text>
          <Text style={styles.userDetailsText}>
            Fluent in Java, Javascipt, HTML5 and CSS. Experienced in mentoring
            students, developing and mastering their skills.
          </Text>
          <Text style={styles.userDetailsHeader}>Hourly rate</Text>
          <Text style={styles.userDetailsText}>50 ₳ an hour</Text>
          <Text style={styles.userDetailsHeader}>Skills</Text>
          <View style={styles.skillTags}>
            {USER_TAGS.map((tag, i) => {
              return (
                <View key={i}>
                  <ProfileTag tag={tag} key={i} />
                </View>
              );
            })}
          </View>
        </View>
        <Pressable
          onPress={() => {}}
          accessibilityLabel="Next"
          style={Buttons.applyOpacity(styles.submitButton)}>
          <Text style={styles.submitButtonText}>Confirm</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "100%",
  },
  header: {
    marginBottom: Sizing.x10,
  },
  scrollView: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    ...Typography.header.x70,
    color: Colors.primary.neutral,
    marginBottom: Sizing.x5,
  },
  headerImage: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.7,
    marginTop: -Sizing.x20,
    marginBottom: -Sizing.x30,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {},
  subHeaderText: {
    ...Typography.subHeader.x40,
    fontFamily: "Roboto-Regular",
    color: Colors.primary.neutral,
  },
  userDetails: {
    width: "100%",
    backgroundColor: Colors.primary.neutral,
    borderRadius: Outlines.borderRadius.base,
    padding: Sizing.x25,
  },
  userDetailsIcon: {
    right: Sizing.x25,
    top: Sizing.x25,
    position: "absolute",
    width: Sizing.x35,
    height: Sizing.x35,
  },
  userDetailsHeader: {
    ...Typography.header.x10,
    color: Colors.primary.s600,
    marginVertical: Sizing.x2,
  },
  userDetailsText: {
    ...Typography.body.x10,
    lineHeight: 0,
    color: Colors.primary.s600,
  },
  submitButton: {
    ...Buttons.bar.transparent,
  },
  submitButtonText: {
    ...Buttons.barText.transparent,
  },
  skillTags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
