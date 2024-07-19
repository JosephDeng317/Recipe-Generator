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

// app.use(express.static(path.join(__dirname, "../dist")));
// app.use(express.static(path.join(__dirname, "public")));

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, "../dist")));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "../src/public")));

// Serve node_modules directory
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

async function sendIngredients(ingredients) {
  const prompt =
    ingredients +
    ", provide some recipes that can be created using these items, assume that we have access to salt and pepper as seasoning, but if more seasoning should be added please specify. Note that not all of the ingredients have to be used, for example, if there are 6 eggs, it is okay to just use 3 eggs but please specify in the ingredients list. Return the recipes as a JSON object and please use this format {title: 'title', ingredients: ['i1', 'i2'], instructions: 'instructions'}";
  const data = await getResponse(prompt);
  console.log("Data from getResponse:", data);
  return data;
}

app.get("*", (req, res) => {
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

  try {
    console.log("Received request for generating recipes");
    const data = await sendIngredients(ingredientsWithQuantities);
    console.log("Generated recipes:", data);

    const gen_recipes = data["recipes"];
    console.log(gen_recipes);

    res.render("recipe-display", {
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
