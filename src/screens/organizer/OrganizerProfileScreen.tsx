import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";

import { Buttons, Outlines, Typography, Sizing, Colors } from "styles/index";
import { StackScreenProps } from "@react-navigation/stack";
import { OrganizerTabParamList } from "common/types/navigationTypes";
import { appContext } from "contexts/contextApi";
import { CogIcon, HearthIcon, RightArrowIcon } from "icons/index";
import ProfilePic from "assets/images/profilePic.jpg";

export interface OrganizerProfileScreenProps
  extends StackScreenProps<OrganizerTabParamList, "Browse"> {}

export const OrganizerProfileScreen = ({
  navigation,
}: OrganizerProfileScreenProps) => {
  const { colorScheme, setColorScheme } = appContext();

  return (
    <SafeAreaView
      style={[
        colorScheme == "light" ? styles.safeArea_light : styles.safeaArea_dark,
      ]}>
      <View style={styles.headerNavigation}>
        <Image source={ProfilePic} style={styles.profilePic} />
        <Text
          style={[
            colorScheme == "light"
              ? styles.headerText_ligth
              : styles.headerText_dark,
          ]}>
          DocOcatavius.md
        </Text>
        <Pressable
          style={
            colorScheme === "light" ? styles.button_light : styles.button_dark
          }
          onPress={() => {}}>
          <Text
            style={
              colorScheme === "light"
                ? styles.buttonText_light
                : styles.buttonText_dark
            }>
            Edit Profile
          </Text>
        </Pressable>
      </View>
      <View style={styles.mainNavigation}>
        <Pressable style={styles.navigationItem} onPress={() => {}}>
          <HearthIcon
            width={32}
            height={32}
            color={
              colorScheme === "light"
                ? Colors.primary.brand
                : Colors.primary.neutral
            }
          />
          <Text
            style={
              colorScheme === "light"
                ? styles.navigationItemText_light
                : styles.navigationItemText_dark
            }>
            Favorites
          </Text>
          <RightArrowIcon
            width={32}
            height={32}
            color={
              colorScheme === "light"
                ? Colors.primary.brand
                : Colors.primary.neutral
            }
          />
        </Pressable>
        <Pressable style={styles.navigationItem} onPress={() => {}}>
          <CogIcon
            width={32}
            height={32}
            color={
              colorScheme === "light"
                ? Colors.primary.brand
                : Colors.primary.neutral
            }
          />
          <Text
            style={
              colorScheme === "light"
                ? styles.navigationItemText_light
                : styles.navigationItemText_dark
            }>
            Settings
          </Text>
          <RightArrowIcon
            width={32}
            height={32}
            color={
              colorScheme === "light"
                ? Colors.primary.brand
                : Colors.primary.neutral
            }
            style={{ justifyContent: "flex-end" }}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea_light: {
    flex: 1,
    backgroundColor: Colors.primary.neutral,
    alignItems: "center",
  },
  safeaArea_dark: {
    flex: 1,
    backgroundColor: Colors.primary.s600,
    alignItems: "center",
  },
  headerNavigation: {
    alignItems: "center",
    marginVertical: Sizing.x50,
  },
  headerText_ligth: {
    ...Typography.header.x50,
    color: Colors.primary.s600,
  },
  headerText_dark: {
    ...Typography.header.x50,
    color: Colors.primary.neutral,
  },
  mainNavigation: {
    alignItems: "center",
    marginTop: Sizing.x20,
    width: "100%",
  },
  button_light: {
    ...Buttons.bar.secondary,
    padding: Sizing.x10,
    marginVertical: Sizing.x10,
    backgroundColor: Colors.primary.s800,
  },
  button_dark: {
    ...Buttons.bar.secondary,
    marginVertical: Sizing.x15,
    backgroundColor: Colors.primary.neutral,
  },
  buttonText_light: {
    ...Typography.header.x30,
    lineHeight: 0,
    paddingHorizontal: Sizing.x2,
    textAlign: "center",
    color: Colors.primary.neutral,
  },
  buttonText_dark: {
    ...Typography.header.x30,
    lineHeight: 0,
    paddingHorizontal: Sizing.x2,
    textAlign: "center",
    color: Colors.primary.s600,
  },
  profilePic: {
    borderRadius: Outlines.borderRadius.max,
  },
  navigationItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    marginBottom: Sizing.x20,
  },
  navigationItemText_light: {
    ...Typography.subHeader.x35,
    color: Colors.primary.s600,
    marginLeft: Sizing.x10,
  },
  navigationItemText_dark: {},
});
