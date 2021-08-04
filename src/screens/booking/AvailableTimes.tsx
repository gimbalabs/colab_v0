import * as React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Outlines, Sizing, Typography } from "styles/index";
import { OrganizerProfile } from "components/booking/index";
import { LeftArrowIcon } from "icons/index";
import {
  appContext,
  bookingContext,
  myCalendarContext,
} from "contexts/contextApi";

import { FullWidthButton } from "components/buttons/fullWidthButton";
import { useAvailabilities } from "lib/hooks/useAvailabilities";
import { getDigitalLocaleTime } from "lib/utils";
import { useScheduledTimes } from "lib/hooks/useScheduledTimes";
import { BookingStackParamList } from "common/types/navigationTypes";
import { StackScreenProps } from "@react-navigation/stack";

export interface AvailableTimesProps {}

type Props = StackScreenProps<BookingStackParamList, "Available Times">;

export const AvailableTimes = ({ navigation }: Props) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<number | null>(
    null
  );

  const {
    previewingOrganizer,
    pickedDate,
    setPickedDate,
    setMaxTimeSlotDuration,
  } = bookingContext();
  const { colorScheme } = appContext();
  const { availabilities, scheduledEvents } = myCalendarContext();
  const { currAvailabilities } = useAvailabilities(
    availabilities,
    pickedDate,
    previewingOrganizer.timeBlock
  );
  const { scheduledTimes } = useScheduledTimes(
    scheduledEvents,
    pickedDate,
    previewingOrganizer.timeBlock
  );

  const isLightMode = colorScheme === "light";
  const isDisabled = selectedTimeSlot === null;

  const maxTimeSlotDuration = () => {
    if (
      selectedTimeSlot &&
      currAvailabilities != null &&
      scheduledTimes != null
    ) {
      // calculate the max time span of organizer availability
      let timeBlockMilSec = previewingOrganizer?.timeBlock * 60 * 1000;
      let endOfAvailability =
        currAvailabilities?.[currAvailabilities.length - 1] + timeBlockMilSec;
      let upcomingEvent = scheduledTimes?.find(
        (time) => time > selectedTimeSlot
      );

      // there aren't any upcoming events at current day
      if (upcomingEvent == null) {
        // return the time span between selected time slot and
        // the end of organizer availability
        return endOfAvailability - selectedTimeSlot;
      } else {
        // else return the time span between selected time slot
        // and the first already booked event
        return upcomingEvent - selectedTimeSlot;
      }
    }
  };

  const onBackNavigationPress = () => navigation.goBack();
  const onNextPress = () => {
    setPickedDate(selectedTimeSlot);
    setMaxTimeSlotDuration(maxTimeSlotDuration());
    navigation.navigate("Duration Choice");
  };

  const onPressCallback = (item: number) => {
    if (scheduledTimes?.includes(item)) return;
    if (selectedTimeSlot === item) return setSelectedTimeSlot(null);
    setSelectedTimeSlot(item);
  };

  const renderTimeSlots = React.useCallback(
    (item: number, index: number) => {
      var _key = `${index}_${item}`;
      return (
        <Pressable
          onPress={() => onPressCallback(item)}
          hitSlop={5}
          key={_key}
          style={[
            styles.timeSlotButton,
            scheduledTimes?.includes(item)
              ? { backgroundColor: Colors.booked }
              : {
                  ...Outlines.shadow.lifted,
                },
            selectedTimeSlot === item && {
              backgroundColor: Colors.primary.s800,
            },
          ]}>
          <Text
            style={[
              styles.timeSlotButtonText,
              selectedTimeSlot === item && {
                color: Colors.available,
              },
            ]}>
            {getDigitalLocaleTime(item, "en")}
          </Text>
        </Pressable>
      );
    },
    [scheduledTimes, selectedTimeSlot]
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
            Select available time
          </Text>
        </View>
        <View style={styles.timeSlotsContainer}>
          {availabilities && currAvailabilities?.map(renderTimeSlots)}
        </View>
        <View style={styles.buttonContainer}>
          <FullWidthButton
            onPressCallback={onNextPress}
            text={"Next"}
            colorScheme={colorScheme}
            disabled={isDisabled}
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
    paddingVertical: Sizing.x3,
    paddingHorizontal: Sizing.x3,
    marginVertical: Sizing.x10,
    marginHorizontal: Sizing.x5,
    borderRadius: Outlines.borderRadius.large,
  },
  timeSlotButtonText: {
    ...Typography.header.x35,
    color: Colors.primary.s800,
  },
});
