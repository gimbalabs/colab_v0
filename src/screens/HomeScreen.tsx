import * as React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Switch,
} from "react-native";
import { AppStackParamList } from "common/types/navigationTypes";
import { StackScreenProps } from "@react-navigation/stack";
import { Colors, Buttons, Typography, Sizing, Outlines } from "styles";
import { appContext } from "contexts/contextApi";

export interface HomeProps
  extends StackScreenProps<AppStackParamList, "Home"> {}

export const HomeScreen = ({ navigation }: HomeProps) => {
  const { toggleAuth, auth } = appContext();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.top}>
        <View style={styles.switch}>
          <Switch
            trackColor={{ false: "#3e3e3e", true: "#37a524" }}
            thumbColor="#f4f3f4"
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleAuth()}
            value={auth}
          />
          <Text style={styles.switchText}>{auth ? "AUTH" : "NO-AUTH"}</Text>
        </View>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Colab Home Screen</Text>
      </View>
      <View style={styles.body}>
        <Pressable
          style={Buttons.applyOpacity(styles.button)}
          onPress={() => navigation.navigate("Organizer")}>
          <Text style={styles.buttonText}>Organizer</Text>
        </Pressable>
        <Pressable
          style={Buttons.applyOpacity(styles.button)}
          onPress={() => navigation.navigate("Attendees")}>
          <Text style={styles.buttonText}>Attendees</Text>
        </Pressable>
        <Pressable
          style={Buttons.applyOpacity(styles.button)}
          onPress={() => navigation.navigate("Browse")}>
          <Text style={styles.buttonText}>Browse</Text>
        </Pressable>
        <Pressable
          style={Buttons.applyOpacity(styles.button)}
          onPress={() => navigation.navigate("My Calendar")}>
          <Text style={styles.buttonText}>My Calendar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  top: {
    margin: Sizing.x10,
  },
  switch: {
    alignItems: "center",
    flexDirection: "row-reverse",
    alignContent: "center",
  },
  switchText: {
    ...Typography.monospace.base,
    marginRight: Sizing.x1,
  },
  header: {
    marginTop: Sizing.x20,
    marginBottom: Sizing.x60,
    padding: Sizing.x20,
  },
  headerText: {
    ...Typography.header.x60,
    letterSpacing: Typography.letterSpacing.x20,
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
  },
});
