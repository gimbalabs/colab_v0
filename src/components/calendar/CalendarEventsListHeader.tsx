import { appContext } from "contexts/contextApi";
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Colors, Typography } from "styles/index";

export interface CalendarEventsListHeaderProps {
  numOfEvents: number;
}

export const CalendarEventsListHeader = ({
  numOfEvents,
}: CalendarEventsListHeaderProps) => {
  const { colorScheme } = appContext();
  const lightTheme = colorScheme === "light";

  return (
    <View style={styles.dayPreviewBar}>
      {numOfEvents && (
        <Text
          style={
            lightTheme
              ? styles.dayPreviewBarText_light
              : styles.dayPreviewBarText_dark
          }>
          You have{" "}
          <Text style={{ fontFamily: "Roboto-Bold" }}>{numOfEvents}</Text>{" "}
          upcoming events
        </Text>
      )}
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
});
