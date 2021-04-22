import * as yup from "yup";

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
 * @desc Specified schema for validating organizer
 *  form inputs values
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
