import * as React from "react";

import { LayoutRectangle } from "react-native";
import { PlaceholderDay } from "./PlaceholderDay";
import { MonthlyDay } from "./days/MonthlyDay";
import { Month } from "interfaces/myCalendarInterface";
import { BookingDay } from "./days/BookingDay";
import { AvailabilityDay } from "./days/AvailabilityDay";
import { getTime } from "lib/utils";
import { monthsByName } from "common/types/calendarTypes";

export interface MonthProps extends Month {
  dimensions: LayoutRectangle | null;
  onPlaceholderPress: (direction: string) => void;
  isBookingCalendar?: boolean;
  isAvailabilityCalendar?: boolean;
  isNewEventCalendar?: boolean;
  month: string;
}

export const MonthItem = ({
  year,
  month,
  days,
  onPlaceholderPress,
  isBookingCalendar,
  isNewEventCalendar,
}: MonthProps) => {
  const [activeDay, setActiveDay] = React.useState<number | null>(null);
  const [availableDays, setAvailableDays] = React.useState<number[]>([]);

  const isSelectedAvailability = React.useCallback(
    (year, month, number) => {
      return availableDays.includes(getTime(year, monthsByName[month], number));
    },
    [availableDays]
  );

  return (
    <>
      {days.map((day) =>
        day.name === "placeholder" ? (
          <PlaceholderDay
            onPlaceholderPress={onPlaceholderPress}
            direction={day.direction != null ? day.direction : ""}
            key={`${day.name}-${day.number}`}
            number={day.number}
          />
        ) : isBookingCalendar ? (
          <BookingDay
            month={month}
            year={year}
            name={day.name}
            key={`${month}-${day.name}-${day.number}`}
            number={day.number}
            availabilities={day.availabilities}
            activeDay={activeDay}
            setActiveDay={setActiveDay}
          />
        ) : isNewEventCalendar ? (
          <AvailabilityDay
            key={`${month}-${day.name}-${day.number}`}
            number={day.number}
            isSelectedDay={isSelectedAvailability(year, month, day.number)}
            setAvailableDays={setAvailableDays}
          />
        ) : (
          <MonthlyDay
            month={month}
            year={year}
            name={day.name}
            key={`${month}-${day.name}-${day.number}`}
            number={day.number}
            availabilities={day.availabilities}
            activeDay={activeDay}
            setActiveDay={setActiveDay}
            scheduledEvents={day.scheduledEvents}
          />
        )
      )}
    </>
  );
};
