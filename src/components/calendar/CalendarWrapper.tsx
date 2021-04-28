import * as React from "react";
import { SafeAreaView } from "react-native";

export interface CalendarWrapper {
  children?: React.ReactNode;
}

export const CalendarWrapper = ({ children }: CalendarWrapper) => {
  return <SafeAreaView>{children}</SafeAreaView>;
};
