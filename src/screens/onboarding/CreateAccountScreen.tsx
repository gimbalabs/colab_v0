import * as React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";

import PagerView from "react-native-pager-view";
import { CreateAccountForm } from "components/forms/createAccountForm";
import { Colors, Buttons, Outlines, Sizing, Typography } from "styles/index";

export interface CreateAccountScreenProps {
  pagerRef: React.RefObject<PagerView>;
}

export const CreateAccountScreen = ({ pagerRef }: CreateAccountScreenProps) => {
  const onCreateAccount = () => {
    pagerRef.current?.setPage(3);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("assets/images/create_account.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Account</Text>
      </View>
      <View style={styles.createAccountForm}></View>
      <View style={styles.checkbox}>
        <CreateAccountForm />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 200,
    width: 200,
  },
  headerText: {
    ...Typography.header.x40,
    color: Colors.primary.neutral,
  },
});
