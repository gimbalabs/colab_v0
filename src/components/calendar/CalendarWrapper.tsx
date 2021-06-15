import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Colors } from "styles/index";
import { MyCalendarProvider } from "contexts/myCalendarContext";
import { appContext } from "contexts/contextApi";

export interface CalendarWrapperProps {
  children: React.ReactNode;
}

export const CalendarWrapper = ({ children }: CalendarWrapperProps) => {
  const { colorScheme } = appContext();
  return (
    <SafeAreaView
      style={
        colorScheme == "light" ? styles.safeArea_light : styles.safeArea_dark
      }>
      <MyCalendarProvider>{children}</MyCalendarProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea_light: {
    flex: 1,
    backgroundColor: Colors.primary.neutral,
    alignItems: "center",
  },
  safeArea_dark: {
    flex: 1,
    backgroundColor: Colors.primary.s600,
    alignItems: "center",
  },
});
