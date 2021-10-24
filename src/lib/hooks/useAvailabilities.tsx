import * as React from "react";

export const useAvailabilities = (
  availabilities: any,
  pickedDate: number | null
) => {
  const [currAvailabilities, setCurrentAvailabilities] = React.useState<
    undefined | number[]
  >(undefined);

  React.useEffect(() => {
    if (availabilities != null && pickedDate != null) {
      // Calculate how many time slots should we render depending on
      // organizer time block. Eg. organizerTimeBlock 30min = 8:00, 8:30, 9:00...
      const sortedAvailabilities = availabilities.sort(
        (a, b) => a.from - b.from
      );
      const currTimeSlots: number[] = [];

      sortedAvailabilities.forEach((availability) => {
        const to = new Date(availability.to).getTime();
        let from = new Date(availability.from).getTime();

        while (from < to) {
          currTimeSlots.push(new Date(from).getTime());
          from = from + availability.minDuration * 60 * 1000; // millisedonds
        }
      });

      setCurrentAvailabilities(currTimeSlots);
    }
  }, [availabilities]);

  return { currAvailabilities, setCurrentAvailabilities };
};
