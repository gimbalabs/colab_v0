import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";

import { Colors, Sizing, Typography } from "styles/index";
import { OrganizerProfile } from "components/booking/index";
import { LeftArrowIcon } from "icons/index";
import {
  appContext,
  bookingContext,
  myCalendarContext,
} from "contexts/contextApi";

import { FullWidthButton } from "components/buttons/fullWidthButton";
import { AvailableTimesList } from "components/lists/availabilitiesScreen/AvailableTimesList";
import { useAvailabilities } from "lib/hooks/useAvailabilities";
import { AvailableTimeSlot } from "components/lists/availabilitiesScreen/AvailableTimeSlot";

export interface AvailableTimesProps {}

export const AvailableTimes = ({ navigation, route }) => {
  const [dayAvailabilities, setDayAvailabilities] = React.useState<
    undefined | number[]
  >(undefined);

  const { previewingOrganizer, pickedDate } = bookingContext();
  const { colorScheme } = appContext();
  const { availabilities } = myCalendarContext();
  const { currAvailabilities } = useAvailabilities(
    availabilities,
    pickedDate,
    previewingOrganizer.timeBlock
  );

  const isLightMode = colorScheme === "light";

  const onBackNavigationPress = () => navigation.goBack();
  const onNextPress = () => navigation.navigate();

  const setSelectedTimeSlot = (time: number) => console.log(time);

  const renderTimeSlots = React.useCallback(
    (item, index) => (
      <AvailableTimeSlot
        onPressCallback={setSelectedTimeSlot}
        index={index}
        time={item}
      />
    ),
    [availabilities]
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
            text={"Choose time"}
            colorScheme={colorScheme}
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
  timeSlotsContainer: {},
});
