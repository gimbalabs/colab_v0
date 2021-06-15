import * as React from "react";

import { LayoutRectangle } from "react-native";
import { PlaceholderDay } from "./PlaceholderDay";
import { MonthlyDay } from "./MonthlyDay";
import { Month } from "interfaces/myCalendarInterface";

export interface MonthProps extends Month {
  dimensions: LayoutRectangle | null;
  month: string;
}

export const MonthItem = React.memo(
  ({ year, month, days, dimensions }: MonthProps) => {
    const [activeDay, setActiveDay] = React.useState<number | null>(null);

    return days.map((day) =>
      day.name === "placeholder" ? (
        <PlaceholderDay key={`${day.name}-${day.number}`} number={day.number} />
      ) : (
        <MonthlyDay
          month={month}
          name={day.name}
          key={`${day.name}-${day.number}-${year}`}
          number={day.number}
          availabilities={day.availabilities}
          activeDay={activeDay}
          setActiveDay={setActiveDay}
          scheduledEvents={day.scheduledEvents}
          isLastWeek={day.isLastWeek || false}
        />
      )
    );
  }
);
