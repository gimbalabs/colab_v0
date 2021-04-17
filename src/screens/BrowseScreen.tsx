import * as React from "react";
import { View, Button, Text, StyleSheet } from "react-native";

export const BrowseScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Browse</Text>
      <View style={{ marginVertical: 10, width: "50%" }}>
        <Button title="By Time" onPress={() => {}} />
      </View>
      <View style={{ marginVertical: 10, width: "50%" }}>
        <Button title="By Organizer" onPress={() => {}} />
      </View>
      <View style={{ marginVertical: 10, width: "50%" }}>
        <Button title="By Idea" onPress={() => {}} />
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
