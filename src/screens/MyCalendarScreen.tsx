import * as React from "react";
import { Text, View, Button, SafeAreaView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "common/types/navigationTypes";
import { MyCalendar } from "containers/MyCalendar";
import { MainCalendar } from "components/calendar";

export interface MyCalendarProps
  extends StackScreenProps<AppStackParamList, "My Calendar"> {}

export const MyCalendarScreen = ({ navigation }: MyCalendarProps) => {
  // return (
  //   <SafeAreaView
  //     style={{ 1, alignItems: "center", justifyContent: "center" }}>
  //     <Text style={{ fontSize: 32, textAlign: "center" }}>
  //       Welcome, to My Calendar
  //     </Text>
  //     <Button title="Back to Home" onPress={() => navigation.goBack()} />
  //     <MyCalendar></MyCalendar>
  //   </SafeAreaView>
  // );
  return <MainCalendar></MainCalendar>;
};
