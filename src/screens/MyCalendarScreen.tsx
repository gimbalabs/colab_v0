import * as React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "common/types/navigationTypes";
import { MyCalendar } from "containers/MyCalendar";
import { ErrorHandler } from "components/errors/errorHandler";

export interface MyCalendarProps
  extends StackScreenProps<AppStackParamList, "My Calendar"> {}

export const MyCalendarScreen = ({ navigation }: MyCalendarProps) => {
  return (
    <ErrorHandler>
      <MyCalendar></MyCalendar>
    </ErrorHandler>
  );
};
