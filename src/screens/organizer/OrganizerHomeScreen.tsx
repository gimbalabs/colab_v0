import * as React from "react";
import { View, Text, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { OrganizerTabParamList } from "common/types/navigationTypes";
import { AppContext } from "contexts/appContext";
import { Buttons, Outlines, Typography, Sizing, Colors } from "styles/index";

export interface OrganizerHomeProps
  extends StackScreenProps<OrganizerTabParamList, "Home"> {}

export const OrganizerHomeScreen = ({ navigation }: OrganizerHomeProps) => {
  const { state } = React.useContext(AppContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Organizer Home Screen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.primary.s600 },
  header: {
    alignItems: "center",
    marginVertical: Sizing.x100,
  },
  headerText: {
    ...Typography.header.x40,
    color: Colors.primary.neutral,
  },
  body: {
    marginTop: Sizing.x40,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    ...Buttons.bar.secondary,
    width: Sizing.x120,
    marginVertical: Sizing.x15,
  },
  buttonText: {
    ...Buttons.barText.primary,
    textAlign: "center",
  },
});
