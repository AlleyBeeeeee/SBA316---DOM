// caching elements
const recipeForm = document.getElementById("recipe-form");
const cardContainer = document.getElementById("card-container");
const titleInput = document.querySelector("#title");
const ingredientsInput = document.getElementById("ingredients");
const instructionsInput = document.getElementById("instructions");
const pictureInput = document.getElementById("picture");

// store all recipes
const recipes = [];

// render all recipes from the array
function renderRecipes() {
  // prevent duplication
  cardContainer.innerHTML = "";

  // iterate over a collection
  recipes.forEach((recipe) => {
    const fragment = document.createDocumentFragment();
    const newCard = document.createElement("div");

    newCard.classList.add("recipe-card");
    newCard.setAttribute("data-title", recipe.title);

    const cardTitle = document.createElement("h2");
    cardTitle.textContent = recipe.title;

    //  to check if an image exists before creating the element
    if (recipe.pictureUrl) {
      const cardImage = document.createElement("img");
      cardImage.src = recipe.pictureUrl;
      cardImage.classList.add("recipe-image");
      newCard.appendChild(cardImage);
    }

    const cardIngredients = document.createElement("p");
    cardIngredients.classList.add("ingredients-text");

    cardIngredients.textContent = `Ingredients: ${recipe.ingredients}`;

    const cardInstructions = document.createElement("p");
    cardInstructions.classList.add("instructions-text");
    cardInstructions.textContent = `Instructions: ${recipe.instructions}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    newCard.appendChild(cardTitle);
    newCard.appendChild(cardIngredients);
    newCard.appendChild(cardInstructions);
    newCard.appendChild(deleteBtn);

    fragment.appendChild(newCard);
    cardContainer.appendChild(fragment);

    // event listener for the delete button
    deleteBtn.addEventListener("click", (event) => {
      event.target.parentNode.remove();
    });
  });
}

recipeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value;
  const ingredients = ingredientsInput.value;
  const instructions = instructionsInput.value;
  const pictureFile = pictureInput.files[0];

  // validation check
  if (
    title.trim() === "" ||
    ingredients.trim() === "" ||
    instructions.trim() === ""
  ) {
    window.alert("Please fill out all fields!");
    return;
  }

  //image uploader check
  if (pictureFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const pictureUrl = e.target.result;
      const newRecipe = { title, ingredients, instructions, pictureUrl };
      recipes.push(newRecipe);
      renderRecipes();
      recipeForm.reset();
    };
    reader.readAsDataURL(pictureFile);
  } else {
    const newRecipe = { title, ingredients, instructions, pictureUrl: null };
    recipes.push(newRecipe);
    renderRecipes();
    recipeForm.reset();
  }
});
