import * as React from "react";
import { View, Button, Text, StyleSheet } from "react-native";

export const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Colab Home Screen</Text>
      <View style={styles.main}>
        <Button
          title="Organizers"
          onPress={() => navigation.navigate("Organizer")}
        />
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
    margin: 10,
    fontSize: 26,
    textAlign: "center",
  },
  main: {},
  button: {
    padding: "12 20",
  },
});
