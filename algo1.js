// boucles natives 

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
  for (let i = 0; i < recipes.length; i++) {
    let recipe = recipes[i];
    let idRecette = recipe["id"];
    let nomRecette = recipe["name"];
    let personneRecette = recipe["servings"];
    let tempsRecette = recipe["time"];
    let ingredientsRecette = recipe["ingredients"];
    let descriptionRecette = recipe["description"];
    let appareilsRecette = recipe["appliance"];
    let ustensilesRecette = recipe["ustensils"];
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
  }
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
    let ingredientsHTML = "";
    for (let i = 0; i < ingredients.length; i++) {
      let ingredient = ingredients[i];
      ingredientsHTML += `<span class="type-ingredient">${ingredient.ingredient}<span class="nombre-ingredient">${
        ingredient.quantity || ""
      }${ingredient.quantite || ""} ${ingredient.unit || ""}</span></span>`;
    }
    recetteTemplate = `
      <div class="image-plat"></div>
      <div class="description-plat">
          <h1 class="titre-plat">${nom}</h1>
          <span class="temps-preparation">${temps}</span>
          <div class="liste-ingredient">
              ${ingredientsHTML}
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

/*** Gère les filtres ***/
recipes.forEach((recipes) => {
  // Vérifie si l'objet "ingredients" existe déjà dans le tableau "ingredients"
  const exists = ingredients.some(
    (element) => element.ingredients === recipes.ingredients
  );

  // Si l'objet "ingredients" n'existe pas dans le tableau, on l'ajoute
  if (!exists) {
    ingredients.push(recipes.ingredients);
  }

  // Vérifie si l'objet "appliances" existe déjà dans le tableau "appliances"
  const applianceExists = appliances.some(
    (element) => element.appliance === recipes.appliance
  );

  // Si l'objet "appliances" n'existe pas dans le tableau, on l'ajoute
  if (!applianceExists) {
    appliances.push(recipes.appliance);
  }
  // Trouve l'index de l'objet "appliances" dans le tableau "appliances"
  const applianceIndex = appliances.findIndex(
    (element) => element === recipes.appliance
  );

  // Si l'objet "appliances" n'a pas été trouvé, on l'ajoute au tableau
  if (applianceIndex === -1) {
    appliances.push(recipes.appliance);
  }

  // Appliance n'est pas un tableau et ne nécessite pas de boucle
});

recipes.forEach((recipe) => {
  // Trouve l'index de l'objet "ustensils" dans le tableau "ustensils"
  const exists = ustensils.findIndex(
    (element) => element.ustensils === recipe.ustensils
  );

  // Si l'objet "ustensils" n'a pas été trouvé, on l'ajoute au tableau
  if (!exists) {
    ustensils.push(recipe.ustensils);
  }
});

function matchesString(filterValue) {
  const lowerCaseFilterValue = filterValue.toLowerCase();

  return function (recipe) {
    // On cherche dans le nom, la description et les ingrédients

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

barre.oninput = function (event) {
  const eventBarre = event.target.value;
  searchbarContent = eventBarre;
  refresh();
};

function matchesKeywords(appliances, ustensils, ingredients) {
  return function (recipe) {
    if (appliances.length > 0) {
      if (appliances.some((item) => item !== recipe.appliance.toLowerCase()))
        return false;
    }

    if (ustensils.length > 0) {
      for (const ustensil of ustensils) {
        if (!recipe.ustensils.some((item) => item.toLowerCase() == ustensil))
          return false;
      }
    }

    if (ingredients.length > 0) {
      for (const ingredient of ingredients) {
        if (
          !recipe.ingredients.find(
            (item) => item.ingredient.toLowerCase() === ingredient
          )
        )
          return false;
      }
    }

    return true;
  };
}


const options = [];
filtres.forEach((filtre) => {
  const li = filtre.querySelectorAll("li");
  li.forEach((elem) => {
    options.push(elem);
  });
});
for (const option of options) {
  option.onclick = function () {
    let type = option.dataset.type;
    let name = option.textContent;
    switch (type) {
      case "ingredients": {
        selectedIngredients.push(name);
        break;
      }
      case "ustensiles": {
        selectedUstensils.push(name);
        break;
      }
      case "appareils": {
        selectedAppliances.push(name);
        break;
      }
    }
    refresh();
  };
}

function vignettes(names, type) {
  const selectedOptionElements = [];
  for (const name of names) {
    const option = document.createElement("div");
    option.classList.add("selected-option");
    option.dataset.type = type;
    option.innerHTML = `${name}<i class="fas fa-times-circle"></i>`;
    option.onclick = () => {
      switch(type){
        case "appareils": {
          selectedAppliances = selectedAppliances.filter(elem=>elem !== name);
          break;
        }
        case "ustensiles": {
          selectedUstensils = selectedUstensils.filter(elem=>elem !== name);
          break;
        }
        case "ingredients": {
          selectedIngredients = selectedIngredients.filter(elem=>elem !== name);
          break;
        }
      }
      refresh()
    };
    selectedOptionElements.push(option);
  }
  return selectedOptionElements;
}

function refresh() {
  console.log("refresh");
  console.log({ selectedIngredients, selectedUstensils, selectedAppliances });
  const recipesThatMatch = recipes
    .filter(
      matchesKeywords(
        selectedAppliances,
        selectedUstensils,
        selectedIngredients
      )
    )
    .filter(matchesString(searchbarContent));
  displayData(recipesThatMatch);
  // refresh les filtres
  filtresChoisis.innerHTML = "";
  filtresChoisis.append(
    ...vignettes(selectedIngredients, "ingredients"),
    ...vignettes(selectedUstensils, "ustensiles"),
    ...vignettes(selectedAppliances, "appareils")
  );
}

refresh();

