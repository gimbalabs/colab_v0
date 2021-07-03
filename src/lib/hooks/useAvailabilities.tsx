import * as React from "react";

import { getDate, getMonthByIndex, getYear } from "lib/utils";

export const useAvailabilities = (
  availabilities: any,
  pickedDate: number | null,
  organizerTimeBlock: number
) => {
  const [currAvailabilities, setCurrentAvailabilities] = React.useState<
    undefined | number[]
  >(undefined);

  React.useEffect(() => {
    if (availabilities != null && pickedDate != null) {
      let currAvail = availabilities
        .find((obj: any) => obj.year === getYear(pickedDate))
        ?.months.find((obj: any) => obj.month === getMonthByIndex(pickedDate))
        ?.days.find((obj: any) => obj.day === getDate(pickedDate))?.timeSlots;

      // Calculate how many time slots should we render depending on
      // organizer time block. Eg. organizerTimeBlock 30min = 8:00, 8:30, 9:00...
      let startingTime = currAvail.fromTime;
      let currTimeSlots: number[] = [];

      while (startingTime != currAvail.toTime) {
        currTimeSlots.push(startingTime);
        startingTime = startingTime + organizerTimeBlock * 60 * 1000; // millisedonds
      }

      setCurrentAvailabilities(currAvail);
    }
  }, [availabilities]);

  return { currAvailabilities, setCurrentAvailabilities };
};
