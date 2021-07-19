import * as React from "react";
import {
  CalendarEventsList,
  CalendarWrapper,
  MonthlyWrapper,
} from "components/calendar";

export interface CalendarProps {
  isBookingCalendar?: boolean;
  isHomeScreen?: boolean;
}

export const Calendar = ({
  isBookingCalendar,
  isHomeScreen,
}: CalendarProps) => {
  return (
    <CalendarWrapper>
      <MonthlyWrapper />
      {(isBookingCalendar == null || isHomeScreen) && (
        <CalendarEventsList isBookingCalendar isHomeScreen />
      )}
    </CalendarWrapper>
  );
};
