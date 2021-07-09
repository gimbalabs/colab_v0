import * as React from "react";
import { View, Text, Pressable, StyleSheet, SafeAreaView } from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { OrganizerTabParamList } from "common/types/navigationTypes";
import { appContext } from "contexts/contextApi";
import { Buttons, Outlines, Typography, Sizing, Colors } from "styles/index";
import { CalendarEventsList } from "components/calendar";

export interface OrganizerHomeProps
  extends StackScreenProps<OrganizerTabParamList, "Home"> {}

export const OrganizerHomeScreen = ({ navigation }: OrganizerHomeProps) => {
  const { colorScheme } = appContext();

  return (
    <SafeAreaView
      style={[
        colorScheme == "light" ? styles.safeArea_light : styles.safeaArea_dark,
      ]}>
      <View style={styles.main}>
        <CalendarEventsList isHomeScreen />
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
  main: {
    alignItems: "center",
    flex: 1,
  },
});
