import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";

import { appContext } from "contexts/contextApi";
import { LeftArrowIcon } from "assets/icons";
import { Colors, Sizing, Typography } from "styles/index";
import { FullWidthButton } from "components/buttons/fullWidthButton";
import { EventConfirmationDetails } from "components/booking";

function wait(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

export const BookingConfirmation = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { colorScheme } = appContext();

  const isLightMode = colorScheme === "light";

  const onBackNavigationPress = () => navigation.goBack();

  const onButtonPress = async () => {
    setIsLoading(true);
    await wait(1500);
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
      <ScrollView
        style={{ flex: 1, width: "90%" }}
        contentContainerStyle={{ alignItems: "center" }}>
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
        <View style={styles.detailsWrapper}>
          <EventConfirmationDetails />
        </View>
        <View style={styles.buttonContainer}>
          <FullWidthButton
            onPressCallback={onButtonPress}
            text={"Confirm"}
            colorScheme={colorScheme}
            loadingIndicator={isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
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
  detailsWrapper: {},
  buttonContainer: {
    width: "100%",
    marginTop: "auto",
  },
});
