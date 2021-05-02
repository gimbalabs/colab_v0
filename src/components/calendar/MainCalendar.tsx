import * as React from "react";
import { CalendarError } from "components/errors/calendarError";
import { ErrorBoundary } from "react-error-boundary";
import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";
import { MyCalendarContext } from "contexts/myCalendarContext";

const IsError = ({ error }: { error: boolean }) => {
  if (error) {
    throw new Error("Boom");
  }
  return <Text>No error here</Text>;
};

export const MainCalendar = () => {
  const { state, dispatch } = React.useContext(MyCalendarContext);
  const [error, setError] = React.useState(false);

  return (
    <ErrorBoundary
      FallbackComponent={CalendarError}
      onReset={() => {
        setError((e) => !e);
      }}>
      <SafeAreaView style={styles.safeArea}>
        <Text>Press me</Text>
        <Pressable
          onPress={() => {
            setError((e) => !e);
          }}>
          <IsError error={error} />
        </Pressable>
      </SafeAreaView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
