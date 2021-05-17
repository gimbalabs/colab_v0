import * as React from "react";
import {
  CalendarBottomNav,
  CalendarEventsList,
  CalendarHeader,
  CalendarWrapper,
  MainCalendar,
} from "components/calendar";
import {} from "components/calendar/CalendarBottomNav";

export const MyCalendar = () => {
  return (
    <CalendarWrapper>
      <CalendarHeader />
      <MainCalendar />
      <CalendarEventsList />
      <CalendarBottomNav />
    </CalendarWrapper>
  );
};
