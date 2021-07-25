import * as React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { Colors, Sizing, Typography } from "styles/index";
import { OrganizerProfile } from "components/booking/index";
import { LeftArrowIcon } from "icons/index";
import {
  appContext,
  bookingContext,
  myCalendarContext,
} from "contexts/contextApi";

import { SafeAreaView } from "react-native-safe-area-context";
import { customAvailabilities } from "../../api_data/customAvailabilities";
import { featuredOrganizers } from "../../api_data/featuredOrganizers";
import { MonthlyWrapper } from "components/calendar";
import { CalendarWrapperSimple } from "components/calendar/CalendarWrapperSimple";
import { FullWidthButton } from "components/buttons/fullWidthButton";
import { SubHeaderText } from "components/rnWrappers/subHeaderText";
import { EventsList } from "components/booking/EventsList";

export interface AvailableDatesProps {}

export const AvailableDates = ({ navigation, route }) => {
  const [profile, setProfile] = React.useState<any>(null);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [currentTab, setCurrentTab] = React.useState<string>("events");
  const { colorScheme } = appContext();
  const { setAvailCalendar } = myCalendarContext();
  const {
    setPreviewingOrganizer,
    previewingOrganizer,
    pickedDate,
  } = bookingContext();
  const { alias } = route.params;

  React.useEffect(() => {
    if (route.params?.selectedEvent != null) {
      setSelectedEvent(route.params.selectedEvent);
      setCurrentTab("availabilities");
    }

    let profile = featuredOrganizers.items.find((org) => org.alias === alias);

    setAvailCalendar(customAvailabilities);
    setPreviewingOrganizer(profile);
  }, [navigation, route.params]);

  const isLightMode = colorScheme === "light";
  const isDisabled = pickedDate === null;

  const onBackNavigationPress = () => navigation.goBack();
  const onNextPress = () => navigation.navigate("Available Times");

  const onEventsTabPress = () => setCurrentTab("events");
  const onAvailabilitiesTabPress = () => setCurrentTab("availabilities");

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
      <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
        <View style={styles.navigation}>
          <Pressable onPress={onBackNavigationPress} hitSlop={10}>
            <LeftArrowIcon
              width={24}
              height={24}
              color={isLightMode ? Colors.primary.s600 : Colors.primary.neutral}
            />
          </Pressable>
        </View>
        {previewingOrganizer && currentTab != "availabilities" && (
          <OrganizerProfile profile={previewingOrganizer} />
        )}
        <View style={styles.calendarHeader}>
          <SubHeaderText
            callbackFn={onEventsTabPress}
            customStyle={
              currentTab === "events" && { fontFamily: "Roboto-Bold" }
            }
            colors={[Colors.primary.s800, Colors.primary.neutral]}>
            Events
          </SubHeaderText>
          <SubHeaderText
            callbackFn={onAvailabilitiesTabPress}
            customStyle={
              currentTab === "availabilities" && { fontFamily: "Roboto-Bold" }
            }
            colors={[Colors.primary.s800, Colors.primary.neutral]}>
            Availabilities
          </SubHeaderText>
        </View>
        {selectedEvent && currentTab === "availabilities" && (
          <>
            <View style={styles.calendarWrapper}>
              <CalendarWrapperSimple>
                <MonthlyWrapper isBookingCalendar={true} />
              </CalendarWrapperSimple>
            </View>
            <View style={styles.buttonContainer}>
              <FullWidthButton
                onPressCallback={onNextPress}
                text={"Book event"}
                colorScheme={colorScheme}
                disabled={isDisabled}
              />
            </View>
          </>
        )}
        {currentTab === "events" && (
          <View style={{ flex: 1, width: "90%" }}>
            <EventsList />
          </View>
        )}
      </View>
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
  calendarHeader: {
    width: "80%",
    marginVertical: Sizing.x5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  calendarHeaderText_light: {
    ...Typography.header.x50,
    color: Colors.primary.s800,
  },
  calendarHeaderText_dark: {
    ...Typography.header.x50,
    color: Colors.primary.neutral,
  },
  calendarWrapper: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginVertical: Sizing.x10,
  },
});
