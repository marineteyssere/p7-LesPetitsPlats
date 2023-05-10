import recipes from "./recipes.js";

let ingredients = [];
let ustensils = [];
let appliances = [];
let searchbarContent = "";

let selectedIngredients = [];
let selectedUstensils = [];
let selectedAppliances = [];

const listeRecettes = document.getElementById("recettes");
const filtresChoisis = document.querySelector("#filtres-choisis");

const barre = document.querySelector("#barre-recherche");
const filtres = document.querySelectorAll(".type-filtre");

function displayData(recipes) {
  listeRecettes.innerHTML = "";
  recipes.forEach((recipe) => {
    const {
      id: idRecette,
      name: nomRecette,
      servings: personneRecette,
      time: tempsRecette,
      ingredients: ingredientsRecette,
      description: descriptionRecette,
      appliance: appareilsRecette,
      ustensils: ustensilesRecette,
    } = recipe;
    try {
      const recette = construitRecette(
        idRecette,
        nomRecette,
        personneRecette,
        tempsRecette,
        ingredientsRecette,
        descriptionRecette,
        appareilsRecette,
        ustensilesRecette
      );
      listeRecettes.appendChild(recette);
    } catch (e) {
      console.error(e);
    }
  });
}

function construitRecette(
  id,
  nom,
  personne,
  temps,
  ingredients,
  description,
  appliance,
  ustensils
) {
  const recette = document.createElement("article");
  recette.setAttribute("id", `${id}`);
  recette.setAttribute("data-nom", `${nom}`);
  recette.classList.add("plat");

  const recetteTemplate = Array.isArray(ingredients)
    ? `
      <div class="image-plat"></div>
      <div class="description-plat">
          <h1 class="titre-plat">${nom}</h1>
          <span class="temps-preparation">${temps}</span>
          <div class="liste-ingredient">
              ${ingredients
                .map(
                  (ingredient) =>
                    `<span class="type-ingredient">${ingredient.ingredient}<span class="nombre-ingredient">${
                      ingredient.quantity || ""
                    }${ingredient.quantite || ""} ${
                      ingredient.unit || ""
                    }</span></span>`
                )
                .join(" ")}
          </div>
          <div class="recette">
              <p>${description}</p>
          </div>
      </div>
    `
    : "";

  recette.innerHTML = recetteTemplate;
  return recette;
}

displayData(recipes);

/*** Gère les filtres ***/
ingredients = recipes.flatMap((recipe) => recipe.ingredients.map((ingredient) => ingredient.ingredient));
appliances = [...new Set(recipes.map((recipe) => recipe.appliance))];
ustensils = recipes.flatMap((recipe) => recipe.ustensils);

function matchesString(filterValue) {
  const lowerCaseFilterValue = filterValue.toLowerCase();

  return function (recipe) {
    const RecipeName = recipe.name.toLowerCase();
    if (RecipeName.includes(lowerCaseFilterValue)) return true;

    const description = recipe.description.toLowerCase();
    if (description.includes(lowerCaseFilterValue)) return true;

    for (const ingredient of recipe.ingredients) {
      const ingredientName = ingredient.ingredient.toLowerCase();
      if (ingredientName.includes(lowerCaseFilterValue)) return true;
    }

    return false;
  };
}

  barre.addEventListener("input", (event) => {
    const eventBarre = event.target.value;
    searchbarContent = eventBarre;
    refresh();
  });
  
  function matchesKeywords(appliances, ustensils, ingredients) {
    return function (recipe) {
      if (appliances.length > 0) {
        if (!appliances.some((item) => item === recipe.appliance.toLowerCase())) {
          return false;
        }
      }
  
      if (ustensils.length > 0) {
        if (!recipe.ustensils.some((item) => ustensils.includes(item.toLowerCase()))) {
          return false;
        }
      }
  
      if (ingredients.length > 0) {
        if (!recipe.ingredients.some((item) => ingredients.includes(item.ingredient.toLowerCase()))) {
          return false;
        }
      }
  
      return true;
    };
  }
  
  const options = Array.from(filtres).flatMap((filtre) => Array.from(filtre.querySelectorAll("li")));
  
  options.forEach((option) => {
    option.addEventListener("click", () => {
      const type = option.dataset.type;
      const name = option.textContent;
      switch (type) {
        case "ingredients":
          selectedIngredients.push(name);
          break;
        case "ustensiles":
          selectedUstensils.push(name);
          break;
        case "appareils":
          selectedAppliances.push(name);
          break;
      }
      refresh();
    });
  });
  
  function vignettes(names, type) {
    return names.map((name) => {
      const option = document.createElement("div");
      option.classList.add("selected-option");
      option.dataset.type = type;
      option.innerHTML = `${name}<i class="fas fa-times-circle"></i>`;
      option.addEventListener("click", () => {
        switch (type) {
          case "appareils":
            selectedAppliances = selectedAppliances.filter((elem) => elem !== name);
            break;
          case "ustensiles":
            selectedUstensils = selectedUstensils.filter((elem) => elem !== name);
            break;
          case "ingredients":
            selectedIngredients = selectedIngredients.filter((elem) => elem !== name);
            break;
        }
        refresh();
      });
      return option;
    });
  }
  
  function refresh() {
    const recipesThatMatch = recipes.filter(matchesKeywords(selectedAppliances, selectedUstensils, selectedIngredients).bind(this));
    if (searchbarContent.length > 0) {
      const lowerCaseSearchBarContent = searchbarContent.toLowerCase();
      recipesThatMatch.filter((recipe) => {
        return (
          recipe.name.toLowerCase().includes(lowerCaseSearchBarContent) ||
          recipe.description.toLowerCase().includes(lowerCaseSearchBarContent) ||
          recipe.ingredients.some((item) => item.ingredient.toLowerCase().includes(lowerCaseSearchBarContent))
        );
      });
    }
    displayData(recipesThatMatch);
  
    filtresChoisis.innerHTML = "";
    filtresChoisis.append(
      ...vignettes(selectedIngredients, "ingredients"),
      ...vignettes(selectedUstensils, "ustensiles"),
      ...vignettes(selectedAppliances, "appareils")
    );
  }
  