/***********  Algo boucles native  ***************/
import recipes from "./recipes.js";

let ingredients = [];
let ustensils = [];
let appliances = [];

const barre = document.querySelector("#barre-recherche");
const filtres = document.querySelectorAll(".type-filtre");

const filtreIngredient = filtres[0];

displayData(recipes);

function displayData(recipes) {
  recipes.forEach((recipe) => {
    let idRecette = recipe["id"];
    let nomRecette = recipe["name"];
    let personneRecette = recipe["servings"];
    let tempsRecette = recipe["time"];
    let ingredientsRecette = recipe["ingredients"];
    let descriptionRecette = recipe["description"];
    let appareilsRecette = recipe["appliance"];
    let ustensilesRecette = recipe["ustensils"];
    try{
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
    }catch(e) {
      console.error(e)
    }
  });
}
/*** Gère les espaces ***/
function space(data) {
  data = data.replace(" ", "-");
  data = data.replace("'", "-");
  return data;
}

function construitRecette(
  id,
  nom,
  temps,
  ingredients,
  description,
  appliance,
  ustensils
) {
  /* Récupère les recettes et créer l'élément */
  let listeRecettes = document.getElementById("recettes");
  let recette = document.createElement("article");
  recette.setAttribute("id", `${id}`);
  recette.setAttribute("data-nom", `${nom}`);
  recette.classList.add("recette");

  // Vérifie si ingredients est un tableau avant d'utiliser la fonction map
  if (Array.isArray(ingredients)) {
    ingredients.map((ingredient) => {
      if (typeof ingredient === "object") {
        recette.classList.add("ingredients-" + space(ingredient.ingredient));
      }
    });
  } else {
    console.log("ingredients n'est pas un tableau");
  }

  // Modification pour éviter l'erreur de DOMException
  if (appliance && appliance.length > 0) {
    let applianceName = appliance;
    applianceName = applianceName.replace(/[^a-zA-Z0-9-_]/g, ""); // supprime tous les caractères autres que alphanumériques et tirets
    const token = `appliance-${space(applianceName)}`;
    recette.classList.add(token);
  }

  if (ustensils instanceof Array) {
    ustensils.forEach((ustensil) =>
      recette.classList.add("ustensils-" + space(ustensil))
    );
  } else {
    // ustensils n'est pas un tableau, traitez-le comme tel
  }

  /* Créer le template */
  let recetteTemplate = "";
  if (Array.isArray(ingredients)) {
    recetteTemplate = `
      <div class="image-recette"></div>
      <div class="contenu-recette">
          <h1 class="titre-recette">${nom}</h1>
          <span class="temps-preparation">${temps}</span>
          <div class="liste-ingredient">
              ${ingredients
                .map(
                  (ingredient) =>
                    `<span class="type-ingredient">${ingredient}<span class="nombre-ingredient">${
                      ingredient.quantity || ""
                    }${ingredient.quantite || ""} ${
                      ingredient.unit || ""
                    }</span></span>`
                )
                .join(" ")}
          </div>
          <div class="description-recette">
              <p>${description}</p>
          </div>
      </div>
    `;
  }
  recette.innerHTML = recetteTemplate;
  listeRecettes.appendChild(recette);
}

/** Liste des recettes **/
let recettes = document.querySelectorAll(".recette");

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
  console.log(appliances);
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

console.log(ingredients);
console.log(appliances);
console.log(ustensils);

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
  const recipesThatMatch = recipes.filter(matchesString(eventBarre));
  displayData(recipesThatMatch);
};

function matchesKeywords(appliances, ustensils, ingredients) {
  return function (recipe) {
    if (appliances.length > 0) {
      if (appliances.some((item) => item !== recipe.appliance)) return false;
    }

    if (ustensils.length > 0) {
      for (const ustensil of ustensils) {
        if (!recipe.ustensils.includes(ustensil)) return false;
      }
    }

    if (ingredients.length > 0) {
      for (const ingredient of ingredients) {
        if (!recipe.ingredients.find((item) => item.ingredient === ingredient))
          return false;
      }
    }

    return true;
  };
}

const options = [...filtreIngredient.querySelectorAll("li")];
for (const option of options) {
  console.log("render option", option.textContent)
  option.onclick = function () {
    const recipesThatMatch = recipes.filter(matchesKeywords([], [], [option.textContent]));
    console.log({recipesThatMatch})
    displayData(recipesThatMatch);
  };
}

/* Evenements */

barre.addEventListener("input", function() {
  const value = barre.value.toLowerCase();
  recettes.forEach(function(recette) {
  if (recette.getAttribute("data-nom").toLowerCase().includes(value.length >= 3)) {
  recette.style.display = "block";
  } else {
  recette.style.display = "none";
  }
  });
  });


  
 
  
 




/* Tri par ordre alphabétique 
liste = liste.sort((a, b) => a.localeCompare(b));
/* Insert en éliminant les doublons dans le DOM 
new Set(liste).forEach((data) => {
    nom = ((data));
    document.getElementById("liste-filtre-"+type).insertAdjacentHTML("beforeend", `<li class="nom-filtre" id="${type}-${nom}" data-type="${type}" data-nom="${data}" onclick="ajouteFiltre('${type}', '${nom}')">${data}</li>`);
});*/


