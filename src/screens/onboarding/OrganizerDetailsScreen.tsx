import * as React from "react";
import { SafeAreaView, View, Text, StyleSheet, Pressable } from "react-native";

export interface OrganizerDetailsScreenProps {}

export const OrganizerDetailsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome from organizer details screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
