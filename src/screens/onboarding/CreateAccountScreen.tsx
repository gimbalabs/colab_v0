import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";

import PagerView from "react-native-pager-view";
import { CreateAccountForm } from "components/forms/createAccountForm";
import { Colors, Sizing, Typography } from "styles/index";
import { ModernProfessionalIcon } from "icons/index";

const SCREEN_WIDTH = Dimensions.get("screen").width;

export interface CreateAccountScreenProps {
  pagerRef: React.RefObject<PagerView>;
}

export const CreateAccountScreen = ({ pagerRef }: CreateAccountScreenProps) => {
  const onCreateAccount = () => {
    pagerRef.current?.setPage(3);
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={60}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollView}>
        <View style={styles.imageContainer}>
          <ModernProfessionalIcon
            style={styles.image}
            width="80%"
            height="80%"
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create attendee account</Text>
        </View>
        <CreateAccountForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
  },
  scrollView: {
    alignItems: "center",
  },
  imageContainer: {
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_WIDTH * 0.5,
    marginVertical: -Sizing.x10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    alignSelf: "center",
  },
  header: {
    width: "100%",
    marginBottom: Sizing.x15,
  },
  headerText: {
    width: "100%",
    ...Typography.header.x70,
    color: Colors.primary.neutral,
  },
});
