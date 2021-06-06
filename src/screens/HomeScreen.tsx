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
import { Colors, Buttons, Typography, Sizing, Outlines } from "styles/index";
import { appContext } from "contexts/contextApi";

export interface HomeProps
  extends StackScreenProps<AppStackParamList, "Home"> {}

export const HomeScreen = ({ navigation }: HomeProps) => {
  const { toggleAuth, auth, setColorScheme, colorScheme } = appContext();
  const [lightModeToggled, setLightModeToggled] = React.useState<boolean>(
    colorScheme === "light" ? true : false
  );

  const setTheme = () => {
    if (colorScheme === "dark") {
      setColorScheme("light");
      setLightModeToggled((prev) => !prev);
      return;
    } else if (colorScheme === "light") {
      setColorScheme("dark");
      setLightModeToggled((prev) => !prev);
      return;
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        colorScheme == "light" ? styles.safeAreaLight : styles.safeAreaDark,
      ]}>
      <View style={styles.top}>
        <View style={styles.switch}>
          <Switch
            trackColor={{ false: "#3e3e3e", true: "#37a524" }}
            thumbColor="#f4f3f4"
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setTheme()}
            value={lightModeToggled}
          />
          <Text
            style={[
              colorScheme == "light"
                ? styles.switchTextLight
                : styles.switchTextDark,
            ]}>
            {colorScheme}
          </Text>
        </View>
        <View style={styles.switch}>
          <Switch
            trackColor={{ false: "#3e3e3e", true: "#37a524" }}
            thumbColor="#f4f3f4"
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleAuth()}
            value={auth}
          />
          <Text
            style={[
              colorScheme == "light"
                ? styles.switchTextLight
                : styles.switchTextDark,
            ]}>
            {auth ? "AUTH" : "NO-AUTH"}
          </Text>
        </View>
      </View>
      <View style={styles.header}>
        <Text
          style={[
            styles.headerText,
            colorScheme == "light"
              ? styles.headerTextLight
              : styles.headerTextDark,
          ]}>
          1 on 1 scheduling Dapp
        </Text>
      </View>
      <View style={styles.body}>
        <Pressable
          style={Buttons.applyOpacity(
            colorScheme == "light" ? styles.buttonLight : styles.buttonDark
          )}
          onPress={() => navigation.navigate("Onboarding Screens")}>
          <Text
            style={[
              colorScheme == "light"
                ? styles.buttonTextLight
                : styles.buttonTextDark,
            ]}>
            Onboarding Screens
          </Text>
        </Pressable>
        <Pressable
          style={Buttons.applyOpacity(
            colorScheme == "light" ? styles.buttonLight : styles.buttonDark
          )}
          onPress={() => navigation.navigate("Navigation Screens")}>
          <Text
            style={[
              colorScheme == "light"
                ? styles.buttonTextLight
                : styles.buttonTextDark,
            ]}>
            Dapp navigation layout
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  safeAreaLight: {
    backgroundColor: Colors.primary.neutral,
  },
  safeAreaDark: {
    backgroundColor: Colors.primary.s600,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: Sizing.x10,
  },
  switch: {
    alignItems: "center",
    flexDirection: "row-reverse",
    alignContent: "center",
  },
  switchTextLight: {
    ...Typography.monospace.base,
    color: Colors.primary.s600,
    marginRight: Sizing.x1,
  },
  switchTextDark: {
    ...Typography.monospace.base,
    color: Colors.primary.neutral,
    marginRight: Sizing.x1,
  },
  header: {
    marginTop: Sizing.x20,
    marginBottom: Sizing.x60,
    padding: Sizing.x20,
  },
  headerText: {
    letterSpacing: Typography.letterSpacing.x20,
    marginHorizontal: Sizing.x5,
    marginTop: Sizing.x40,
    alignSelf: "center",
    ...Typography.header.x50,
  },
  headerTextLight: {
    color: Colors.primary.s600,
  },
  headerTextDark: {
    color: Colors.primary.neutral,
  },
  body: {
    alignItems: "center",
  },
  buttonLight: {
    backgroundColor: Colors.primary.s600,
    ...Buttons.bar.primary,
    ...Outlines.shadow.base,
    width: Sizing.x130,
    margin: Sizing.x10,
  },
  buttonDark: {
    backgroundColor: Colors.primary.neutral,
    ...Buttons.bar.primary,
    ...Outlines.shadow.base,
    width: Sizing.x130,
    margin: Sizing.x10,
  },
  buttonTextLight: {
    ...Buttons.barText.primary,
    textAlign: "center",
    color: Colors.primary.neutral,
  },
  buttonTextDark: {
    ...Buttons.barText.primary,
    textAlign: "center",
    color: Colors.primary.s600,
  },
});
