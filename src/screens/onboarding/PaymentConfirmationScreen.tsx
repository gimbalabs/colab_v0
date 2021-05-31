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
import { Typography, Colors, Sizing, Outlines, Buttons } from "styles/index";

export interface PaymentConfirmationScreenProps {}

const SCREEN_WIDTH = Dimensions.get("screen").width;

export const PaymentConfirmationScreen = () => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={40}
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
          <PencilAltIcon style={styles.userDetailsIcon} />
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
    marginVertical: Sizing.x10,
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
    marginVertical: -Sizing.x10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {},
  subHeaderText: {
    ...Typography.subHeader.x40,
    fontFamily: "Roboto-Regular",
    color: Colors.primary.neutral,
  },
  formContainer: {
    marginVertical: Sizing.x10,
  },
  submitButton: {
    ...Buttons.bar.transparent,
  },
  submitButtonText: {
    ...Buttons.barText.transparent,
  },
});
