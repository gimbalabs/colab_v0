import { appContext, myCalendarContext } from "contexts/contextApi";
import * as React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import { Buttons, Colors, Typography } from "styles/index";

export interface CalendarEventsListHeaderProps {}

export const CalendarEventsListHeader = ({}: CalendarEventsListHeaderProps) => {
  const { calendarHeader } = myCalendarContext();
  const { colorScheme } = appContext();

  const lightTheme = colorScheme === "light";

  return (
    <View style={styles.dayPreviewBar}>
      <Text
        style={
          lightTheme
            ? styles.dayPreviewBarText_light
            : styles.dayPreviewBarText_dark
        }>
        You have{" "}
        <Text style={{ fontSize: 18, fontFamily: "Roboto-Bold" }}>
          {calendarHeader.numOfEvents}
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
    ...Typography.header.x35,
    fontSize: 17,
    color: Colors.primary.s600,
  },
  dayPreviewBarText_dark: {
    ...Typography.header.x35,
    fontSize: 17,
    color: Colors.primary.neutral,
  },
  dayPreviewBarButton: {},
});
