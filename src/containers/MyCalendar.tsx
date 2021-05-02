import * as React from "react";
import {
  CalendarEventsList,
  CalendarHeader,
  CalendarWrapper,
  MainCalendar,
  MonthlyDay,
  MonthlyWeeks,
  WeekDayNames,
} from "components/calendar";
import { MyCalendarProvider } from "contexts/myCalendarContext";

export const MyCalendar = () => {
  return (
    <MyCalendarProvider>
      <CalendarWrapper>
        <CalendarHeader></CalendarHeader>
        <MainCalendar></MainCalendar>
        <CalendarEventsList></CalendarEventsList>
      </CalendarWrapper>
    </MyCalendarProvider>
  );
};
