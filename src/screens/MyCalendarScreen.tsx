import * as React from "react";
import { Text, View, Button } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "common/types";

export interface IMyCalendarScreen
  extends StackScreenProps<AppStackParamList, "My Calendar"> {}

export const MyCalendarScreen = ({ navigation }: IMyCalendarScreen) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 32, textAlign: "center" }}>
        Welcome, to My Calendar
      </Text>
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};
