import * as React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import { Colors, Typography } from "styles/index";
import { StackScreenProps } from "@react-navigation/stack";
import { OrganizerTabParamList } from "common/types/navigationTypes";

// @TODO: Implement navigationTypes type
export interface WalletScreenProps
  extends StackScreenProps<OrganizerTabParamList, "Wallet"> {}

export const WalletScreen = ({}: WalletScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome from Wallet Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary.s600,
  },
  text: {
    color: Colors.primary.neutral,
    ...Typography.header.x40,
  },
});
