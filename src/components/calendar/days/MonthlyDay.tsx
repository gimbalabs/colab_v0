import * as React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

import { Buttons, Colors, Outlines, Sizing, Typography } from "styles/index";
import { DotIcon } from "icons/index";
import { Day } from "interfaces/myCalendarInterface";
import { getDate, getMonthName, getYear } from "lib/utils";

export interface MonthlyDayProps extends Day {
  year?: number;
  month: string;
  activeDay: number | null;
  updateActiveDay: (arg: number) => void;
  setSelectedDay?: (arg: any) => any;
}

/**
 *  @description
 *    This component is being used to display days on a regular 'main' calendar.
 */

export const _MonthlyDay = ({
  month,
  number,
  activeDay,
  updateActiveDay,
  events,
  year,
}: MonthlyDayProps) => {
  const hasActiveEvents = !!events?.find((e) => e.type === "active slot");
  const hasScheduledSlots = !!events?.find((e) => e.type !== "active slot");

  // Today's day
  const isCurrentDay =
    year === getYear() && month === getMonthName() && number === getDate();

  // Whenever someone has pressed a day or it's a current day
  const isActiveDay = activeDay === number || (!activeDay && isCurrentDay);

  const onPress = () => {
    updateActiveDay(number);
  };

  const TextComponent = () => (
    <Text
      style={[
        styles.dayButtonText,
        isActiveDay || (isCurrentDay && !activeDay == null)
          ? {
              ...Outlines.shadow.base,
              color: Colors.primary.neutral,
            }
          : {
              color: Colors.primary.s600,
            },
      ]}>
      {number}
    </Text>
  );

  return React.useMemo(
    () => (
      <Pressable onPress={onPress} hitSlop={Sizing.x5} style={styles.dayButton}>
        {isActiveDay ? (
          <View style={styles.selectionIndicator}>
            <TextComponent />
          </View>
        ) : (
          <TextComponent />
        )}
        {hasActiveEvents && hasScheduledSlots && (
          <>
            <DotIcon
              style={[styles.icon, styles.leftIcon]}
              fill="#60A5FA"
              stroke="none"
            />
            <DotIcon
              style={[styles.icon, styles.rightIcon]}
              fill="#FCD34D"
              stroke="none"
            />
          </>
        )}
        {hasActiveEvents && !hasScheduledSlots && (
          <DotIcon style={styles.icon} fill="#60A5FA" stroke="none" />
        )}
        {hasScheduledSlots && !hasActiveEvents && (
          <DotIcon style={styles.icon} fill="#FCD34D" stroke="none" />
        )}
      </Pressable>
    ),
    [isActiveDay]
  );
};

const styles = StyleSheet.create({
  dotsWrapper: {
    zIndex: 5,
    flexDirection: "row",
    marginTop: 2,
    width: "50%",
    justifyContent: "space-evenly",
  },
  selectionIndicator: {
    width: Sizing.x42,
    height: Sizing.x42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: Colors.primary.s600,
  },
  dayButtonText: {
    ...Typography.body.x30,
    ...Typography.roboto.medium,
    textAlign: "center",
    zIndex: 2,
  },
  dayButton: {
    width: `${100 / 7}%`,
    height: `${100 / 6}%`,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    ...Buttons.circular.primary,
    backgroundColor: "transparent",
    height: Sizing.x7,
    width: Sizing.x7,
    position: "absolute",
    bottom: "10%",
  },
  leftIcon: {
    left: "35%",
  },
  rightIcon: {
    right: "35%",
  },
});

export const MonthlyDay = React.memo(_MonthlyDay);
