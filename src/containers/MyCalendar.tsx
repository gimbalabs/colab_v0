import * as React from "react";
import {
  CalendarEventsList,
  CalendarWrapper,
  MonthlyWrapper,
} from "components/calendar";

export const MyCalendar = () => {
  return (
    <CalendarWrapper>
      <MonthlyWrapper />
      <CalendarEventsList />
    </CalendarWrapper>
  );
};
