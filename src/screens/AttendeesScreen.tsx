import * as React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "common/types/navigationTypes";

export interface AttendeesProps
  extends StackScreenProps<AppStackParamList, "Attendees"> {}

export const AttendeesScreen = ({ navigation }: AttendeesProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Attendees</Text>
      <View style={{ marginVertical: 10, width: "50%" }}>
        <Button title="How it Works" onPress={() => {}} />
      </View>
      <View style={{ marginVertical: 10, width: "50%" }}>
        <Button title="Create Account" onPress={() => {}} />
      </View>
      <View style={{ marginVertical: 10, width: "50%" }}>
        <Button title="Browse" onPress={() => navigation.navigate("Browse")} />
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
  header: {
    marginBottom: 50,
    fontSize: 28,
    textAlign: "center",
  },
});
