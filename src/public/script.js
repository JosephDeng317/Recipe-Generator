// Find the element where you want to display the string
const displayArea = document.getElementById("recipeContainer");
const submitButton = document.getElementById("submitIngredients");

submitButton.addEventListener("click", postIngredients);

fetch("http://localhost:3000/api/generate-recipes")
  .then((response) => response.json())
  .then((data) => {
    // const dataContainer = document.getElementById('dataContainer');
    // dataContainer.innerHTML = JSON.stringify(data, null, 2); // Convert data to JSON string for display
    const recipeContainer = document.getElementById("recipeContainer");
    recipeContainer.innerHTML = "";

    data.recipes.forEach((recipe, index) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
      const recipeNumber = document.createElement("p");
      recipeNumber.innerHTML = `Recipe ${index + 1}:`;
      const recipeName = document.createElement("p");
      recipeName.innerHTML = recipe.name;
      const recipeIngredients = document.createElement("p");
      recipeIngredients.innerHTML = recipe.ingredients;
      const recipeInstructions = document.createElement("p");
      recipeInstructions.innerHTML = recipe.instructions;
      recipeContainer.appendChild(recipeNumber);
      recipeContainer.appendChild(recipeName);
      recipeContainer.appendChild(recipeIngredients);
      recipeContainer.appendChild(recipeInstructions);
    });
  });

function addMore() {
  var container = document.getElementById("ingredientContainer");
  var newGroup = document.createElement("div");
  newGroup.className = "form-group";
  newGroup.innerHTML = `
        <label for="ingredient">Ingredient</label>
        <input type="text" name="ingredient[]" placeholder="Enter ingredient" required>
        <label for="quantity">Quantity</label>
        <input type="text" name="quantity[]" placeholder="Enter quantity" required>
    `;
  container.appendChild(newGroup);
}

function showForm() {
  document.getElementById("showFormButton").classList.add("hidden");
  document.getElementById("hoverIcon").classList.add("hidden");
  document.getElementById("form").classList.remove("hidden");
  const hoverIcon = document.getElementById("hoverIcon");
}

function hideForm() {
  document.getElementById("showFormButton").classList.remove("hidden");
  document.getElementById("hoverIcon").classList.remove("hidden");
  document.getElementById("form").classList.add("hidden");
  const hoverIcon = document.getElementById("hoverIcon");
}
