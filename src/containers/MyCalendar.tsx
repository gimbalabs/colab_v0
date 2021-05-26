import * as React from "react";
import {
  CalendarEventsList,
  CalendarHeader,
  CalendarWrapper,
  MainCalendar,
} from "components/calendar";

export const MyCalendar = () => {
  return (
    <CalendarWrapper>
      <CalendarHeader />
      <MainCalendar />
      <CalendarEventsList />
    </CalendarWrapper>
  );
};
