import * as React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Buttons, Typography } from "styles";

export interface ErrorHandlerProps {
  children: React.ReactNode;
}

export const myErrorHandler = (error: Error) => {
  //@TODO: do something with the error
};

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <View style={styles.container}>
      <Text style={Typography.header.x40}>Something went wrong...</Text>
      <Text style={Typography.body.x20}>{error.message}</Text>
      <Pressable onPress={() => resetErrorBoundary()} style={styles.button}>
        <Text style={Buttons.barText.transparent}>Try again</Text>
      </Pressable>
    </View>
  );
};

export const ErrorHandler = ({ children }: ErrorHandlerProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      {children}
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  button: {
    ...Buttons.bar.transparent,
  },
});
