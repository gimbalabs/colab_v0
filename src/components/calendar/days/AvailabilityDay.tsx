import * as React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Buttons, Colors, Outlines, Sizing, Typography } from "styles/index";
import { DotIcon, PartiallyBookedDay } from "icons/index";
import { Day } from "interfaces/myCalendarInterface";
import { getTime } from "lib/utils";
import { monthsByName } from "common/types/calendarTypes";

export interface AvailabilityDayProps extends Day {
  number: number;
  isSelectedDay: boolean;
  setAvailableDays: React.Dispatch<React.SetStateAction<number[]>>;
}

/**
 * @description
 *  This day components is being used in calendar for selecting
 *  availabilities when creating new event as organizer.
 */

export const AvailabilityDay = ({
  number,
  setAvailableDays,
  isSelectedDay,
}: AvailabilityDayProps) => {
  const onPress = () => {};

  return (
    <Pressable style={[styles.dayContainer]} hitSlop={5} onPress={onPress}>
      <View
        style={[styles.dayButton, isSelectedDay && styles.selectedDayButton]}>
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
    // looks like the font is slightly moved to left
    textAlign: "center",
    marginLeft: Sizing.x1,
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
  selectedDayButton: {
    backgroundColor: Colors.primary.s600,
    ...Outlines.shadow.lifted,
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
