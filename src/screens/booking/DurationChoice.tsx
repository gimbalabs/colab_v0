import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";

import { Colors, Outlines, Sizing, Typography } from "styles/index";
import { OrganizerProfile } from "components/booking/index";
import { LeftArrowIcon } from "icons/index";
import { appContext, bookingContext } from "contexts/contextApi";
import { FullWidthButton } from "components/buttons/fullWidthButton";
import { getTimeSpanLength } from "lib/utils";
import { ProfileContext } from "contexts/profileContext";
import { useDurationSlots } from "lib/hooks/useDurationSlots";
import AnimatedNumber from "react-native-animated-number";

export interface DurationChoiceProps {}

function wait(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

export const DurationChoice = ({ navigation, route }) => {
  const { maxTimeSlotDuration } = bookingContext();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selectedDuration, setSelectedDuration] = React.useState<number>(0);
  const [cost, setCost] = React.useState<number>(0);
  const { walletBalance } = React.useContext(ProfileContext);

  const {
    previewingOrganizer,
    pickedDate,
    setDuration,
    setDurationCost,
  } = bookingContext();
  const { colorScheme, auth } = appContext();

  const isLightMode = colorScheme === "light";
  const isDisabled = selectedDuration === 0;
  const timeBlockMilSec = previewingOrganizer?.timeBlock * 60 * 1000;
  const buttonText = !auth
    ? "Sign up"
    : walletBalance != null && walletBalance < cost
    ? "Deposit"
    : "Confirm";

  const { timeSlots, setTimeSlots } = useDurationSlots(
    timeBlockMilSec,
    maxTimeSlotDuration
  );

  const onBackNavigationPress = () => navigation.goBack();

  const onNextPress = async () => {
    if (buttonText === "Sign up") return; // @TODO must navigate to sign up screen
    if (buttonText === "Deposit")
      navigation.navigate("Add Funds", { isBookingScreen: true });
    if (buttonText === "Confirm") {
      setIsLoading(true);
      setDuration(selectedDuration);
      setDurationCost(cost);
      await wait(1500);
      setIsLoading(false);
      navigation.navigate("Booking Confirmation");
    }
  };

  const onPressCallback = (time: number) => {
    if (selectedDuration === time) {
      setSelectedDuration(0);
      setCost(0);
    } else {
      setSelectedDuration(time);
      let totalCost = previewingOrganizer?.hourlyRate * (time / 60 / 60 / 1000);
      setCost(totalCost);
    }
  };

  const renderTimeSlots = React.useCallback(
    (time: number, index: number) => (
      <Pressable
        onPress={() => onPressCallback(time)}
        hitSlop={5}
        key={`${time}_${index}`}
        style={[
          styles.timeSlotButton,
          selectedDuration === time && {
            backgroundColor: Colors.primary.s800,
          },
        ]}>
        <Text
          style={[
            styles.timeSlotButtonText,
            selectedDuration === time && {
              color: Colors.available,
            },
          ]}>
          {getTimeSpanLength(time)}
        </Text>
      </Pressable>
    ),
    [selectedDuration]
  );

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
        style={{ flex: 1, width: "100%" }}
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
        <OrganizerProfile profile={previewingOrganizer} />
        <View style={styles.timesHeader}>
          <Text
            style={
              isLightMode
                ? styles.timesHeaderText_light
                : styles.timesHeaderText_dark
            }>
            Select duration and confirm
          </Text>
        </View>
        <View style={styles.estimatedCostContainer}>
          <View style={styles.estimatedCostWrapper}>
            <AnimatedNumber
              value={cost}
              style={[
                isLightMode ? styles.totalAda_light : styles.totalAda_dark,
              ]}
            />
            <Text
              style={
                isLightMode ? styles.totalAda_light : styles.totalAda_dark
              }>
              ₳
            </Text>
          </View>
          <Text
            style={
              isLightMode
                ? styles.walletBalance_light
                : styles.walletBalance_dark
            }>
            Available balance: {walletBalance} ₳
          </Text>
        </View>
        <View style={styles.timeSlotsContainer}>
          {timeSlots && timeSlots.map(renderTimeSlots)}
        </View>
        <View style={styles.buttonContainer}>
          <FullWidthButton
            onPressCallback={onNextPress}
            text={buttonText}
            colorScheme={colorScheme}
            disabled={isDisabled}
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
    width: "90%",
    marginVertical: Sizing.x15,
  },
  timesHeader: {
    marginVertical: Sizing.x5,
    marginRight: "auto",
    marginLeft: Sizing.x25,
  },
  timesHeaderText_light: {
    ...Typography.header.x50,
    color: Colors.primary.s800,
  },
  timesHeaderText_dark: {
    ...Typography.header.x50,
    color: Colors.primary.neutral,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginVertical: Sizing.x10,
  },
  timeSlotsContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  timeSlotButton: {
    width: "30%",
    alignItems: "center",
    backgroundColor: Colors.available,
    paddingVertical: Sizing.x5,
    paddingHorizontal: Sizing.x5,
    marginVertical: Sizing.x10,
    borderRadius: Outlines.borderRadius.large,
    ...Outlines.shadow.lifted,
  },
  timeSlotButtonText: {
    ...Typography.header.x35,
    color: Colors.primary.s800,
  },
  estimatedCostContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Sizing.x10,
  },
  estimatedCostWrapper: {
    flexDirection: "row",
    textAlign: "auto",
  },
  totalAda_light: {
    fontSize: 60,
    fontFamily: "Roboto-Medium",
    color: Colors.primary.s600,
  },
  totalAda_dark: {
    fontSize: 60,
    fontFamily: "Roboto-Medium",
    color: Colors.primary.neutral,
  },
  walletBalance_light: {
    ...Typography.subHeader.x10,
    color: Colors.primary.s800,
  },
  walletBalance_dark: {
    ...Typography.subHeader.x10,
    color: Colors.primary.s200,
  },
});
