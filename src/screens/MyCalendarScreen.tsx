import * as React from "react";
import { Text, View, Button } from "react-native";

export const MyCalendarScreen = ({ navigation }) => {
  return (
    <View styles={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text styles={{ fontSize: "32px", textAlign: "center" }}>
        This section is for "My Calendar" screen.
      </Text>
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};
