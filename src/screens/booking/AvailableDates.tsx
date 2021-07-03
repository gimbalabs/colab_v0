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
import { appContext } from "contexts/contextApi";

import { featuredOrganizers } from "../../api_data/featuredOrganizers";
import { MonthlyWrapper } from "components/calendar";
import { CalendarWrapperSimple } from "components/calendar/CalendarWrapperSimple";
import { CalendarLegend } from "components/calendar/booking/CalendarLegend";
import { FullWidthButton } from "components/buttons/fullWidthButton";

export interface AvailableDatesProps {}

export const AvailableDates = ({ navigation, route }) => {
  const [profile, setProfile] = React.useState<any>(null);
  const { colorScheme } = appContext();
  const { alias } = route.params;

  React.useEffect(() => {
    let profile = featuredOrganizers.items.find((org) => org.alias === alias);

    setProfile(profile);
  }, []);

  const isLightMode = colorScheme === "light";

  const onBackNavigationPress = () => navigation.goBack();
  const onNextPress = () => navigation.navigate("Available Times");

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
            <LeftArrowIcon width={24} height={24} color={Colors.primary.s600} />
          </Pressable>
        </View>
        <OrganizerProfile profile={profile} />
        <View style={styles.calendarHeader}>
          <Text
            style={
              isLightMode
                ? styles.calendarHeaderText_light
                : styles.calendarHeaderText_dark
            }>
            Select available dates
          </Text>
        </View>
        <View style={styles.calendarWrapper}>
          <CalendarWrapperSimple>
            <MonthlyWrapper isBookingCalendar={true} />
          </CalendarWrapperSimple>
        </View>
        <CalendarLegend colorScheme={colorScheme} />
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
  calendarHeader: {
    marginVertical: Sizing.x5,
    marginRight: "auto",
    marginLeft: Sizing.x25,
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
    height: 380,
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
