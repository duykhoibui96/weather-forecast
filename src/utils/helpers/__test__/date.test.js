import { DAYS_OF_WEEK } from "../../../constants";
import { parseDate } from "../date";

const DATE_OF_WEEK_KEY_MAPPINGS = Object.keys(DAYS_OF_WEEK).reduce(
  (obj, key) => {
    obj[key] = key;

    return obj;
  },
  {}
);

describe("utils/helpers/date.js", () => {
  describe("parseDate", () => {
    it("should return null when input date is invalid", () => {
      const invalidInputDates = [null, undefined, "Hello world", Symbol(), {}];

      invalidInputDates.forEach((invalidInputDate) => {
        expect(parseDate(invalidInputDate)).toBeNull();
      });
    });

    it("should return valid date object if the input data is valid", () => {
      const firstValidDateString = "2021-10-10";
      expect(parseDate(firstValidDateString)).toEqual({
        date: "10/10",
        dayOfWeek: DATE_OF_WEEK_KEY_MAPPINGS.SUNDAY,
      });

      const secondValidDateString = "2021-10-05T16:39:46.578490Z";
      expect(parseDate(secondValidDateString)).toEqual({
        date: "05/10",
        dayOfWeek: DATE_OF_WEEK_KEY_MAPPINGS.TUESDAY,
      });
    });
  });
});
