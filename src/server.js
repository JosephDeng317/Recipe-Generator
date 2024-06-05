import { config } from "dotenv";
config();

import OpenAI from "openai";

import fs from "fs/promises"; // Use fs/promises for promise-based file operations
import fetch from "node-fetch";

// server.js
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";

import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000; // Or any port you prefer

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Set the view engine to ejs
app.set("view engine", "ejs");

// Set the directory where the template files are located
app.set("views", path.join(__dirname, "public"));

const apiKey = process.env.API_KEY;
const apiUrl = process.env.API_URL;

const openai = new OpenAI({
  organization: "org-Xo4GFbGVbz8FiZ8OkZsoORqc",
  apiKey: process.env.API_KEY,
});

async function sendFileToOpenAI(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: data }],
    };
    console.log(data);
    await getResponse(payload);
  } catch (err) {
    console.error("Error reading the file:", err);
  }
}

async function getResponse(data) {
  const payload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: data }],
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    const messageContent = responseData.choices[0].message.content;
    console.log("Response from API:", messageContent);
    return JSON.parse(messageContent); // Assuming the response is a JSON string
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function mockGetResponse(prompt) {
  // Simulate an API call with a timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        recipes: [
          {
            title: "Chicken and Broccoli Stir Fry",
            ingredients: [
              "1 Chicken Breast",
              "1 Broccoli",
              "Salt",
              "Pepper",
              "Soy Sauce",
              "Garlic",
            ],
            instructions:
              "Cook chicken, add broccoli, season with salt, pepper, soy sauce, and garlic.",
          },
          {
            title: "Tomato and Lemon Pork Chops",
            ingredients: [
              "2 Pork Chops",
              "3 Tomatoes",
              "1 Lemon",
              "Salt",
              "Pepper",
              "Olive Oil",
            ],
            instructions:
              "Sear pork chops, add tomatoes and lemon juice, season with salt and pepper.",
          },
          // Add more recipes as needed
        ],
      });
    }, 1000);
  });
}

// console.log("Response" + response)

// const data = await getResponse(prompt)

// const data = JSON.parse(jsonData)

async function sendIngredients(ingredients) {
  const prompt =
    ingredients +
    ", provide some recipes that can be created using these items, assume that we have access to salt and pepper as seasoning, but if more seasoning should be added please specify. Note that not all of the ingredients have to be used, for example, if there are 6 eggs, it is okay to just use 3 eggs but please specify in the ingredients list. Return the recipes as a JSON object";
  const data = await getResponse(prompt);
  console.log("Data from getResponse:", data);
  return data;
}

app.get("/api/generate-recipes", async (req, res) => {
  const ingredients = [
    "1 Broccoli",
    "1 Chicken Breast",
    "3 Tomatoes",
    "1 Lemon",
    "2 Pork Chops",
    "4 Potatoes",
    "6 Eggs",
  ];
  // const ingredients = {
  //   'Broccoli' : '1',
  //   'Chicken Breast' : '1',
  //   'Tomatoes' : '3',
  //   'Lemon' : '1',
  //   'Pork Chops' : '2',
  //   'Potatoes' : '4',
  //   'Eggs' : '6',
  // }
  // try {
  //   console.log('Received request for generating recipes');
  //   const data = await sendIngredients(ingredients);
  //   console.log('Generated recipes:', data);
  //   res.json(data);
  // } catch (error) {
  //   console.error('Error generating recipes:', error);
  //   res.status(500).json({ error: 'An error occurred while generating recipes.' });
  // }
});

app.get("/", (req, res) => {
  res.status(200).send("hello");
});

app.post("/submit-ingredients", async (req, res) => {
  const ingredients = req.body.ingredient;
  const quantities = req.body.quantity;
  var ingredientsWithQuantities = [];

  for (let i = 0; i < ingredients.length; i++) {
    ingredientsWithQuantities.push(quantities[i] + " " + ingredients[i]);
  }

  // Handle the data as needed
  console.log("Ingredients:", ingredientsWithQuantities);

  // res.send("Form data received");

  try {
    console.log("Received request for generating recipes");
    const data = await sendIngredients(ingredientsWithQuantities);
    console.log("Generated recipes:", data);

    const gen_recipes = data["recipes"];
    console.log(gen_recipes);

    res.render("recipe-display", {
      title: "Recipes",
      recipes: gen_recipes,
    });
    // res.json(data);
  } catch (error) {
    console.error("Error generating recipes:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating recipes." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Iterate over each recipe and log it to the console
// const recipeContainer = document.getElementById('recipeContainer');
// recipes.forEach((recipe, index) => {
//   console.log(`Recipe ${index + 1}:`);
//   console.log(`Name: ${recipe.name}`);
//   console.log('Ingredients:');
//   recipe.ingredients.forEach(ingredient => {
//     console.log(`- ${ingredient}`);
//   });
//   console.log('Instructions:');
//   console.log(recipe.instructions);
//   console.log('------------------------');
// });

// recipeContainer.textContent = "RECIPES!!"

//getResponse(payload);

// openai.chat.completions.create(payload)
// .then(response => response.json())
// .then(data => {
//     console.log(data);
// }).catch(error => console.error('Error:', error));
