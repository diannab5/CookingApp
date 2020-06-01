import {pushSavedRecipes} from '../helpers/pushSavedRecipes';

const state = {
  1:{title: "Recipe 1", 
  time: "10 minutes", 
  missing: 4, 
  illustration: "image", 
  id: 1,
  summary: "Recipe summary", 
  missedIngredients: ["banana"],
  usedIngredients: ["milk"],
  instructions: "instructions"},
  2:{title: "Recipe 1", 
  time: "10 minutes", 
  missing: 4, 
  illustration: "image", 
  id: 1,
  summary: "Recipe summary", 
  missedIngredients: ["banana"],
  usedIngredients: ["milk"],
  instructions: "instructions"} 
  }


test("pushSavedRecipes returns an array", () => {
  const result = pushSavedRecipes(state);
  expect(Array.isArray(result)).toBe(true);
});

test("pushSavedRecipes returns an array with a length matching the number of recipes", () => {
  const result = pushSavedRecipes(state);
  expect(result.length).toEqual(2);
});

test("pushSavedRecipes returns an empty array when there are no recipes", () => {
  const result = pushSavedRecipes({});
  expect(result.length).toEqual(0);
});