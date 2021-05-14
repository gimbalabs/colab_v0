import * as React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

import { Colors, Buttons, Outlines, Sizing, Typography } from "styles";
import { CalendarEvent } from "interfaces/myCalendarInterface";
import { getDigitalTime } from "lib/utils";
import { months } from "types/calendarTypes";

export const CalendarEventsDetail = ({
  title,
  fromDate,
  toDate,
  participants,
  description,
}: CalendarEvent) => {
  const fromTime = getDigitalTime(fromDate);
  const toTime = getDigitalTime(toDate);

  const eventDay = new Date(fromDate).getDate();
  const eventMonth = months[new Date(fromDate).getMonth()];

  return (
    <View style={styles.container}>
      <View style={styles.dateHolder}>
        <Text style={styles.dateDay}>{eventDay}</Text>
        <Text style={styles.dateMonth}>{eventMonth}</Text>
      </View>
      <View style={styles.eventDetail}>
        <Text style={styles.eventDetailText}>{title}</Text>
        <Text style={styles.eventDetailText}>
          {fromTime} - {toTime} UTC
        </Text>
        {description ? (
          <Text style={styles.eventDetailText}>{description}</Text>
        ) : (
          <></>
        )}
        {participants.map((p) => (
          <Text style={styles.eventDetailText}>{p}</Text>
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
