import * as React from "react";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";

import { Colors, Outlines, Sizing, Typography } from "styles/index";
import { ScheduledEvent } from "interfaces/myCalendarInterface";
import { getDigitalTime } from "lib/utils";
import { months } from "common/types/calendarTypes";
import { RightArrowIcon } from "icons/index";

export interface CalendarEventsDetailProps extends ScheduledEvent {
  setHighlightedDay: React.Dispatch<any>;
  highlightedDay: any;
  listLength: number;
}

export const CalendarEventsDetail = ({
  title,
  index,
  fromTime,
  toTime,
  listLength,
  organizer,
  setHighlightedDay,
  highlightedDay,
}: CalendarEventsDetailProps) => {
  const animatedMargin = React.useRef(new Animated.Value(-60)).current;
  const animatedValue = parseInt(JSON.stringify(animatedMargin));

  const fromTimeDigit = getDigitalTime(fromTime);
  const toTimeDigit = getDigitalTime(toTime);

  const eventDay = new Date(fromTime).getDate();
  const eventMonth = months[new Date(fromTime).getMonth()];

  const even = index === 0 || index % 2 === 0;

  const onDateCardPress = () => {
    // when we click on the last card, return
    if (index === listLength - 1) return;

    if (highlightedDay - 1 === index && animatedValue === -60) {
      // when someone clicks on the same card, just pull it back to top
      setHighlightedDay(null);
    } else {
      // on press, set the index of card bellow the one that was clicked,
      // because that's the one that needs to move down
      setHighlightedDay(index + 1);
    }
  };

  const animateToTop = () => {
    Animated.timing(animatedMargin, {
      toValue: -60,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const animateToBottom = () => {
    Animated.timing(animatedMargin, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  React.useEffect(() => {
    if (index === highlightedDay) {
      animateToBottom();
    } else if (Number(animatedMargin) !== 0) {
      animateToTop();
    }
  }, [highlightedDay]);

  return (
    <Pressable onPress={onDateCardPress} hitSlop={25}>
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: even
              ? Colors.calendarCard.blue
              : Colors.calendarCard.yellow,
            zIndex: index,
            marginBottom: highlightedDay - 1 === index ? 5 : 0,
            marginTop: index === 0 ? 0 : animatedMargin,
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
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Outlines.borderRadius.base,
    backgroundColor: Colors.calendarCard.blue,
    ...Outlines.shadow.lifted,
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
