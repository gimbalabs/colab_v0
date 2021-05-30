import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import PagerView from "react-native-pager-view";
import { CreateAccountForm } from "components/forms/createAccountForm";
import { Colors, Sizing, Typography } from "styles/index";
import { ModernProfessionalIcon } from "icons/index";

export interface CreateAccountScreenProps {
  pagerRef: React.RefObject<PagerView>;
}

export const CreateAccountScreen = ({ pagerRef }: CreateAccountScreenProps) => {
  const onCreateAccount = () => {
    pagerRef.current?.setPage(3);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <View style={styles.imageContainer}>
        <ModernProfessionalIcon width="80%" height="80%" />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create attendee account</Text>
      </View>
      <CreateAccountForm />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "100%",
  },
  imageContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginBottom: Sizing.x15,
  },
  headerText: {
    width: "100%",
    ...Typography.header.x70,
    color: Colors.primary.neutral,
  },
});
