import * as React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import { Colors, Typography } from "styles/index";
import { StackScreenProps } from "@react-navigation/stack";
import { OrganizerTabParamList } from "common/types/navigationTypes";

export interface OrganizerProfileScreenProps
  extends StackScreenProps<OrganizerTabParamList, "Browse"> {}

export const OrganizerProfileScreen = ({
  navigation,
}: OrganizerProfileScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}> Welcome from Organizer Profile Screen </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary.s600,
  },
  text: {
    color: Colors.primary.neutral,
    ...Typography.header.x40,
  },
});
