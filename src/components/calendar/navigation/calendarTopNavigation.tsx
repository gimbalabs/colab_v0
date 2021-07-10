import * as React from "react";
import {
  StyleSheet,
  ColorSchemeName,
  Pressable,
  ViewStyle,
} from "react-native";

import { LeftArrowIcon, RightArrowIcon } from "assets/icons";
import { isSixMonthsBefore, isSixMonthsLater } from "lib/utils";
import { Buttons, Colors, Sizing } from "styles/index";
import { CalendarHeader } from "common/interfaces/myCalendarInterface";
import { monthsByName } from "common/types/calendarTypes";

export interface CalendarTopNavigationProps {
  onPreviousPress: () => void;
  onNextPress: () => void;
  colorScheme: ColorSchemeName;
  calendarHeader: CalendarHeader;
}

export const CalendarTopNavigation = ({
  onPreviousPress,
  onNextPress,
  colorScheme,
  calendarHeader,
}: CalendarTopNavigationProps) => {
  const disabledNextButton = isSixMonthsLater(
    calendarHeader.year,
    monthsByName[calendarHeader.month]
  );
  const disabledPreviousButton = isSixMonthsBefore(
    calendarHeader.year,
    monthsByName[calendarHeader.month]
  );

  const navigationButtonStyle = (direction: "next" | "prev"): ViewStyle => {
    const disabled = ((direction === "next" && disabledNextButton) ||
      (direction === "prev" && disabledPreviousButton)) && {
      backgroundColor: Colors.neutral.s200,
    };

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
