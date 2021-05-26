import * as React from "react";
import { SafeAreaView, View, Text, StyleSheet, Pressable } from "react-native";

export interface WalletSetUpScreenProps {}

export const WalletSetUpScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome from wallet set-up screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
