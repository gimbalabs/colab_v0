import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

import {
  FullyAvailable,
  FullyBooked,
  PartiallyBooked,
} from "assets/icons/calendarLegend/index";
import { Colors, Outlines, Sizing, Typography } from "styles/index";
import { fontWeight } from "../../styles/typography";

export interface CalendarLegendProps {
  colorScheme: "light" | "dark";
  isBookingCalendar?: boolean;
  isRegularCalendar?: boolean;
}

export const CalendarLegend = ({
  colorScheme,
  isRegularCalendar,
  isBookingCalendar,
}: CalendarLegendProps) => {
  const isLightMode = colorScheme === "light";

  return (
    <View style={styles.container}>
      {isBookingCalendar ? (
        <>
          <View style={styles.dotLine}>
            <FullyAvailable style={styles.dot} />
            <Text
              style={[
                styles.text,
                isLightMode && { color: Colors.primary.s800 },
              ]}>
              Available dates
            </Text>
          </View>
          <View style={styles.dotLine}>
            <PartiallyBooked style={styles.dot} />
            <Text
              style={[
                styles.text,
                isLightMode && { color: Colors.primary.s800 },
              ]}>
              Limited availability
            </Text>
          </View>
          <View style={styles.dotLine}>
            <FullyBooked style={styles.dot} />
            <Text
              style={[
                styles.text,
                isLightMode && { color: Colors.primary.s800 },
              ]}>
              Fully booked
            </Text>
          </View>
        </>
      ) : isRegularCalendar ? (
        <>
          <View style={styles.dotLine}>
            <FullyAvailable style={styles.dot} />
            <Text
              style={[
                styles.text,
                isLightMode && { color: Colors.primary.s800 },
              ]}>
              Active events
            </Text>
          </View>
          <View style={styles.dotLine}>
            <FullyBooked style={styles.dot} />
            <Text
              style={[
                styles.text,
                isLightMode && { color: Colors.primary.s800 },
              ]}>
              Scheduled events
            </Text>
          </View>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    marginLeft: Sizing.x25,
    flexDirection: "row",
  },
  dotLine: {
    marginRight: Sizing.x10,
    alignItems: "center",
    flexDirection: "row",
  },
  dot: {
    width: Sizing.x15,
    height: Sizing.x15,
    marginRight: Sizing.x5,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: Colors.primary.neutral,
  },
  text: {
    ...Typography.subHeader.x8,
    ...fontWeight.semibold,
    paddingTop: Sizing.x2,
    color: Colors.primary.neutral,
  },
});
