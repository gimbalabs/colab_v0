import * as React from "react";
import { View, StyleSheet, Text } from "react-native";

import { Typography, Colors } from "styles/index";

export const FavoritesScreen = ({}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text
        style={
          colorScheme === "light"
            ? styles.headerText_light
            : styles.headerText_dark
        }>
        Welcome from Favorites Screen
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerText_light: {
    ...Typography.header.x40,
    color: Colors.primary.s600,
  },
  headerText_dark: {
    ...Typography.header.x40,
    color: Colors.primary.neutral,
  },
});
