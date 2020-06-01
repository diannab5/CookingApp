const getRecipes = require('../helpers/spoonacular_helper');
const axios = require('axios');

jest.mock('axios');

it('returns an array of recipes for given ingredient tags and profile settings', async () => {
  axios.get.mockResolvedValue({
    data: {
      results: [
        {
          title: "Recipe1", 
          id: 1
        },
        {
          title: "Recipe2", 
          id: 2
        }
      ]
    }
  });

  const recipes = await getRecipes("spoonkey", ["tag1", "tag2"], "30 minutes or less", "Italian", null, true, null, "vegan");
  expect(Array.isArray(recipes)).toBe(true);
});

it('returns the correct number of recipes given ingredient tags and profile settings', async () => {
  axios.get.mockResolvedValue({
    data: {
      results: [
        {
          title: "Recipe1", 
          id: 1
        },
        {
          title: "Recipe2", 
          id: 2
        }
      ]
    }
  });

  const recipes = await getRecipes("spoonkey", ["tag1", "tag2"], "30 minutes or less", "Italian", null, true, null, "vegan");
  expect(recipes.length).toEqual(2);
});
