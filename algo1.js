/***********  Algo boucles native  ***************/
async function listeRecette() {
    const listeJS = await fetch("recipes.js") /*Promesse Récupération de données à partir d’un fichier JS*/
    const listeGlobale = await listeJS.js();
    return listeGlobale;
}

async function init() {
    // Récupère les datas 
    const {
        recipes
    } = await listeRecette();
    displayData(recipes);
};

init();


/*** Gère les recettes ***/
/** Récupère les données des recettes **/
recipes.forEach(recipe => { let idRecette = recipe["id"];
    let nomRecette = recipe["name"];
    let personneRecette = recipe["servings"];
    let tempsRecette = recipe["time"];
    let ingredientsRecette = recipe["ingredients"];
    let descriptionRecette = recipe["description"];
    let appareilsRecette = recipe["appliance"];
    let ustensilesRecette = recipe["ustensils"];
    return construitRecette(idRecette, nomRecette, personneRecette, tempsRecette, ingredientsRecette, descriptionRecette, appareilsRecette, ustensilesRecette);
});

/** Construit les recettes **/
function construitRecette(id, nom, personne, temps, ingredients, description, appliance, ustensils) {
    /* Récupère les recettes et créer l'élément */
    let listeRecettes = document.getElementById("liste-recettes");
    let recette = document.createElement("article");
    recette.setAttribute("id", `${id}`);
    recette.setAttribute("data-nom", `${nom}`);
    recette.classList.add("recette");
    ingredients.forEach(ingredient => recette.classList.add(normalizer("ingredients-"+kebabCase(ingredient.ingredient))));
    recette.classList.add("appliance-"+normalizer(kebabCase(`${appliance}`)))
    ustensils.forEach(ustensil => recette.classList.add(normalizer("ustensils-"+kebabCase(ustensil))));
    /* Créer le template */
    let recetteTemplate = `
        <div class="image-recette"></div>
        <div class="contenu-recette">
            <h1 class="titre-recette">${nom}</h1>
            <span class="temps-preparation">${temps}</span>
            <div class="liste-ingredient">
                ${ingredients.map(ingredient =>
                    `<span class="type-ingredient">${ingredient.ingredient}<span class="nombre-ingredient">${ingredient.quantity || ''}${ingredient.quantite || ''} ${ingredient.unit || ''}</span></span>`
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

