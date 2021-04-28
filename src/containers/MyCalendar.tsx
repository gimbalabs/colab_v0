import * as React from "react";
import {
  CalendarEventsList,
  CalendarHeader,
  MainCalendar,
  MonthlyDay,
  MonthlyWeeks,
  WeekDayNames,
} from "components/calendar";

export const MyCalendar = () => {
  return (
    <CalendarWrapper>
      <CalendarHeader></CalendarHeader>
      <MainCalendar></MainCalendar>
      <CalendarEventsList></CalendarEventsList>
    </CalendarWrapper>
  );
};
