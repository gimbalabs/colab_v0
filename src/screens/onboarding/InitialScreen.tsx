import * as React from "react";
import { SafeAreaView, View, Text, StyleSheet, Pressable } from "react-native";

import { Colors, Typography, Buttons, Outlines, Sizing } from "styles/index";

export interface InitialScreenProps {}

export const InitialScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.header}>Lorem ipsum dolor sit amet</Text>
        <Text style={styles.subHeader}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          venenatis quam sem, eget bibendum lorem convallis et. Donec velit
          ante, efficitur at ante eu, consequat hendrerit augue. Vivamus quis
          eros ex
        </Text>
      </View>
      <View style={styles.buttons}>
        <Pressable
          onPress={() => {}}
          style={Buttons.applyOpacity(styles.buttonTop)}>
          <Text style={styles.buttonTopText}>Learn more</Text>
        </Pressable>
        <Pressable
          onPress={() => {}}
          style={Buttons.applyOpacity(styles.buttonBottom)}>
          <Text style={styles.buttonBottomText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizing.x30,
  },
  main: {
    flex: 1,
    marginTop: Sizing.x20,
    marginBottom: Sizing.x40,
    justifyContent: "flex-end",
  },
  header: {
    ...Typography.header.x70,
    color: Colors.primary.neutral,
    marginBottom: Sizing.x20,
    fontWeight: "500",
  },
  subHeader: {
    ...Typography.body.x40,
    color: Colors.primary.neutral,
    fontWeight: "300",
  },
  buttons: {
    flex: 1,
    width: "100%",
    marginTop: Sizing.x40,
  },
  buttonTop: {
    backgroundColor: Colors.primary.neutral,
    padding: Sizing.x14,
    borderRadius: Sizing.x10,
    marginBottom: Sizing.x10,
  },
  buttonTopText: {
    ...Typography.body.x40,
    fontWeight: "700",
    color: Colors.primary.s600,
    alignSelf: "center",
  },
  buttonBottom: {
    backgroundColor: Colors.primary.s600,
    padding: Sizing.x10,
    borderRadius: Sizing.x10,
    borderWidth: 4,
    borderColor: Colors.primary.neutral,
    marginTop: Sizing.x15,
  },
  buttonBottomText: {
    ...Typography.body.x40,
    fontWeight: "700",
    color: Colors.primary.neutral,
    alignSelf: "center",
  },
});
