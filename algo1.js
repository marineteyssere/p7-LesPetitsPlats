// boucles natives 

import recipes from "./recipes.js";

let rechercheIngredient = "";
let rechercheAppareil = "";
let rechercheUstensils = "";

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

// Barre

function matchesString(filterValue) {
 
  const lowerCaseFilterValue = filterValue.toLowerCase();

  return function (recipe) {
    // On cherche dans le nom, la description et les ingrédients
    if (filterValue.length>3) return true
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

// Algo filtre

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
  updateFilter(recipesThatMatch);
  // refresh les filtres
  filtresChoisis.innerHTML = "";
  filtresChoisis.append(
    ...vignettes(selectedIngredients, "ingredients"),
    ...vignettes(selectedUstensils, "ustensiles"),
    ...vignettes(selectedAppliances, "appareils")
  );
}

refresh();


// Gère l'ouverture/ fermeture des filtres

function prepareFiltre(filtre, type) {
    const button = filtre.querySelector("button");
    button.onclick = function () {
      filtre.classList.add("filtre-open");
  
      console.log(filtre.querySelector("input"));
  
      filtre.querySelector("input").oninput = (event) => {
        const value = event.target.value;
  
        switch (type) {
          case "ingredients":
            rechercheIngredient = value;
            break;
          case "appareils":
            rechercheAppareil = value;
            break;
          case "ustensiles":
            rechercheUstensils = value;
            break;
          default:
            break;
        }
  
        refresh();
      };
  
      const chevronFermant = filtre.querySelector(".chevron-ouvert-filtre");
      chevronFermant.onclick = function () {
        filtre.classList.remove("filtre-open");
        button.style.display = "block";
  
        switch (type) {
          case "ingredients":
            rechercheIngredient = "";
            break;
          case "appareils":
            rechercheAppareil = "";
            break;
          case "ustensiles":
            rechercheUstensils = "";
            break;
          default:
            break;
        }
      };
  
      button.style.display = "none";
    };
  }
  

const btnIng = document.querySelector(".filtre-ing");
const btnUst = document.querySelector(".filtre-ust");
const btnApp = document.querySelector(".filtre-app");

prepareFiltre(btnIng, "ingredients");
prepareFiltre(btnUst, "ustensiles");
prepareFiltre(btnApp, "appareils");

/* BOUTONS FILTRES RECHERCHE */


function trierListe(liste) {
  const items = liste.querySelectorAll(".nom-filtre");
  const itemsArr = Array.from(items);
  itemsArr.sort(function(a, b) {
    const aText = a.textContent.toLowerCase();
    const bText = b.textContent.toLowerCase();
    return aText.localeCompare(bText);
  });
  itemsArr.forEach(function(item) {
    liste.removeChild(item);
  });
  itemsArr.forEach(function(item) {
    liste.appendChild(item);
  });
}

/* BOUTONS FILTRES RECHERCHE */


function effacerEspace(data) {
  data = data.split(" ").join("-");
  data = data.replace("'", "-");
  return data;
}

function format(data) {
  data = data.toLowerCase();
  return data;
}
function listeFiltres(recettes, type, recherche) {
    let liste = [];
    console.log(recettes.length, recherche);
    /* Ajoute dans un tableau les données selon le type */
    recettes.forEach((recipe) => {
      switch (type) {
        case "ingredients":
          `${recipe.ingredients
            .map((data) => liste.push(format(`${data.ingredient}`)))
            .join("")}`;
          break;
        case "appareils":
          liste.push(format(`${recipe.appliance}`));
          break;
        case "ustensiles":
          `${recipe.ustensils
            .map((data) => liste.push(format(`${data}`)))
            .join("")}`;
          break;
        default:
          break;
      }
    });
    /* Tri par ordre alphabétique */
    liste = liste.sort((a, b) => a.localeCompare(b));
    if (recherche) {
      liste = liste.filter(
        (mot) => mot.includes(recherche) || recherche.includes(mot)
      );
    } else {
      console.log("no research");
    }
    /* Insert en éliminant les doublons dans le DOM */
    document.getElementById("liste-filtre-" + type).innerHTML = "";
    new Set(liste).forEach((data) => {
      const nom = effacerEspace(format(data));
      const elem = document.createElement("li");
      elem.id = `${type}-${nom}`;
      elem.dataset.type = type;
      elem.classList.add("nom-filtre");
      elem.textContent = data;
  
      document
        .getElementById("liste-filtre-" + type)
        .insertAdjacentElement("beforeend", elem);
    });
  }
  
  function updateFilter(data) {
    listeFiltres(data, "ingredients", rechercheIngredient);
    listeFiltres(data, "appareils", rechercheAppareil);
    listeFiltres(data, "ustensiles", rechercheUstensils);
  }

  refresh()