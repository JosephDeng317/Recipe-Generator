/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/public/script.js":
/*!******************************!*\
  !*** ./src/public/script.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// Find the element where you want to display the string\nvar displayArea = document.getElementById(\"recipeContainer\");\nvar submitButton = document.getElementById(\"submitIngredients\");\nsubmitButton.addEventListener(\"click\", postIngredients);\nfetch(\"http://localhost:3000/api/generate-recipes\").then(function (response) {\n  return response.json();\n}).then(function (data) {\n  // const dataContainer = document.getElementById('dataContainer');\n  // dataContainer.innerHTML = JSON.stringify(data, null, 2); // Convert data to JSON string for display\n  var recipeContainer = document.getElementById(\"recipeContainer\");\n  recipeContainer.innerHTML = \"\";\n  data.recipes.forEach(function (recipe, index) {\n    var recipeDiv = document.createElement(\"div\");\n    recipeDiv.classList.add(\"recipe\");\n    var recipeNumber = document.createElement(\"p\");\n    recipeNumber.innerHTML = \"Recipe \".concat(index + 1, \":\");\n    var recipeName = document.createElement(\"p\");\n    recipeName.innerHTML = recipe.name;\n    var recipeIngredients = document.createElement(\"p\");\n    recipeIngredients.innerHTML = recipe.ingredients;\n    var recipeInstructions = document.createElement(\"p\");\n    recipeInstructions.innerHTML = recipe.instructions;\n    recipeContainer.appendChild(recipeNumber);\n    recipeContainer.appendChild(recipeName);\n    recipeContainer.appendChild(recipeIngredients);\n    recipeContainer.appendChild(recipeInstructions);\n  });\n});\nfunction addMore() {\n  var container = document.getElementById(\"ingredientContainer\");\n  var newGroup = document.createElement(\"div\");\n  newGroup.className = \"form-group\";\n  newGroup.innerHTML = \"\\n        <label for=\\\"ingredient\\\">Ingredient</label>\\n        <input type=\\\"text\\\" name=\\\"ingredient[]\\\" placeholder=\\\"Enter ingredient\\\" required>\\n        <label for=\\\"quantity\\\">Quantity</label>\\n        <input type=\\\"text\\\" name=\\\"quantity[]\\\" placeholder=\\\"Enter quantity\\\" required>\\n    \";\n  container.appendChild(newGroup);\n}\nfunction showForm() {\n  document.getElementById(\"showFormButton\").classList.add(\"hidden\");\n  document.getElementById(\"hoverIcon\").classList.add(\"hidden\");\n  document.getElementById(\"form\").classList.remove(\"hidden\");\n  var hoverIcon = document.getElementById(\"hoverIcon\");\n}\nfunction hideForm() {\n  document.getElementById(\"showFormButton\").classList.remove(\"hidden\");\n  document.getElementById(\"hoverIcon\").classList.remove(\"hidden\");\n  document.getElementById(\"form\").classList.add(\"hidden\");\n  var hoverIcon = document.getElementById(\"hoverIcon\");\n}\n\n//# sourceURL=webpack://recipe-generator/./src/public/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/public/script.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;