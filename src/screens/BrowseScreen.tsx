import * as React from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Colors, Buttons, Typography, Sizing, Outlines } from "styles/index";
import { OrganizerTabParamList } from "common/types/navigationTypes";

export interface BrowseProps
  extends StackScreenProps<OrganizerTabParamList, "Browse"> {
  children: React.ReactNode;
}

export const BrowseScreen = ({ navigation }: BrowseProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Browse Screen</Text>
      </View>
      <View style={styles.body}>
        <View>
          <Pressable
            style={Buttons.applyOpacity(styles.button)}
            onPress={() => {}}>
            <Text style={styles.buttonText}>By Time</Text>
          </Pressable>
          <Pressable
            style={Buttons.applyOpacity(styles.button)}
            onPress={() => {}}>
            <Text style={styles.buttonText}>By Idea</Text>
          </Pressable>
          <Pressable
            style={Buttons.applyOpacity(styles.button)}
            onPress={() => {}}>
            <Text style={styles.buttonText}>By Organizer</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary.s600,
  },
  top: {
    margin: Sizing.x10,
  },
  header: {
    marginTop: Sizing.x20,
    marginBottom: Sizing.x60,
    padding: Sizing.x20,
  },
  headerText: {
    ...Typography.header.x40,
    color: Colors.primary.neutral,
    marginHorizontal: Sizing.x5,
    marginTop: Sizing.x40,
    alignSelf: "center",
  },
  body: {
    alignItems: "center",
  },
  button: {
    ...Buttons.bar.primary,
    ...Outlines.shadow.base,
    width: Sizing.x130,
    margin: Sizing.x10,
  },
  buttonText: {
    ...Buttons.barText.primary,
    color: Colors.primary.s600,
  },
});
