import { countDays } from "./app";

describe("Length of trip", () => {
  test.each([["2024-08-30", "2024-09-2", 2]])(
    "returns correct number of days between %s and %s",
    (start, end, expected) => {
      expect(countDays(start, end)).toBe(expected);
    }
  );
});
