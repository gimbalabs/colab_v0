import * as React from "react";
import {
  CalendarEventsList,
  CalendarWrapper,
  MonthlyWrapper,
} from "components/calendar";

export interface CalendarProps {
  isBookingCalendar?: boolean;
}

export const Calendar = ({ isBookingCalendar }: CalendarProps) => {
  return (
    <CalendarWrapper>
      <MonthlyWrapper />
      {isBookingCalendar == null && <CalendarEventsList />}
    </CalendarWrapper>
  );
};
