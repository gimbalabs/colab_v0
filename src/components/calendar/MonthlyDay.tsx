import * as React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Buttons, Colors, Outlines, Sizing, Typography } from "styles/index";
import { DotIcon, PartiallyBookedDay } from "icons/index";
import { Day } from "interfaces/myCalendarInterface";
import { bookingContext, myCalendarContext } from "contexts/contextApi";
import { getDate, getMonthName, getTime, getYear } from "lib/utils";
import { monthsByName } from "common/types/calendarTypes";

export interface MonthlyDayProps extends Day {
  year?: number;
  month: string;
  activeDay: number | null;
  isBookingCalendar?: boolean;
  setActiveDay: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedDay?: (arg: any) => any;
}

export const MonthlyDay = ({
  month,
  number,
  availabilities,
  activeDay,
  setActiveDay,
  scheduledEvents,
  year,
  isBookingCalendar = false,
}: MonthlyDayProps) => {
  const { previewingDayEvents } = myCalendarContext();
  const { setPickedDate, pickedDate } = bookingContext();

  const dayInTime = getTime(year, monthsByName[month], number);
  const hasAvailabilities = availabilities != null && availabilities.length > 0;

  // Today's day
  const isCurrentDay =
    year === getYear() && month === getMonthName() && number === getDate();

  // Whenever someone has pressed a day or it's a current day
  const isActiveDay =
    (activeDay && activeDay === number) ||
    (!activeDay && previewingDayEvents && previewingDayEvents.day === number) ||
    (!activeDay && isCurrentDay && !isBookingCalendar) ||
    (getTime(year, monthsByName[month], number) === pickedDate && !activeDay);

  // Whenever the first scheduled event starts at first available time,
  // and the last scheduled event ends at the last available time
  const isFullyBooked =
    scheduledEvents != null &&
    availabilities != null &&
    scheduledEvents[0].fromTime === availabilities[0].fromTime &&
    scheduledEvents[scheduledEvents.length - 1].toTime ===
      availabilities[availabilities.length - 1].toTime;

  const isPartiallyBooked = !isFullyBooked && scheduledEvents != null;
  const isFullyAvailable =
    (availabilities != null &&
      availabilities.length > 0 &&
      scheduledEvents == null) ||
    (scheduledEvents != null && scheduledEvents.length === 0);

  const onPress = () => {
    // When already selected, deselect it
    if (pickedDate === dayInTime) return setPickedDate(null);

    // on booking-experience we want users to be able to highlight only
    // the day with availabilities
    if (availabilities == null) return;

    // Dont' highlight a fully booked day
    if (isFullyBooked && isBookingCalendar) return;

    if (isBookingCalendar && hasAvailabilities) {
      setPickedDate(dayInTime);
    } else {
      setActiveDay(number);
    }
  };

  return (
    <Pressable style={[styles.dayContainer]} hitSlop={5} onPress={onPress}>
      <View
        style={[
          styles.dayButton,
          {
            backgroundColor:
              isActiveDay && !isBookingCalendar
                ? Colors.primary.s600
                : isBookingCalendar && pickedDate === dayInTime
                ? Colors.primary.s600
                : isBookingCalendar && isFullyBooked
                ? Colors.booked
                : isBookingCalendar && isFullyAvailable
                ? Colors.available
                : availabilities && !isActiveDay
                ? Colors.primary.s180
                : "transparent",
          },
          !isFullyBooked &&
            isBookingCalendar &&
            availabilities && { ...Outlines.shadow.lifted },
        ]}>
        <Text
          style={[
            styles.dayNumber,
            {
              color:
                isActiveDay ||
                (isCurrentDay && !activeDay && !isBookingCalendar)
                  ? Colors.primary.neutral
                  : Colors.primary.s600,
            },
          ]}>
          {number}
        </Text>
        {isPartiallyBooked && !isActiveDay && isBookingCalendar && (
          <PartiallyBookedDay
            width={34}
            height={34}
            style={styles.partiallyBookedDay}
          />
        )}
      </View>
      {!isBookingCalendar && (
        <View style={styles.dotsWrapper}>
          {scheduledEvents && (
            <DotIcon style={styles.scheduledDay} fill="#FCD34D" stroke="none" />
          )}
          {availabilities && (
            <DotIcon style={styles.availableDay} fill="#60A5FA" stroke="none" />
          )}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  dayNumber: {
    ...Typography.body.x30,
    ...Typography.roboto.medium,
    zIndex: 2,
  },
  dotsWrapper: {
    zIndex: 5,
    flexDirection: "row",
    marginTop: 2,
    width: "50%",
    justifyContent: "space-evenly",
  },
  dayContainer: {
    width: `${100 / 7}%`,
    height: `${100 / 6}%`,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dayButton: {
    borderRadius: 999,
    width: 33,
    height: 33,
    alignItems: "center",
    justifyContent: "center",
  },
  partiallyBookedDay: {
    position: "absolute",
    bottom: 0,
    borderRadius: 999,
    height: 33,
    width: 33,
  },
  scheduledDay: {
    ...Buttons.circular.primary,
    backgroundColor: "transparent",
    flex: 1,
    height: Sizing.x7,
    width: Sizing.x7,
  },
  availableDay: {
    ...Buttons.circular.primary,
    backgroundColor: "transparent",
    flex: 1,
    height: Sizing.x7,
    width: Sizing.x7,
  },
});
