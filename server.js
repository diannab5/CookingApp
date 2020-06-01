require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3001;
const bodyParser = require("body-parser");
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
 

const identifyImage = require('./components/helpers/clarifai_helper');
const getRecipes = require('./components/helpers/spoonacular_helper');

app.use(bodyParser.urlencoded({extended: true, parameterLimit: 100000, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended: true}));

let time; //testing
let cuisine; //testing

var final = [];

io.on("connection", socket => {
  console.log("a user connected :D");
  
  app.get('/', function (req, res) {
    console.log("Made a get request within io connection")
    res.json(final);
  })


  app.post('/', async (req,res) => {
    console.log("Made a post request within io connection")

    const { intolerances, pantry, allergies, diet } = req.body.data.profileState['_55'];
    

     time = req.body.data.state.time;
     cuisine = req.body.data.state.cuisine;
    
    let results = await identifyImage(req.body.data.photo)
    let filtered



    if (results === undefined) {
      filtered = [{ id: 'test',
      name: 'banana'},
      { id: 'test',
      name: 'eggs' },
      { id: 'test',
      name: 'milk' },
      { id: 'test',
      name: 'butter' }]
    } else {
      filtered = results.filter( x => x.value > 0.80 && x.name !== "vegetable" && x.name !== "relish" && x.name !== "sweet" && x.name !== "juice" && x.name !== "pasture" && x.name !== "chocolate" && x.name !== "condiment" && x.name !== "fruit" && x.name !== "citrus" && x.name !== "berry"  && x.name !== "dairy product"  && x.name !== "coffee")
    }
    
  
  
    let ingredients = [];
    for (let item of filtered) {
      ingredients.push(item.name)
    }
    console.log("server: ", ingredients)
    let recipes = await getRecipes(process.env.SPOON_KEY, ingredients, time, cuisine, intolerances, pantry, allergies, diet);
  
    let recipesArray = [];
    recipesArray.push(ingredients)
  
    for(const item of recipes){
      let obj = {title: item.title, time: item.readyInMinutes, missing: item.missedIngredientCount, illustration: item.image, id: item.id, instructions: item.analyzedInstructions, missedIngredients: item.missedIngredients, summary: item.summary, usedIngredients: item.usedIngredients};
      recipesArray.push(obj);
    }
    final = recipesArray;
    io.emit('message', "this is the 4th message");
  })

  
  app.post('/recipes', async (req, res) =>{

    let ingredients = req.body.data.ingredients
    const { intolerances, pantry, allergies, diet } = req.body.data.profileState['_55'];
    console.log(intolerances, 'server')
    let newRecipes = await getRecipes(process.env.SPOON_KEY, ingredients, time, cuisine, intolerances, pantry, allergies, diet);

    let recipesArray = [];
    recipesArray.push(ingredients)
    for(const item of newRecipes){
      let obj = {title: item.title, time: item.readyInMinutes, missing: item.missedIngredientCount, illustration: item.image, id: item.id, instructions: item.analyzedInstructions, missedIngredients: item.missedIngredients, summary: item.summary, usedIngredients: item.usedIngredients};
      recipesArray.push(obj);
    }
    final = recipesArray;

    res.json(final)
  })

});

server.listen(PORT, () => console.log("server running on port:" + PORT));