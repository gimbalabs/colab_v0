import * as React from "react";
import { Text, View, Button } from "react-native";

export const MyCalendarScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 32, textAlign: "center" }}>
        Welcome, to My Calendar
      </Text>
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};
