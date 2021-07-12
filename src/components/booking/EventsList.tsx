import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface EventsListProps {}

export const EventsList = ({}: EventsListProps) => {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
