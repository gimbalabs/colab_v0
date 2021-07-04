import * as React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";

import { Colors, Sizing, Typography } from "styles/index";
import { appContext } from "contexts/contextApi";

import { FullWidthButton } from "components/buttons/fullWidthButton";
import { BodyText } from "components/rnWrappers/bodyText";
import { PaymentSuccessfulIcon } from "assets/icons";

export interface PaymentConfirmationProps {}

export const PaymentConfirmation = ({ navigation, route }) => {
  const { colorScheme } = appContext();

  const isLightMode = colorScheme === "light";

  const onButtonPress = () => navigation.navigate("Home");

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
          <PaymentSuccessfulIcon
            width={250}
            height={250}
            style={{ alignSelf: "center" }}
          />
          <Text
            style={
              isLightMode ? styles.headerText_light : styles.headerText_dark
            }>
            You're all set!
          </Text>
          <BodyText colors={[Colors.primary.s600, Colors.primary.neutral]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            venenatis quam sem, eget bibendum lorem convallis et. Donec velit
            ante.
          </BodyText>
          <View style={styles.buttonContainer}>
            <FullWidthButton
              onPressCallback={onButtonPress}
              text={"Go to dashboard"}
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
