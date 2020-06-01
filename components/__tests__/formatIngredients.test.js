import formatIngredients from '../helpers/formatIngredients';

const missed = ["flour", "sugar", "milk"];
const used = ["banana", "eggs", "butter"];

test("formatIngredients returns an array", () => {
  const result = formatIngredients(missed, used);
  expect(Array.isArray(result)).toBe(true);
});

test("formatIngredients returns an array with a length matching the number of used + missed ingredients", () => {
  const result = formatIngredients(missed, used);
  expect(result.length).toEqual(6);
});

test("formatIngredients returns an empty array when the missed and used ingredients are empty", () => {
  const result = formatIngredients([], [])
  expect(result.length).toEqual(0);
});