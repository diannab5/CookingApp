import {pushFavouritesRecipes} from '../helpers/pushFavouritesRecipes';

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


test("pushFavouritesRecipes returns an array", () => {
  const result = pushFavouritesRecipes(state);
  expect(Array.isArray(result)).toBe(true);
});

test("pushFavouritesRecipes returns an array with a length matching the number of recipes", () => {
  const result = pushFavouritesRecipes(state);
  expect(result.length).toEqual(2);
});

test("pushFavouritesRecipes returns an empty array when there are no recipes", () => {
  const result = pushFavouritesRecipes({});
  expect(result.length).toEqual(0);
});