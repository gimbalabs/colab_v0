import * as React from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";

import { appContext, bookingContext } from "contexts/contextApi";
import { LeftArrowIcon } from "assets/icons";
import { Colors, Sizing, Typography } from "styles/index";
import { FullWidthButton } from "components/buttons/fullWidthButton";
import { EventConfirmationDetails } from "components/booking";
import { ProfileContext } from "contexts/profileContext";

function wait(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

export const BookingConfirmation = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { setWalletBalance, walletBalance } = React.useContext(ProfileContext);
  const { colorScheme } = appContext();
  const { durationCost } = bookingContext();

  const isLightMode = colorScheme === "light";

  const onBackNavigationPress = () => navigation.goBack();

  const onButtonPress = async () => {
    setIsLoading(true);
    await wait(1500);
    //@TODO submit transaction to blockchain
    setWalletBalance(walletBalance - durationCost);
    navigation.navigate("Confirmation", { isBookingConfirmation: true });
  };

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
      <View style={styles.container}>
        <View style={styles.navigation}>
          <Pressable onPress={onBackNavigationPress} hitSlop={10}>
            <LeftArrowIcon
              width={24}
              height={24}
              color={isLightMode ? Colors.primary.s600 : Colors.primary.neutral}
            />
          </Pressable>
        </View>
        <View style={styles.header}>
          <Text
            style={
              isLightMode ? styles.headerText_light : styles.headerText_dark
            }>
            Confirmation
          </Text>
        </View>
        <EventConfirmationDetails />
        <View style={styles.buttonContainer}>
          <FullWidthButton
            onPressCallback={onButtonPress}
            text={"Confirm"}
            colorScheme={colorScheme}
            loadingIndicator={isLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "90%",
    flex: 1,
  },
  navigation: {
    flexDirection: "row",
    marginVertical: Sizing.x15,
    alignSelf: "flex-start",
  },
  header: {
    alignSelf: "flex-start",
  },
  headerText_light: {
    ...Typography.header.x50,
    color: Colors.primary.s800,
  },
  headerText_dark: {
    ...Typography.header.x50,
    color: Colors.primary.s600,
  },
  detailsWrapper: {
    flex: 1,
    height: "100%",
  },
  buttonContainer: {
    width: "100%",
    marginTop: "auto",
    marginBottom: Sizing.x15,
  },
});
