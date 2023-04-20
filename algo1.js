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

/* Evenements */

// barre.addEventListener("input", function() {
//   const value = barre.value.toLowerCase();
//   recettes.forEach(function(recette) {
//   if (recette.getAttribute("data-nom").toLowerCase().includes(value.length >= 3)) {
//   recette.style.display = "block";
//   } else {
//   recette.style.display = "none";
//   }
//   });
//   });

//   const filtresselect = document.querySelector(".nom-filtre");
//   filtresselect.addEventListener("click", function() {
//     console.log("cliiiiick")
//     ajouteFiltre("fruit","banane")
//     });

// /** Ajoute le filtre des choisis **/
// let tableauFiltresChoisis = [];
// let tableauFiltresChoisisID = [];
// function ajouteFiltre(type, nom) {
//     tableauFiltresChoisisID = [];
//     tableauFiltresChoisis.push(type+"-"+nom);
//     let nomID = kebabCase(nom);
//     let nomAfficher = nom.replaceAll("-", " ");
//     document.getElementById("filtres-choisis").insertAdjacentHTML("beforeend", `<span class="filtre filtre-${type}" id="filtre-${type}-${nomID}">${nomAfficher}<i class="far fa-times-circle" onclick="supprimeFiltre('${type}', '${nom}')"></i></span>`);
//     let listeFiltresNom = document.querySelectorAll(".nom-filtre");
//     switch(type) {
//         /* Si le filtre est un ingrédient */
//         case "ingredients":
//             document.getElementById("champ-ingredients").value = "";
//             recettes.forEach(function (recette) {
//                 if(tableauRechercheID.includes("VIDE") === true) {
//                     if(recette.classList.contains("ingredients-"+kebabCase(nom))) {
//                         document.getElementById(recette.id).classList.add("recette-afficher");
//                     } else {
//                         document.getElementById(recette.id).classList.remove("recette-afficher");
//                         document.getElementById(recette.id).classList.add("recette-cacher");
//                     }
//                 } else {
//                     tableauRechercheID.forEach(rechercheID => {
//                         if(recette.id === rechercheID.toString()) {
//                             tableauFiltresChoisis.forEach(item => {
//                                 if (document.getElementById(recette.id).classList.contains(item) && recette.classList.contains("recette-afficher")) {
//                                     document.getElementById(recette.id).classList.remove("recette-cacher");
//                                     document.getElementById(recette.id).classList.add("recette-afficher");
//                                 } else {
//                                     document.getElementById(recette.id).classList.remove("recette-afficher");
//                                     document.getElementById(recette.id).classList.add("recette-cacher");
//                                 }
//                             });
//                         }
//                     });
//                 }
//             });
//             break;
//         /* Si le filtre est un appareil */
//         case "appliance":
//             document.getElementById("champ-appliance").value = "";
//             recettes.forEach(function (recette) {
//                 if(tableauRechercheID.includes("VIDE") === true) {
//                     if(recette.classList.contains("appliance-"+kebabCase(nom))) {
//                         document.getElementById(recette.id).classList.add("recette-afficher");
//                     } else {
//                         document.getElementById(recette.id).classList.remove("recette-afficher");
//                         document.getElementById(recette.id).classList.add("recette-cacher");
//                     }
//                 } else {
//                     tableauRechercheID.forEach(rechercheID => {
//                         if(recette.id === rechercheID.toString()) {
//                             tableauFiltresChoisis.forEach(item => {
//                                 if (document.getElementById(recette.id).classList.contains(item) && recette.classList.contains("recette-afficher")) {
//                                     document.getElementById(recette.id).classList.remove("recette-cacher");
//                                     document.getElementById(recette.id).classList.add("recette-afficher");
//                                 } else {
//                                     document.getElementById(recette.id).classList.remove("recette-afficher");
//                                     document.getElementById(recette.id).classList.add("recette-cacher");
//                                 }
//                             });
//                         }
//                     });
//                 }
//             });
//             break;
//         /* Si le filtre est un ustensile */
//         case "ustensils":
//             document.getElementById("champ-ustensils").value = "";
//             recettes.forEach(function (recette) {
//                 if(tableauRechercheID.includes("VIDE") === true) {
//                     if(recette.classList.contains("ustensils-"+kebabCase(nom))) {
//                         document.getElementById(recette.id).classList.add("recette-afficher");
//                     } else {
//                         document.getElementById(recette.id).classList.remove("recette-afficher");
//                         document.getElementById(recette.id).classList.add("recette-cacher");
//                     }
//                 } else {
//                     tableauRechercheID.forEach(rechercheID => {
//                         if(recette.id === rechercheID.toString()) {
//                             tableauFiltresChoisis.forEach(item => {
//                                 if (document.getElementById(recette.id).classList.contains(item) && recette.classList.contains("recette-afficher")) {
//                                     document.getElementById(recette.id).classList.remove("recette-cacher");
//                                     document.getElementById(recette.id).classList.add("recette-afficher");
//                                 } else {
//                                     document.getElementById(recette.id).classList.remove("recette-afficher");
//                                     document.getElementById(recette.id).classList.add("recette-cacher");
//                                 }
//                             });
//                         }
//                     });
//                 }
//             });
//             break;
//         default:
//             break;
//     }

