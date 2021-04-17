import * as React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export const AddIdeaScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.primary}>IDEAS</Text>
      <Text style={styles.detail}>
        "Ideas" are how Organizers share their current interests with the
        community
      </Text>
      <Button onPress={() => {}} title="Add idea" color="#9F2605" />
      <Text style={styles.detail}>
        if add an idea, show field for next idea, and so on
      </Text>
      <Text style={styles.detail}>populates an array of ideas for users</Text>
      <Button
        title="Go back to home"
        onPress={() => navigation.popToTop()}
        color="#05269f"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  primary: {
    fontSize: 30,
    margin: 20,
  },
  detail: {
    fontSize: 15,
    margin: 25,
  },
});
