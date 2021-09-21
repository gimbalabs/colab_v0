import { monthsByName } from "common/types/calendarTypes";
import { Auth } from "../services/Api/Auth";
import { getFromEncryptedStorage } from "./encryptedStorage";
import { signChallenge } from "./tweetnacl";
import base64 from "base64-js";

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

  for (; numOfWeeks > 0; numOfWeeks--) {
    daysArray.push(
      new Date(year, monthsByName[month], firstDayToSelect).getTime()
    );
    firstDayToSelect = firstDayToSelect + 7;
  }

  return daysArray;
};

/**
 * Starts challenge sequence to obtain JWT from the server.
 * Returns {id, username, accessToken, expiresIn} or  `null` if failed.
 *
 * @param credential
 * @returns jwt | null
 */
export const startChallengeSequence = async (
  credential: string,
  isSigningUp: boolean
): Promise<{ [index: string]: string } | null> => {
  try {
    let res = await Auth.requestChallenge({ credential });
    let { challengeString } = res;
    let secretKey = await getFromEncryptedStorage("secret");

    if (challengeString && secretKey) {
      let signature: any = await signChallenge(challengeString, secretKey);

      if (signature) {
        signature = base64.fromByteArray(signature);

        // request JWT
        let res = await Auth.requestAccessToken(
          challengeString,
          signature,
          isSigningUp ? { id: credential } : { publicKey: credential }
        );
        if (res) return res;
      }
    }

    return null;
  } catch (e) {
    throw new Error(e.message);
  }
};
