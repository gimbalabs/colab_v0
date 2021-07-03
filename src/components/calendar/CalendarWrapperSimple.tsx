import * as React from "react";
import { MyCalendarProvider } from "contexts/myCalendarContext";
import { BookingContextProvider } from "contexts/bookingContext";

export interface CalendarWrapperSimpleProps {
  children: React.ReactNode;
}

export const CalendarWrapperSimple = ({
  children,
}: CalendarWrapperSimpleProps) => {
  return (
    <MyCalendarProvider>
      <BookingContextProvider>{children}</BookingContextProvider>
    </MyCalendarProvider>
  );
};
