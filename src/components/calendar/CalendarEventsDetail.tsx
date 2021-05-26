import * as React from "react";
import { View, Text, StyleSheet, LayoutRectangle } from "react-native";

import { Colors, Outlines, Sizing, Typography } from "styles/index";
import { ScheduledEvent } from "interfaces/myCalendarInterface";
import { getDigitalTime } from "lib/utils";
import { months } from "common/types/calendarTypes";
import { myCalendarContext } from "contexts/contextApi";

export interface CalendarEventsDetailProps extends ScheduledEvent {}

export const CalendarEventsDetail = ({
  title,
  fromTime,
  toTime,
  participants,
  description,
}: CalendarEventsDetailProps) => {
  const { previewingDayEvents } = myCalendarContext();
  const fromTimeDigit = getDigitalTime(fromTime);
  const toTimeDigit = getDigitalTime(toTime);

  const eventDay = new Date(fromTime).getDate();
  const eventMonth = months[new Date(fromTime).getMonth()];

  return (
    <View style={styles.container}>
      <View style={styles.dateHolder}>
        <Text style={styles.dateDay}>{eventDay}</Text>
        <Text style={styles.dateMonth}>{eventMonth}</Text>
      </View>
      <View style={styles.eventDetail}>
        <Text style={styles.eventDetailText}>{title}</Text>
        <Text style={styles.eventDetailText}>
          {fromTimeDigit} - {toTimeDigit} UTC
        </Text>
        {participants.map((p: string, index: number) => (
          <Text key={`${index + p}`} style={styles.eventDetailText}>
            {p}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: Outlines.borderWidth.base,
    borderColor: Colors.neutral.s200,
    justifyContent: "space-between",
  },
  dateHolder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dateDay: {
    ...Typography.subHeader.x40,
  },
  dateMonth: {
    ...Typography.subHeader.x30,
  },
  eventDetail: {
    flex: 3,
  },
  eventDetailText: {
    ...Typography.body.x20,
  },
});
