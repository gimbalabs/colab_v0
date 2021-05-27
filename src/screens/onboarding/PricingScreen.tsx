import * as React from "react";
import { SafeAreaView, View, Text, StyleSheet, Pressable } from "react-native";

import { Colors, Sizing, Typography } from "styles/index";

export interface PricingScreenProps {}

export const PricingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome from pricing screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    ...Typography.header.x40,
    color: Colors.primary.neutral,
  },
});
