import * as React from "react";
import { View, Text, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { OrganizerTabParamList } from "common/types/navigationTypes";
import { appContext } from "contexts/contextApi";
import { Buttons, Outlines, Typography, Sizing, Colors } from "styles/index";

export interface OrganizerHomeProps
  extends StackScreenProps<OrganizerTabParamList, "Home"> {}

export const OrganizerHomeScreen = ({ navigation }: OrganizerHomeProps) => {
  const { colorScheme } = appContext();

  return (
    <SafeAreaView
      style={[
        colorScheme == "light" ? styles.safeArea_light : styles.safeaArea_dark,
      ]}>
      <View style={styles.header}>
        <Text
          style={[
            colorScheme == "light"
              ? styles.headerText_ligth
              : styles.headerText_dark,
          ]}>
          Organizer Home Screen
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea_light: {
    flex: 1,
    backgroundColor: Colors.primary.neutral,
  },
  safeaArea_dark: {
    flex: 1,
    backgroundColor: Colors.primary.s600,
  },
  header: {
    alignItems: "center",
    marginVertical: Sizing.x100,
  },
  headerText_ligth: {
    ...Typography.header.x40,
    color: Colors.primary.s600,
  },
  headerText_dark: {
    ...Typography.header.x40,
    color: Colors.primary.neutral,
  },
  body: {
    marginTop: Sizing.x40,
    alignItems: "center",
    justifyContent: "center",
  },
  button_light: {
    ...Buttons.bar.secondary,
    width: Sizing.x120,
    marginVertical: Sizing.x15,
    backgroundColor: Colors.primary.s600,
  },
  button_dark: {
    ...Buttons.bar.secondary,
    width: Sizing.x120,
    marginVertical: Sizing.x15,
    backgroundColor: Colors.primary.neutral,
  },
  buttonText_light: {
    ...Buttons.barText.primary,
    textAlign: "center",
    color: Colors.primary.neutral,
  },
  buttonText_dark: {
    ...Buttons.barText.primary,
    textAlign: "center",
    color: Colors.primary.s600,
  },
});
