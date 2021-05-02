import * as React from "react";
import { SafeAreaView } from "react-native";

export interface CalendarWrapperProps {
  children?: React.ReactNode;
}

export const CalendarWrapper = ({ children }: CalendarWrapperProps) => {
  return <SafeAreaView>{children}</SafeAreaView>;
};
