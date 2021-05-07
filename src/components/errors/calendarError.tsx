import * as React from "react";
import { FallbackProps } from "react-error-boundary";
import { SafeAreaView, Text, Pressable, View, StyleSheet } from "react-native";

export const CalendarError = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text>Something went wrong:</Text>
        <Text>{error.toString()}</Text>
        <Pressable onPress={resetErrorBoundary}>
          <Text>Try again</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
