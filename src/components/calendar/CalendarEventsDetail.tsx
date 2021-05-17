import * as React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

import { Colors, Buttons, Outlines, Sizing, Typography } from "styles";
import { ScheduledEvent } from "interfaces/myCalendarInterface";
import { getDigitalTime } from "lib/utils";
import { months } from "types/calendarTypes";
import { myCalendarContext } from "contexts/contextApi";

export const CalendarEventsDetail = ({
  title,
  fromTime,
  toTime,
  participants,
  description,
}: ScheduledEvent) => {
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
        {description ? (
          <Text style={styles.eventDetailText}>{description}</Text>
        ) : (
          <></>
        )}
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
    minWidth: "90%",
    paddingVertical: "2%",
    borderRadius: Outlines.borderRadius.small,
    borderBottomWidth: Outlines.borderWidth.base,
    borderColor: Colors.neutral.s200,
  },
  dateHolder: {
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
  },
  dateDay: {
    ...Typography.subHeader.x40,
  },
  dateMonth: {
    ...Typography.subHeader.x30,
  },
  eventDetail: {},
  eventDetailText: {
    ...Typography.body.x20,
  },
});
