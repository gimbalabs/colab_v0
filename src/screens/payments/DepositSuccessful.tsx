import * as React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";

import { Colors, Sizing, Typography } from "styles/index";
import { appContext } from "contexts/contextApi";

import { FullWidthButton } from "components/buttons/fullWidthButton";
import { BodyText } from "components/rnWrappers/bodyText";
import { DepositSuccessfulIcon } from "assets/icons";

export interface DepositSuccessfulProps {}

export const DepositSuccessful = ({ navigation, route }) => {
  const { colorScheme } = appContext();

  const isLightMode = colorScheme === "light";

  const onButtonPress = () => navigation.navigate("Duration Choice");

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: isLightMode
            ? Colors.primary.neutral
            : Colors.primary.s600,
        },
      ]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <DepositSuccessfulIcon
            width={225}
            height={225}
            style={{ marginVertical: Sizing.x15, alignSelf: "center" }}
          />
          <Text
            style={
              isLightMode ? styles.headerText_light : styles.headerText_dark
            }>
            Deposit successful!
          </Text>
          <BodyText colors={[Colors.primary.s600, Colors.primary.neutral]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            venenatis quam sem, eget bibendum lorem convallis et. Donec velit
            ante.
          </BodyText>
          <View style={styles.buttonContainer}>
            <FullWidthButton
              onPressCallback={onButtonPress}
              text={"Proceed to booking"}
              colorScheme={colorScheme}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    alignItems: "center",
    height: "100%",
  },
  container: {
    width: "90%",
    height: "100%",
    marginTop: Sizing.x50,
  },
  headerText_light: {
    ...Typography.header.x60,
    color: Colors.primary.s800,
    marginVertical: Sizing.x20,
  },
  headerText_dark: {
    ...Typography.header.x60,
    color: Colors.primary.neutral,
    marginVertical: Sizing.x20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Sizing.x80,
    marginTop: "auto",
  },
});
