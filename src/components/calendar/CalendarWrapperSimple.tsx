import * as React from "react";
import { MyCalendarProvider } from "contexts/myCalendarContext";
import { EventCreationContextProvider } from "contexts/eventCreationContext";

export interface CalendarWrapperSimpleProps {
  children: React.ReactNode;
  isNewEventCalendar: boolean;
}

export const CalendarWrapperSimple = ({
  children,
  isNewEventCalendar = false,
}: CalendarWrapperSimpleProps) => {
  return !isNewEventCalendar ? (
    <MyCalendarProvider>{children}</MyCalendarProvider>
  ) : (
    <MyCalendarProvider>
      <EventCreationContextProvider>{children}</EventCreationContextProvider>
    </MyCalendarProvider>
  );
};
