import * as yup from "yup";

import { months, weekDays } from "common/types/calendarTypes";
import { Day, Month } from "interfaces/myCalendarInterface";

/**
 * @description Use this function to validate form input that
 * has to contain only numbers
 *
 * @param val
 */
export function validateNumberInput(val: string): boolean {
  var regex = /^\d+$/;
  if (+val || val == "") {
    if (regex.test(val)) {
      return true;
    }
  }
  return false;
}

/**
 * @description This will specify schema for validating organizer
 * form inputs values.
 */
export function formValidationSchema() {
  return yup.object().shape({
    alias: yup.string().required("Alias is required"),
    aboutURL: yup.string().url(),
    imageURL: yup.string().url(),
    timeBlockCostADA: yup
      .string()
      .matches(/^[+-]?\d+(\.\d+)?$/, "This input can only contain numbers")
      .required("Please provide the price"),
    timeBlockLengthMin: yup
      .string()
      .matches(/^[+-]?\d+(\.\d+)?$/, "This input can only contain numbers")
      .required("Please provide the time length"),
  });
}

/**
 *   @description This will return an array with next/previous 6 months with
 *    number of total days, name of the first day (eg. 'Monday'), and
 *    names of the months.
 *
 *    Next months are starting from current month (or passed as fromMonth),
 *    while previous months will omit current month.
 *
 *   @param nextMonths
 *          previousMonths
 *          fromMonth
 *          fromYear
 */
export function getSixMonthsWithDays(
  nextMonths = false,
  previousMonths = false,
  fromMonth?: number,
  fromYear?: number
): Month[] {
  const year = fromYear ? fromYear : new Date().getFullYear();
  const month = fromMonth ? fromMonth : new Date().getMonth();
  const day = new Date().getDay();

  const firstDayIndex = new Date(year, month, day).getDay();
  const monthsWithDays: Month[] = [];

  var currYear = year;
  var currMonthIndex = month;
  var currDayIndex = firstDayIndex;
  var numOfDays = 0;

  if (nextMonths) {
    for (let i = currMonthIndex; i <= month + 6; i++) {
      let days: Day[] = [];
      const firstDay = new Date(currYear, currMonthIndex).getDay();
      const firstDayName = weekDays[firstDay];

      for (let j = 1; isValidDate(j, currMonthIndex, currYear); j++) {
        days.push({
          name: weekDays[currDayIndex],
          number: j,
          isLastWeek: isLastWeek(j, firstDay),
        });

        /* Check the day of the week, if it's Sunday -
         * set the next one to Monday
         */
        if (currDayIndex === 7) {
          currDayIndex = 1;
        } else {
          currDayIndex++;
        }
        numOfDays++;
      }
      days = insertFirstWeekPlaceholders(firstDay, days);

      monthsWithDays.push({
        name: months[currMonthIndex],
        firstDayName,
        numOfDays,
        year: currYear,
        days,
      });
      currMonthIndex++;
      numOfDays = 0;
      if (currMonthIndex > 11) {
        currMonthIndex = 0;
        currYear += 1;
      }
    }
  } else if (previousMonths) {
    for (let i = currMonthIndex - 7; i < month; i++) {
      let days: Day[] = [];
      const firstDay = new Date(currYear, currMonthIndex).getDay();
      const firstDayName = weekDays[firstDay];

      for (let j = 1; isValidDate(j, currMonthIndex, currYear); j++) {
        days.push({
          name: weekDays[currDayIndex],
          number: j,
          isLastWeek: isLastWeek(j, firstDay),
        });

        /* Check the day of the week, if it's Sunday -
         * set the next one to Monday
         */
        if (currDayIndex === 7) {
          currDayIndex = 1;
        } else {
          currDayIndex++;
        }
        numOfDays++;
      }
      days = insertFirstWeekPlaceholders(firstDay, days);
      monthsWithDays.push({
        name: months[currMonthIndex],
        firstDayName,
        numOfDays,
        year: currYear,
        days,
      });
      currMonthIndex--;
      numOfDays = 0;
      if (currMonthIndex < 0) {
        currMonthIndex = 11;
        currYear -= 1;
      }
    }
    monthsWithDays.reverse().pop();
    return monthsWithDays;
  }
  return monthsWithDays;
}

export function isValidDate(day: number, month: number, year: number): boolean {
  return new Date(year, month, day).getMonth() === month ? true : false;
}

/**
 * @description Check whether the first week should have placeholder
 * displayed on a week
 */
export function insertFirstWeekPlaceholders(
  firstDay: number,
  days: Day[]
): Day[] {
  var placeholdersDays = [];

  for (let i = 0; i < firstDay; i++) {
    placeholdersDays.push({
      name: `placeholder-${i}`,
      number: 0,
    });
  }
  return [...placeholdersDays, ...days];
}

/**
 * @description Check whether the day is of the last week (for layout
 *  purposes)
 */
export function isLastWeek(currDay: number, firstDay: number): boolean {
  switch (firstDay) {
    case 1:
      return currDay >= 28 ? true : false;
    case 2:
      return currDay >= 27 ? true : false;
    case 3:
      return currDay >= 26 ? true : false;
    case 4:
      return currDay >= 25 ? true : false;
    case 5:
      return currDay >= 31 ? true : false;
    case 6:
      return currDay >= 30 ? true : false;
    case 0:
      return currDay >= 29 ? true : false;
    default:
      return false;
  }
}

/**
 *  @description Get the time in clock-like format
 */
export function getDigitalTime(time: number): string {
  const hours = new Date(time).getHours();
  const minutes = new Date(time).getMinutes();

  return `${hours}:${minutes <= 9 ? minutes + "0" : minutes}`;
}
