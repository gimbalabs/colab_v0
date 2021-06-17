import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  LayoutRectangle,
  Pressable,
} from "react-native";

import { Colors, Outlines, Sizing, Typography } from "styles/index";
import { ScheduledEvent } from "interfaces/myCalendarInterface";
import { getDigitalTime } from "lib/utils";
import { months } from "common/types/calendarTypes";
import { myCalendarContext } from "contexts/contextApi";
import { RightArrowIcon } from "icons/index";

export interface CalendarEventsDetailProps extends ScheduledEvent {
  setHighlightedDay: React.Dispatch<any>;
  highlightedDay: any;
}

export const CalendarEventsDetail = ({
  title,
  index,
  fromTime,
  toTime,
  participants,
  organizer,
  setHighlightedDay,
  highlightedDay,
}: CalendarEventsDetailProps) => {
  const { previewingDayEvents } = myCalendarContext();
  const fromTimeDigit = getDigitalTime(fromTime);
  const toTimeDigit = getDigitalTime(toTime);

  const eventDay = new Date(fromTime).getDate();
  const eventMonth = months[new Date(fromTime).getMonth()];

  const even = index === 0 || index % 2 === 0;

  const onDateCardPress = () => {
    console.log(highlightedDay);
    setHighlightedDay(index);
    console.log("press ", index);
  };

  return (
    <Pressable onPress={onDateCardPress}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: even
              ? Colors.calendarCard.blue
              : Colors.calendarCard.yellow,
            zIndex: index,
            top:
              index === 0
                ? 0
                : highlightedDay === index
                ? 0
                : `${index * -60}%`,
          },
        ]}>
        <View style={styles.upperContainer}>
          <View style={styles.dateHolder}>
            <Text style={styles.dateDay}>
              {eventDay < 10 ? "0" + eventDay : eventDay}
            </Text>
            <Text style={styles.dateMonth}>{eventMonth}</Text>
          </View>
          <View style={styles.hourHolder}>
            <Text style={styles.hours}>
              {fromTimeDigit} - {toTimeDigit} UTC +12
            </Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.eventDetail}>
            <Text style={styles.eventDetailText}>{title}</Text>
            <Text style={styles.eventDetailText}>Organizer: {organizer}</Text>
          </View>
          <View style={styles.iconWrapper}>
            <RightArrowIcon
              stroke={Colors.primary.s800}
              width="24"
              height="24"
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Outlines.borderRadius.base,
    backgroundColor: Colors.calendarCard.blue,
    padding: Sizing.x14,
    alignSelf: "center",
    width: "90%",
  },
  upperContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  bottomContainer: {
    flexDirection: "row",
  },
  dateHolder: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  hourHolder: {
    justifyContent: "flex-end",
    alignItems: "baseline",
  },
  hours: {
    fontSize: 13,
    color: Colors.primary.s600,
  },
  dateDay: {
    ...Typography.roboto.medium,
    color: Colors.primary.s600,
    fontSize: Sizing.x45,
    letterSpacing: -2,
    marginRight: Sizing.x2,
  },
  dateMonth: {
    ...Typography.subHeader.x40,
    fontFamily: "Roboto-Medium",
    color: Colors.primary.s800,
  },
  eventDetail: {
    flex: 3,
  },
  eventDetailText: {
    ...Typography.body.x25,
    color: Colors.primary.s600,
    fontFamily: "Roboto-Regular",
    lineHeight: Sizing.x30,
  },
  iconWrapper: {
    marginRight: Sizing.x1,
    flexDirection: "row",
    alignItems: "center",
  },
});
