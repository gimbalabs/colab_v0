import * as React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { appContext, eventCreationContext } from "contexts/contextApi";
import { LeftArrowIcon } from "assets/icons";
import { Colors, Sizing, Typography } from "styles/index";
import { FullWidthButton } from "components/buttons/fullWidthButton";
import { EventConfirmationDetails } from "components/booking";
import { ProfileContext } from "contexts/profileContext";
import { Events } from "Api/Events";
import { CreateEventDto } from "common/types/dto/create-event.dto";

export const DetailedConfirmation = ({ navigation, route }: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { timeBlockCostADA: hourlyRate } = React.useContext(ProfileContext);
  const { colorScheme } = appContext();
  const {
    textContent,
    selectedDays,
    tags,
    fromDate,
    toDate,
    hourlyRate: eventHourlyRate,
    imageURI,
    privateEvent,
    eventCardColor,
    eventTitleColor,
    availabilities,
    resetState,
  } = eventCreationContext();
  const { username, id } = React.useContext(ProfileContext);
  const params = route?.params;
  const isLightMode = colorScheme === "light";

  const onBackNavigationPress = () => navigation.goBack();
  const onButtonPress = async () => {
    if (params?.isNewEvent) {
      setIsLoading(true);
      const newEvent: CreateEventDto = {
        title: textContent.title,
        description: textContent.description,
        availabilities,
        selectedDays,
        tags,
        fromDate,
        toDate,
        hourlyRate: hourlyRate ?? eventHourlyRate,
        imageURI,
        privateEvent,
        eventCardColor,
        eventTitleColor,
        organizer: {
          id,
          username,
        },
      };

      try {
        const res = await Events.createEvent(newEvent);

        if (res) {
          setIsLoading(false);
          navigation.navigate("Confirmation", {
            isBookingConfirmation: params?.isNewEvent ?? false,
          });
        }
      } catch (e) {
        setIsLoading(false);
        console.error(e);
      }

      resetState();
    }

    //@TODO submit transaction to blockchain
    // setWalletBalance(walletBalance - durationCost);
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
        <EventConfirmationDetails isNewEvent={params?.isNewEvent} />
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
