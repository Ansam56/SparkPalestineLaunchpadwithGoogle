import { isValidURL } from "../URLChecker";

describe("URL Validation", () => {
  test("Valid URL with http", () => {
    expect(isValidURL("http://example.com")).toBe(true);
  });

  test("Valid URL with https", () => {
    expect(isValidURL("https://example.com")).toBe(true);
  });

  test("Invalid URL without protocol", () => {
    expect(isValidURL("example.com")).toBe(false);
  });

  test("Invalid URL with incorrect format", () => {
    expect(isValidURL("http://")).toBe(false);
  });

  test("Invalid URL with random string", () => {
    expect(isValidURL("invalid-url")).toBe(false);
  });
});
