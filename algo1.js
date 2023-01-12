/***********  Algo boucles native  ***************/
import recipes from "./recipes.js" 

let ingredients = []
let ustensils = []
let appliances = []


displayData(recipes);

function displayData (recipes) {
    recipes.forEach(recipe => { 
        let idRecette = recipe["id"];
        let nomRecette = recipe["name"];
        let personneRecette = recipe["servings"];
        let tempsRecette = recipe["time"];
        let ingredientsRecette = recipe["ingredients"];
        let descriptionRecette = recipe["description"];
        let appareilsRecette = recipe["appliance"];
        let ustensilesRecette = recipe["ustensils"];
        construitRecette(idRecette, nomRecette, personneRecette, tempsRecette, ingredientsRecette, descriptionRecette, appareilsRecette, ustensilesRecette);
    });  
}
/*** Gère les espaces ***/
function space(data) {
  
    data = data.replace(" ", "-");
    data = data.replace("'","-");
    return data;
}

/** Construit les recettes **/
function construitRecette(id, nom, temps, ingredients, description, appliance, ustensils) {
  /* Récupère les recettes et créer l'élément */
  let listeRecettes = document.getElementById("recettes");
  let recette = document.createElement("article");
  recette.setAttribute("id", `${id}`);
  recette.setAttribute("data-nom", `${nom}`);
  recette.classList.add("recette");
  if (Array.isArray(ingredients)) {
    for (let i = 0; i < ingredients.length; i++) {
      let ingredient = ingredients[i];
      if (typeof ingredient === "object") {
        recette.classList.add(("ingredients-" + space(ingredient.ingredient)));
      }
    }
  }

  // Modification pour éviter l'erreur de DOMException
  let applianceName = appliance || "null";
  applianceName = applianceName.replace(/[^a-zA-Z0-9-_]/g, ''); // supprime tous les caractères autres que alphanumériques et tirets
  const token = `appliance-${space(applianceName)}`;
  recette.classList.add(token);

  if (ustensils instanceof Array) {
    ustensils.forEach(ustensil => recette.classList.add(("ustensils-" + space(ustensil))));
  } else {
    // ustensils n'est pas un tableau, traitez-le comme tel
  }
  /* Créer le template */
  let recetteTemplate = `
      <div class="image-recette"></div>
      <div class="contenu-recette">
          <h1 class="titre-recette">${nom}</h1>
          <span class="temps-preparation">${temps}</span>
          <div class="liste-ingredient">
              ${ingredients.map(ingredient =>
                  `<span class="type-ingredient">${ingredient}<span class="nombre-ingredient">${ingredient.quantity || ''}${ingredient.quantite || ''} ${ingredient.unit || ''}</span></span>`
              ).join(" ")}
          </div>
          <div class="description-recette">
              <p>${description}</p>
          </div>
      </div>
  `;
  recette.innerHTML = recetteTemplate;
  listeRecettes.appendChild(recette);
}


/** Liste des recettes **/
let recettes = document.querySelectorAll(".recette");


/*** Gère les filtres ***/

recipes.forEach(recipes => {
  // Vérifie si l'objet "ingredients" existe déjà dans le tableau "ingredients"
  const exists = ingredients.some(
    element => element.ingredients === recipes.ingredients
  );

  // Si l'objet "ingredients" n'existe pas dans le tableau, on l'ajoute
  if (!exists) {
    ingredients.push(recipes.ingredients);
  }
});

// Vérifie si l'objet "appliances" existe déjà dans le tableau "appliances"
const applianceExists = appliances.some(
  element => element.appliance === recipes.appliances
);

// Si l'objet "appliances" n'existe pas dans le tableau, on l'ajoute
if (!applianceExists) {
  appliances.push(recipes.appliances);
}

// Trouve l'index de l'objet "appliances" dans le tableau "appliances"
const applianceIndex = appliances.findIndex(
  element => element.appliance === recipes.appliances
);

// Si l'objet "appliances" n'a pas été trouvé, on l'ajoute au tableau
if (applianceIndex === -1) {
  appliances.push(recipes.appliances);
}


// Appliance n'est pas un tableau et ne nécessite pas de boucle

recipes.forEach(recipe => {
  // Trouve l'index de l'objet "ustensils" dans le tableau "ustensils"
  const exists = ustensils.findIndex(
    element => element.ustensils === recipe.ustensils
  );

  // Si l'objet "ustensils" n'a pas été trouvé, on l'ajoute au tableau
  if (!exists) {
    ustensils.push(recipe.ustensils);
  }
});



console.log(ingredients);
console.log(appliances);
console.log(ustensils);


/* Tri par ordre alphabétique 
liste = liste.sort((a, b) => a.localeCompare(b));
/* Insert en éliminant les doublons dans le DOM 
new Set(liste).forEach((data) => {
    nom = ((data));
    document.getElementById("liste-filtre-"+type).insertAdjacentHTML("beforeend", `<li class="nom-filtre" id="${type}-${nom}" data-type="${type}" data-nom="${data}" onclick="ajouteFiltre('${type}', '${nom}')">${data}</li>`);
});*/