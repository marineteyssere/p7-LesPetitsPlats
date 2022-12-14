/***********  Algo boucles native  ***************/
import recipes from "./recipes.js" 

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
    data = data.split(" ").join("-");
    data = data.replace("'","-");
    return data;
}


/** Construit les recettes **/
function construitRecette(id, nom, personne, temps, ingredients, description, appliance, ustensils) {
    /* Récupère les recettes et créer l'élément */
    let listeRecettes = document.getElementById("recettes");
    let recette = document.createElement("article");
    recette.setAttribute("id", `${id}`);
    recette.setAttribute("data-nom", `${nom}`);
    recette.classList.add("recette");
    ingredients.forEach(ingredient => recette.classList.add(("ingredients-"+space(ingredient.ingredient))));
    recette.classList.add("appliance-"+space((`${appliance || "nul"}`)))
    ustensils.forEach(ustensil => recette.classList.add(("ustensils-"+space(ustensil))));
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

/*const ingredients = []
const ustensils = []
const appliances = []*/

recipes.forEach(recipe => {
  recipe.ingredients.forEach(ingredient => {
    const exists =
      ingredients.findIndex(
        element => element.ingredient === ingredient.ingredient
      ) > -1

    if (!exists) {
      ingredients.push(ingredient)
    }
  })

  recipe.appliance.forEach(appliance => {
    const exists =
    appliance.findIndex(
        element => element.appliance === appliance.appliance
      ) > -1

    if (!exists) {
        appliance.push(appliance)
    }
  })

  recipe.ustensils.forEach(ustensils => {
    const exists =
      ustensils.findIndex(
        element => element.ustensils === ustensils.ustensils
      ) > -1

    if (!exists) {
        ustensils.push(ustensils)
    }
  })
})

console.log(ingredients)
console.log(appliances)
console.log(ustensils)

function listeFiltres(type, recipes) {
    let liste = [];
    /* Ajoute dans un tableau les données selon le type */
    recipes.forEach(recipe => {
        switch(type) {
            case "ingredient":
                `${recipe.ingredient.map(data => 
                    liste.push((
                        `${data.ingredient}`
                    ))
                ).join("")}`;
                break;
            case "appliance":
                `${recipe.appliance.map(data => 
                    liste.push((
                        `${data.appliance}`
                    ))
                ).join("")}`;
                break;
            case "ustensils":
                `${recipe.ustensils.map(data => 
                    liste.push((
                        `${data}`
                    ))
                ).join("")}`;
                break;
            default:
                break;
        }
    });
    /* Supprime les doublons */
    let filtres = [...new Set(liste)];
    return filtres;
    
}

let ingredients = listeFiltres("ingredient", recipes);
let appliances = listeFiltres("appliance", recipes);
let ustensils = listeFiltres("ustensils", recipes);


/* Tri par ordre alphabétique 
liste = liste.sort((a, b) => a.localeCompare(b));
/* Insert en éliminant les doublons dans le DOM 
new Set(liste).forEach((data) => {
    nom = ((data));
    document.getElementById("liste-filtre-"+type).insertAdjacentHTML("beforeend", `<li class="nom-filtre" id="${type}-${nom}" data-type="${type}" data-nom="${data}" onclick="ajouteFiltre('${type}', '${nom}')">${data}</li>`);
});*/