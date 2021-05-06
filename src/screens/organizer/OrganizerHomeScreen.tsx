import * as React from "react";
import { View, Text, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { OrganizerTabParamList } from "common/types/navigationTypes";
import { AppContext } from "contexts/appContext";
import { Buttons, Outlines, Typography, Sizing, Colors } from "styles";

export interface OrganizerHomeProps
  extends StackScreenProps<OrganizerTabParamList, "Organizer"> {}

export const OrganizerHomeScreen = ({ navigation }: OrganizerHomeProps) => {
  const { state } = React.useContext(AppContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Organizer</Text>
        <Text style={styles.headerText}>Cºl⍺b</Text>

        {state.authentication ? (
          <>
            <View style={styles.body}>
              <Pressable
                style={Buttons.applyOpacity(styles.button)}
                onPress={() => navigation.navigate("Add Bio")}>
                <Text style={styles.buttonText}>Add Bio</Text>
              </Pressable>

              <Pressable
                style={Buttons.applyOpacity(styles.button)}
                onPress={() => navigation.navigate("Add Ideas")}>
                <Text style={styles.buttonText}>Add Ideas</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <View style={styles.body}>
            <Pressable
              style={Buttons.applyOpacity(styles.button)}
              onPress={() => navigation.push("Register Id")}>
              <Text style={styles.buttonText}>Register as Organizer</Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    alignItems: "center",
    marginVertical: Sizing.x100,
  },
  headerText: {
    ...Typography.header.x50,
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
