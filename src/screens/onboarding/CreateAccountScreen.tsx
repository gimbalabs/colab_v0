import * as React from "react";
import { SafeAreaView, View, Text, StyleSheet, Pressable } from "react-native";

export interface CreateAccountScreenProps {}

export const CreateAccountScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome from create account screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
