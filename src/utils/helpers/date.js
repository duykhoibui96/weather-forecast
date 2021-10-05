import isString from "lodash/isString";
import moment from "moment";
import { DAYS_OF_WEEK } from "../../constants";

const DEFAULT_FORMAT_DATE_STRING = "DD/MM";

export function parseDate(
  rawTimeString,
  formatDateString = DEFAULT_FORMAT_DATE_STRING
) {
  if (!rawTimeString || !isString(rawTimeString)) {
    return null;
  }

  const timeObj = moment(rawTimeString);
  if (!timeObj.isValid()) {
    return null;
  }

  return {
    date: timeObj.format(formatDateString),
    dayOfWeek: Object.keys(DAYS_OF_WEEK)[timeObj.day()],
  };
}
