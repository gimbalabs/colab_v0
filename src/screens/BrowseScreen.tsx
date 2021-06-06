import * as React from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Colors, Buttons, Typography, Sizing, Outlines } from "styles/index";
import { OrganizerTabParamList } from "common/types/navigationTypes";
import { appContext } from "contexts/contextApi";

export interface BrowseProps
  extends StackScreenProps<OrganizerTabParamList, "Browse"> {
  children: React.ReactNode;
}

export const BrowseScreen = ({ navigation }: BrowseProps) => {
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
          Browse Screen
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
