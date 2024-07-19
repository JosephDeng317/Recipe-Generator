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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\n\n// Find the element where you want to display the string\nvar displayArea = document.getElementById(\"recipeContainer\");\nvar submitButton = document.getElementById(\"submitIngredients\");\nsubmitButton.addEventListener(\"click\", postIngredients);\nfetch(\"http://localhost:3000/api/generate-recipes\").then(function (response) {\n  return response.json();\n}).then(function (data) {\n  // const dataContainer = document.getElementById('dataContainer');\n  // dataContainer.innerHTML = JSON.stringify(data, null, 2); // Convert data to JSON string for display\n  var recipeContainer = document.getElementById(\"recipeContainer\");\n  recipeContainer.innerHTML = \"\";\n  data.recipes.forEach(function (recipe, index) {\n    var recipeDiv = document.createElement(\"div\");\n    recipeDiv.classList.add(\"recipe\");\n    var recipeNumber = document.createElement(\"p\");\n    recipeNumber.innerHTML = \"Recipe \".concat(index + 1, \":\");\n    var recipeName = document.createElement(\"p\");\n    recipeName.innerHTML = recipe.name;\n    var recipeIngredients = document.createElement(\"p\");\n    recipeIngredients.innerHTML = recipe.ingredients;\n    var recipeInstructions = document.createElement(\"p\");\n    recipeInstructions.innerHTML = recipe.instructions;\n    recipeContainer.appendChild(recipeNumber);\n    recipeContainer.appendChild(recipeName);\n    recipeContainer.appendChild(recipeIngredients);\n    recipeContainer.appendChild(recipeInstructions);\n  });\n});\nfunction addMore() {\n  var container = document.getElementById(\"ingredientContainer\");\n  var newGroup = document.createElement(\"div\");\n  newGroup.className = \"form-group\";\n  newGroup.innerHTML = \"\\n        <label for=\\\"ingredient\\\">Ingredient</label>\\n        <input type=\\\"text\\\" name=\\\"ingredient[]\\\" placeholder=\\\"Enter ingredient\\\" required>\\n        <label for=\\\"quantity\\\">Quantity</label>\\n        <input type=\\\"text\\\" name=\\\"quantity[]\\\" placeholder=\\\"Enter quantity\\\" required>\\n    \";\n  container.appendChild(newGroup);\n}\nfunction showForm() {\n  document.getElementById(\"showFormButton\").classList.add(\"hidden\");\n  document.getElementById(\"hoverIcon\").classList.add(\"hidden\");\n  document.getElementById(\"form\").classList.remove(\"hidden\");\n  var hoverIcon = document.getElementById(\"hoverIcon\");\n}\nfunction hideForm() {\n  document.getElementById(\"showFormButton\").classList.remove(\"hidden\");\n  document.getElementById(\"hoverIcon\").classList.remove(\"hidden\");\n  document.getElementById(\"form\").classList.add(\"hidden\");\n  var hoverIcon = document.getElementById(\"hoverIcon\");\n}\n\n// Ensure DOM is loaded before executing the script\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  // Create the Scene, Camera, and Renderer\n  var scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();\n  var camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);\n  var renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer();\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  document.body.appendChild(renderer.domElement);\n\n  // Add a Cube\n  var geometry = new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry();\n  var material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({\n    color: 0x00ff00\n  });\n  var cube = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material);\n  scene.add(cube);\n  camera.position.z = 5;\n\n  // Animation Loop\n  function animate() {\n    requestAnimationFrame(animate);\n    cube.rotation.x += 0.01;\n    cube.rotation.y += 0.01;\n    renderer.render(scene, camera);\n  }\n  animate();\n});\n\n//# sourceURL=webpack://recipe-generator/./src/public/script.js?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/public/script.js");
/******/ 	
/******/ })()
;