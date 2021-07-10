import { appContext, myCalendarContext } from "contexts/contextApi";
import * as React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import { Buttons, Colors, Typography } from "styles/index";

export interface CalendarEventsListHeaderProps {
  isHomeScreen?: boolean;
}

export const CalendarEventsListHeader = ({
  isHomeScreen,
}: CalendarEventsListHeaderProps) => {
  const { calendarHeader, scheduledEvents } = myCalendarContext();
  const { colorScheme } = appContext();

  const lightTheme = colorScheme === "light";

  //@TODO change this value in prod to a curr month.
  const homerScreenNumOfEvents = scheduledEvents[0].months[0].totalNumOfEvents;

  return (
    <View style={styles.dayPreviewBar}>
      <Text
        style={
          lightTheme
            ? styles.dayPreviewBarText_light
            : styles.dayPreviewBarText_dark
        }>
        You have{" "}
        <Text style={{ fontFamily: "Roboto-Bold" }}>
          {isHomeScreen ? homerScreenNumOfEvents : calendarHeader.numOfEvents}
        </Text>{" "}
        upcoming events
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dayPreviewBar: {
    width: "95%",
    marginTop: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayPreviewBarText_light: {
    ...Typography.subHeader.x35,
    fontSize: 17,
    color: Colors.primary.s600,
  },
  dayPreviewBarText_dark: {
    ...Typography.subHeader.x35,
    fontSize: 17,
    color: Colors.primary.neutral,
  },
  dayPreviewBarButton: {},
});
