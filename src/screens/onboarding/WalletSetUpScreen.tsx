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

import { CustomPlainInput } from "components/forms/CustomPlainInput";
import { QrCodeSampleIcon, DuplicateIcon } from "icons/index";
import {
  Typography,
  Colors,
  Sizing,
  Outlines,
  Buttons,
  Forms,
} from "styles/index";

export interface WalletSetUpScreenProps {}

const SCREEN_WIDTH = Dimensions.get("screen").width;

export const WalletSetUpScreen = () => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={60}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Set up your wallet</Text>
          <Text style={styles.subHeaderText}>
            Deposit /withdrawl ADA into your wallet to make payments, and
            receive payments.
          </Text>
        </View>
        <View style={styles.main}>
          <View style={styles.qrCodeContainer}>
            <QrCodeSampleIcon style={styles.qrIcon} />
          </View>
        </View>
        <View style={styles.formContainer}>
          <CustomPlainInput
            label="Address"
            placeholder="addr9czf30t9dzbdsxe79a2vtf8io"
            icon={DuplicateIcon}
            styles={styles}
            onPressHandler={() => {}}
          />
          <CustomPlainInput
            label="Amount"
            placeholder="$2.00"
            styles={styles}
            keyboardType="numeric"
            onPressHandler={() => {}}
          />
        </View>
        <Pressable
          onPress={() => {}}
          accessibilityLabel="Next"
          style={Buttons.applyOpacity(styles.submitButton)}>
          <Text style={styles.submitButtonText}>Deposit</Text>
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
    flex: 1,
    width: "100%",
    marginVertical: Sizing.x10,
  },
  scrollView: {
    width: "100%",
    height: "100%",
  },
  headerText: {
    ...Typography.header.x70,
    color: Colors.primary.neutral,
    marginBottom: Sizing.x5,
  },
  main: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  qrCodeContainer: {
    flex: 1,
    width: SCREEN_WIDTH * 0.65,
    height: SCREEN_WIDTH * 0.65,
    padding: Sizing.x15,
    marginVertical: Sizing.x10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary.neutral,
    borderRadius: Outlines.borderRadius.base,
  },
  qrIcon: {},
  subHeaderText: {
    ...Typography.subHeader.x40,
    fontFamily: "Roboto-Regular",
    color: Colors.primary.neutral,
  },
  formContainer: {
    flex: 1,
    marginVertical: Sizing.x10,
    justifyContent: "flex-start",
  },
  submitButton: {
    ...Buttons.bar.transparent,
  },
  submitButtonText: {
    ...Buttons.barText.transparent,
  },
  /**
   * styles passed as prop to CustomPlainInput
   */
  inputContainer: {
    width: "100%",
    marginBottom: Sizing.x10,
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
});
