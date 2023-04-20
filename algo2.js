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
    console.log({ recipe });
    try {
      construitRecette(
        idRecette,
        nomRecette,
        personneRecette,
        tempsRecette,
        ingredientsRecette,
        descriptionRecette,
        appareilsRecette,
        ustensilesRecette
      );
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

  let recetteTemplate = "";
  if (Array.isArray(ingredients)) {
    recetteTemplate = `
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
    `;
  }
  recette.innerHTML = recetteTemplate;
  console.log("displaying recipe", { recette, ingredients, count: listeRecettes.childElementCount });
  listeRecettes.appendChild(recette);
}
