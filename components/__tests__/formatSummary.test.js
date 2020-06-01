import formatSummary from '../helpers/formatSummary';

const paragraph = "<p>This is a <b>test<b> paragraph<br><p>";

test("formatSummary returns a string", () => {
  const result = formatSummary(paragraph);
  expect(typeof result).toBe("string");
});

test("formatSummary returns a the input string with no html elements", () => {
  const result = formatSummary(paragraph);
  expect(result).toEqual("This is a test paragraph");
});