import * as React from "react";
import { CalendarError } from "components/errors/calendarError";
import { WeekDayNames } from "./WeekDayNames";
import { ErrorBoundary } from "react-error-boundary";
import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";
import { MyCalendarContext } from "contexts/myCalendarContext";
import { Buttons, Typography, Colors, Outlines } from "styles";

const IsError = ({ error }: { error: boolean }) => {
  if (error) {
    throw new Error("Boom");
  }
  return <Text>No error here</Text>;
};

export const MainCalendar = () => {
  const { state, dispatch } = React.useContext(MyCalendarContext);
  const [error, setError] = React.useState(false);

  //@TODO: Implement react boundaries with the calendar UI
  return (
    <ErrorBoundary
      FallbackComponent={CalendarError}
      onReset={() => {
        setError((e) => !e);
      }}>
      <WeekDayNames />
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
