import * as React from "react";
import { SafeAreaView, View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "styles/index";

export interface InitialScreenProps {}

export const InitialScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome from intitial screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary.s600 },
});
