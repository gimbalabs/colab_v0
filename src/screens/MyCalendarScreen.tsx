import * as React from "react";
import { Text, View, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "common/types";

type MyCalendarScreenProp = StackNavigationProp<
  AppStackParamList,
  "My Calendar"
>;

type Props = {
  navigation: MyCalendarScreenProp;
};

export const MyCalendarScreen: React.FunctionComponent<Props> = ({
  navigation,
}) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 32, textAlign: "center" }}>
        Welcome, to My Calendar
      </Text>
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};
