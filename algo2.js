import recipes from "./recipes.js";

let ingredients = [];
let ustensils = [];
let appliances = [];
let searchbarContent = "";

let rechercheIngredient = "";

let rechercheAppareil = "";

let rechercheUstensils = "";

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
                    `<span class="type-ingredient">${
                      ingredient.ingredient
                    }<span class="nombre-ingredient">${
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
ingredients = recipes.flatMap((recipe) =>
  recipe.ingredients.map((ingredient) => ingredient.ingredient)
);
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

// Algo filtre

function matchesKeywords(appliances, ustensils, ingredients) {
  return function (recipe) {
    if (appliances.length > 0) {
      if (!appliances.some((item) => item === recipe.appliance.toLowerCase())) {
        return false;
      }
    }

    if (ustensils.length > 0) {
      if (
        !recipe.ustensils.some((item) => ustensils.includes(item.toLowerCase()))
      ) {
        return false;
      }
    }

    if (ingredients.length > 0) {
      if (
        !recipe.ingredients.some((item) =>
          ingredients.includes(item.ingredient.toLowerCase())
        )
      ) {
        return false;
      }
    }

    return true;
  };
}

function makeOptions() {
  const options = Array.from(filtres).flatMap((filtre) =>
    Array.from(filtre.querySelectorAll("li"))
  );

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
}

function vignettes(names, type) {
  return names.map((name) => {
    const option = document.createElement("div");
    option.classList.add("selected-option");
    option.dataset.type = type;
    option.innerHTML = `${name}<i class="fas fa-times-circle"></i>`;
    option.addEventListener("click", () => {
      switch (type) {
        case "appareils":
          selectedAppliances = selectedAppliances.filter(
            (elem) => elem !== name
          );
          break;
        case "ustensiles":
          selectedUstensils = selectedUstensils.filter((elem) => elem !== name);
          break;
        case "ingredients":
          selectedIngredients = selectedIngredients.filter(
            (elem) => elem !== name
          );
          break;
      }
      refresh();
    });
    return option;
  });
}

function refresh() {
  let recipesThatMatch = recipes.filter(
    matchesKeywords(
      selectedAppliances,
      selectedUstensils,
      selectedIngredients
    ).bind(this)
  );
  if (searchbarContent.length > 2) {
    const lowerCaseSearchBarContent = searchbarContent.toLowerCase();
    // barre
    recipesThatMatch = recipesThatMatch.filter((recipe) => {
      return (
        recipe.name.toLowerCase().includes(lowerCaseSearchBarContent) ||
        recipe.description.toLowerCase().includes(lowerCaseSearchBarContent) ||
        recipe.ingredients.some((item) =>
          item.ingredient.toLowerCase().includes(lowerCaseSearchBarContent)
        )
      );
    });
  }
  displayData(recipesThatMatch);
  updateFilter(recipesThatMatch);

  filtresChoisis.innerHTML = "";
  filtresChoisis.append(
    ...vignettes(selectedIngredients, "ingredients"),
    ...vignettes(selectedUstensils, "ustensiles"),
    ...vignettes(selectedAppliances, "appareils")
  );
}

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
  itemsArr.sort(function (a, b) {
    const aText = a.textContent
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const bText = b.textContent
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return aText.localeCompare(bText);
  });
  itemsArr.forEach(function (item) {
    liste.removeChild(item);
  });
  itemsArr.forEach(function (item) {
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
  console.log(recettes.length);
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
  makeOptions()
}

refresh();
