import { monthsByName } from "common/types/calendarTypes";

/**
 *  Takes index of the selected day in the weeek
 *  and returns recurring days of the same index in current month.
 *
 *  For example:
 *   - Sunday (1-08-2021)
 *   - Sunday (8-08-2021)
 *   ...
 *
 *  @param index - the selected index of a week day
 *  @param year
 *  @param string
 *  @returns elected days array in milliseconds
 */
export const getRecurringMonthDays = (
  index: number,
  year: number,
  month: string
) => {
  const daysArray: number[] = [];

  const numOfDays = new Date(year, monthsByName[month] + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, monthsByName[month]).getDay();

  var firstDayToSelect =
    firstDayOfWeek > index
      ? 7 - firstDayOfWeek + index + 1
      : 1 + (index - firstDayOfWeek);
  // Calculate number of weeks (+1 because starting from current selected day)
  var numOfWeeks = Math.floor((numOfDays - firstDayToSelect) / 7 + 1);

  for (let i = numOfWeeks; numOfWeeks > 0; numOfWeeks--) {
    daysArray.push(
      new Date(year, monthsByName[month], firstDayToSelect).getTime()
    );
    firstDayToSelect = firstDayToSelect + 7;
  }

  return daysArray;
};
