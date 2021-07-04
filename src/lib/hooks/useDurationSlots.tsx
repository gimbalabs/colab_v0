import * as React from "react";

export const useDurationSlots = (
  timeBlockMilSec: number,
  maxTimeSlotDuration: number
) => {
  const [timeSlots, setTimeSlots] = React.useState<number[] | null>(null);

  React.useEffect(() => {
    if (timeBlockMilSec != null && maxTimeSlotDuration != null) {
      // create an array of accumulated time blocks based on maxTimeSlotDuration
      let newTimeSlots: number[] = [];
      let numOfTimeSlots = maxTimeSlotDuration / timeBlockMilSec;
      let index = numOfTimeSlots;

      while (index != 0) {
        newTimeSlots.unshift(timeBlockMilSec * index);
        index--;
      }

      setTimeSlots(newTimeSlots);
    }
  }, [maxTimeSlotDuration, timeBlockMilSec]);

  return { timeSlots, setTimeSlots };
};
