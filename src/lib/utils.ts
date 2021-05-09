import * as yup from "yup";

import { months } from "common/types";

/**
 * @desc Use this function to validate form input that
 * has to contain only numbers
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
 * @desc This will specify schema for validating organizer
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

export function getNextSixMonthsDays() {
  const currMonth = months[new Date().getMonth()];
  const currDay = new Date().getDay();
  const currYear = new Date().getFullYear();
  const monthsWithDays = [];
  const firstDayIndex = new Date(currYear, currMonth, 1)
  const firstDayName = 

  // loop through 6 next months from the current one
  for (let i = currMonth; i < currMonth + 6; i++) {
    let numOfDays = currDay;
    // check how many days the current month has
    for (let j = 0; isValidDate(j, currMonth, currYear); j++) {
        numOfDays++;
    }
  }
}

export function isValidDate(day: number, month: string, year: number): boolean {
  const dateToCheck = new Date(`${month} ${day}, ${year}`);

  //@ts-ignore
  return dateToCheck == "Invalid Date" ? false : true;
}
