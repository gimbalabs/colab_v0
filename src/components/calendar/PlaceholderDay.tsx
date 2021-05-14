import * as React from "react";
import { StyleSheet, View } from "react-native";

export const PlaceholderDay = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    width: `${100 / 7}%`,
    height: `${100 / 6}%`,
    justifyContent: "center",
  },
});
