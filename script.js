// Remove all previous code except for the HTML
// Caching elements
const recipeForm = document.getElementById('recipe-form');
const cardContainer = document.getElementById('card-container');
const titleInput = document.querySelector('#title');
const ingredientsInput = document.getElementById('ingredients');
const instructionsInput = document.getElementById('instructions');
const pictureInput = document.getElementById('picture');

// store all recipes
const recipes = [];

// render all recipes from the array
function renderRecipes() {
    // prevent duplication
    cardContainer.innerHTML = '';
    
    // iterate over a collection
    recipes.forEach(recipe => {
        const fragment = document.createDocumentFragment();
        const newCard = document.createElement('div');
        
        newCard.classList.add('recipe-card');
        newCard.setAttribute('data-title', recipe.title);

        const cardTitle = document.createElement('h2');
        cardTitle.textContent = recipe.title;

        const cardIngredients = document.createElement('p');
        cardIngredients.textContent = `Ingredients: ${recipe.ingredients}`;

        const cardInstructions = document.createElement('p');
        cardInstructions.textContent = `Instructions: ${recipe.instructions}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        
        newCard.appendChild(cardTitle);
        newCard.appendChild(cardIngredients);
        newCard.appendChild(cardInstructions);
        newCard.appendChild(deleteBtn);

        fragment.appendChild(newCard);
        cardContainer.appendChild(fragment);

        // event listener for the delete button
        deleteBtn.addEventListener('click', (event) => {
            event.target.parentNode.remove();
        });
    });
}
recipeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const ingredients = ingredientsInput.value;
    const instructions = instructionsInput.value;

    if (title.trim() === '' || ingredients.trim() === '' || instructions.trim() === '') {
        window.alert("Please fill out all fields!");
        return;
    }

    // Create a new recipe object and add it to the array
    const newRecipe = { title, ingredients, instructions };
    recipes.push(newRecipe);
    renderRecipes();
    recipeForm.reset();
});