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
/*** Gère les recettes ***/
/** Récupère les données des recettes **/


/** Construit les recettes **/
function construitRecette(id, nom, personne, temps, ingredients, description, appliance, ustensils) {
    /* Récupère les recettes et créer l'élément */
    let listeRecettes = document.getElementById("liste-recettes");
    let recette = document.createElement("article");
    recette.setAttribute("id", `${id}`);
    recette.setAttribute("data-nom", `${nom}`);
    recette.classList.add("recette");
    ingredients.forEach(ingredient => recette.classList.add(("ingredients-"+(ingredient))));
    recette.classList.add("appliance-"((`${appliance}`)))
    ustensils.forEach(ustensil => recette.classList.add(("ustensils-"+(ustensil))));
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
/** Ajoute chaque élément dans la liste des filtres **/
function listeFiltres(type) {
    let liste = [];
    /* Ajoute dans un tableau les données selon le type */
    recipes.forEach(recipe => {
        switch(type) {
            case "ingredients":
                `${recipe.ingredients.map(data => 
                    liste.push((
                        `${data.ingredient}`
                    ))
                ).join("")}`;
                break;
            case "appliance":
                liste.push((
                    `${recipe.appliance}`
                ));
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
    /* Tri par ordre alphabétique */
    liste = liste.sort((a, b) => a.localeCompare(b));
    /* Insert en éliminant les doublons dans le DOM */
    new Set(liste).forEach((data) => {
        nom = ((data));
        document.getElementById("liste-filtre-"+type).insertAdjacentHTML("beforeend", `<li class="nom-filtre" id="${type}-${nom}" data-type="${type}" data-nom="${data}" onclick="ajouteFiltre('${type}', '${nom}')">${data}</li>`);
    });
}