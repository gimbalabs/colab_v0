import * as React from "react";
import {
  StyleSheet,
  ColorSchemeName,
  Pressable,
  ViewStyle,
} from "react-native";

import { LeftArrowIcon, RightArrowIcon } from "assets/icons";
import { Buttons, Colors, Sizing } from "styles/index";
import { CalendarHeader } from "common/interfaces/myCalendarInterface";
import { monthsByName } from "common/types/calendarTypes";
import { useRoute } from "@react-navigation/native";
import { isSixMonthsLater } from "lib/utils";

export interface CalendarTopNavigationProps {
  onPreviousPress: () => void;
  onNextPress: () => void;
  colorScheme: ColorSchemeName;
  calendarHeader: CalendarHeader;
  isBookingCalendar?: boolean;
  isNewEventCalendar?: boolean;
}

export const CalendarTopNavigation = ({
  onPreviousPress,
  onNextPress,
  colorScheme,
  calendarHeader,
  isBookingCalendar,
  isNewEventCalendar,
}: CalendarTopNavigationProps) => {
  const { month, year } = calendarHeader;

  /**
   * This will show disabled buttons after six months span time
   * (optional feature)
   */
  // const disabledPreviousButton = isSixMonthsBefore(
  //   calendarHeader.year,
  //   monthsByName[calendarHeader.month]
  // );

  var disabledNextButton = false;
  var disabledPreviousButton = false;

  if (isBookingCalendar || isNewEventCalendar) {
    disabledPreviousButton =
      year === new Date().getFullYear() &&
      monthsByName[month] === new Date().getMonth();

    if (isBookingCalendar) {
      var { toDate }: any = useRoute().params;

      disabledNextButton =
        year === new Date(toDate).getFullYear() &&
        monthsByName[month] === new Date(toDate).getMonth();
    } else {
      disabledNextButton = isSixMonthsLater(
        calendarHeader.year,
        monthsByName[calendarHeader.month]
      );
    }
  }

  const navigationButtonStyle = (direction: "next" | "prev"): ViewStyle => {
    const disabled =
      (direction === "next" && disabledNextButton) ||
      (direction === "prev" && disabledPreviousButton)
        ? {
            backgroundColor: Colors.neutral.s200,
          }
        : {};

    const buttonStyle =
      colorScheme === "light"
        ? styles.monthSwitchButton_light
        : styles.monthSwitchButton_dark;

    return { ...buttonStyle, ...disabled };
  };

  return (
    <>
      <Pressable
        style={Buttons.applyOpacity(navigationButtonStyle("prev"))}
        hitSlop={10}
        pressRetentionOffset={10}
        onPress={onPreviousPress}
        disabled={disabledPreviousButton}>
        <LeftArrowIcon
          width="20"
          height="20"
          color={
            colorScheme === "light" ? Colors.primary.s350 : Colors.primary.s800
          }
        />
      </Pressable>
      <Pressable
        hitSlop={10}
        pressRetentionOffset={10}
        style={Buttons.applyOpacity(navigationButtonStyle("next"))}
        onPress={onNextPress}
        disabled={disabledNextButton}>
        <RightArrowIcon
          width="20"
          height="20"
          color={
            colorScheme === "light" ? Colors.primary.s350 : Colors.primary.s800
          }
        />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  monthSwitchButton_light: {
    padding: 5,
    width: Sizing.x35,
    height: Sizing.x35,
    borderRadius: 999,
    backgroundColor: Colors.primary.s200,
    justifyContent: "center",
    alignItems: "center",
  },
  monthSwitchButton_dark: {
    padding: 5,
    width: Sizing.x35,
    height: Sizing.x35,
    borderRadius: 999,
    backgroundColor: Colors.primary.s200,
    justifyContent: "center",
    alignItems: "center",
  },
});
