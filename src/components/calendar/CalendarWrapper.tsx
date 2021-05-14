import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { MyCalendarProvider } from "contexts/myCalendarContext";

export interface CalendarWrapperProps {
  children: React.ReactNode;
}

export const CalendarWrapper = ({ children }: CalendarWrapperProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <MyCalendarProvider>{children}</MyCalendarProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
});
