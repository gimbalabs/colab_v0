import * as React from "react";
import { SafeAreaView, View, Text, StyleSheet, Pressable } from "react-native";

export interface PricingScreenProps {}

export const PricingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome from pricing screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