//      /* Vérifie si une recette est affichée */
//      let recettesAfficher = document.querySelectorAll(".recette:not(.recette-cacher)");
//      recettesAfficher.forEach(recetteAfficher => {
//          tableauFiltresChoisisID.push(recetteAfficher.getAttribute("id"))
//      });
//      listeFiltresNom.forEach(filtre => {
//          filtre.classList.remove("nom-filtre-afficher");
//          filtre.style.display = "none";
//      });
//      tableauFiltresChoisisID.forEach(id => {
//          listeFiltresNom.forEach(filtre => {
//              if(document.getElementById(id).classList.contains(filtre.getAttribute("id"))) {
//                  document.getElementById(filtre.getAttribute("id")).classList.add("nom-filtre-afficher");
//                  filtre.style.display = "block";
//              }
//          });
//      });
//      if(recettesAfficher.length === 0) {
//          document.getElementById("aucun-resultat").classList.add("aucun-resultat-afficher");
//      } else {
//          document.getElementById("aucun-resultat").classList.remove("aucun-resultat-afficher");
//      }
//      /* Cache le filtre si cliqué */
//      document.getElementById(type+"-"+nom).classList.remove("nom-filtre-afficher");
//      document.getElementById(type+"-"+nom).classList.add("nom-filtre-cacher-choisis");
//      document.getElementById(type+"-"+nom).style.display = "none";
//  }

//  /** Gère la barre de recherche dans les filtres **/
//  let tableauIngredients = [];
//  let tableauAppareils = [];
//  let tableauUstensiles = [];
//  listeIngredients.forEach(ingredient => {
//      tableauIngredients.push(ingredient.getAttribute("data-nom"));
//  });
//  listeAppareils.forEach(appareil => {
//      tableauAppareils.push(appareil.getAttribute("data-nom"));
//  });
//  listeUstensils.forEach(ustensil => {
//      tableauUstensiles.push(ustensil.getAttribute("data-nom"));
//  });
//  function rechercherFiltre(type, tableau) {
//      let listeType = document.querySelectorAll("[data-type='"+type+"']");
//      champFiltres = document.querySelector("#champ-"+type);
//      /* Suit ce que l'utilisateur rentre */
//      champFiltres.addEventListener("keyup", (e) => {
//          let rechercheValeur = normalizer(e.target.value);
//          /* Si la recherche dépasse 1 caractère */
//          if(rechercheValeur.length >= 1) {
//              tableauFiltres = tableau;
//              let resultatRecherche = tableauFiltres.filter((app) => {
//                  return(
//                      normalizer(app).includes(rechercheValeur)
//                  );
//              });
//              /* Si aucun filtre n'a été choisi ni de recherche */
//              if(tableauFiltresChoisis.length === 0 && tableauRechercheID.includes("VIDE") === true) {
//                  /* Cache les filtres */
//                  listeType.forEach(element => {
//                      element.classList.remove("nom-filtre-afficher");
//                      element.classList.add("nom-filtre-cacher");
//                      element.style.display = "none";
//                  });
//                  /* Affiche ceux correspondant à la recherche */
//                  resultatRecherche.forEach(filtreCorrespondant => {
//                      listeType.forEach(element => {
//                          if(filtreCorrespondant === element.getAttribute("data-nom")) {
//                              element.classList.remove("nom-filtre-cacher");
//                              element.classList.add("nom-filtre-afficher");
//                              element.style.display = "block";
//                          }
//                      });
//                  });
//              } else {
//                  listeType.forEach(element => {
//                      element.classList.remove("nom-filtre-afficher");
//                      element.classList.add("nom-filtre-cacher");
//                      element.style.display = "none";
//                  });
//                  resultatRecherche.forEach(filtreCorrespondant => {
//                      let classe = type+"-"+normalizer(kebabCase(filtreCorrespondant));
//                      recettes.forEach(function (recette) {
//                          if(recette.classList.contains("recette-afficher") && recette.classList.contains(classe)) {
//                              document.getElementById(classe).classList.add("nom-filtre-afficher");
//                              document.getElementById(classe).style.display = "block";
//                          }
//                      });
//                  });
//              }
//          /* Sinon ré-affiche les filtres */
//          } else {
//              if(tableauFiltresChoisis.length === 0 && tableauRechercheID.includes("VIDE") === true) {
//                  listeType.forEach(element => {
//                      element.classList.remove("nom-filtre-cacher");
//                      element.classList.add("nom-filtre-afficher");
//                      element.style.display = "block";
//                  });
//              } else {
//                  recettes.forEach(function (recette) {
//                      recette.classList.forEach(classe => {
//                          if(recette.classList.contains("recette-afficher")) {
//                              if(classe !== "recette") {
//                                  if(document.getElementById(classe) !== null) {
//                                      document.getElementById(classe).classList.add("nom-filtre-afficher");
//                                      document.getElementById(classe).style.display = "block";
//                                  }
//                              }
//                          }
//                      });
//                  });
//              }
//          }
//      })
//  }
//  rechercherFiltre("ingredients", tableauIngredients);
//  rechercherFiltre("appliance", tableauAppareils);
//  rechercherFiltre("ustensils", tableauUstensiles);

/*Fabriquer moi meme les li en parcourant les recettes, supprimer les li dans mon HTML !!!!!!!Les fabriquer dynamiquement en JS
  Voir ressource projet (doc mdn tab)

  Recup recette
  Filtrer tableau selon barre et les tag
  Function Fabriquer recette
  
*/

/* Tri par ordre alphabétique 
liste = liste.sort((a, b) => a.localeCompare(b));
/* Insert en éliminant les doublons dans le DOM 
new Set(liste).forEach((data) => {
    nom = ((data));
    document.getElementById("liste-filtre-"+type).insertAdjacentHTML("beforeend", `<li class="nom-filtre" id="${type}-${nom}" data-type="${type}" data-nom="${data}" onclick="ajouteFiltre('${type}', '${nom}')">${data}</li>`);
});*/
