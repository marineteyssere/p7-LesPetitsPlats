// Gère l'ouverture/ fermeture des filtres
import recipes from "./recipes.js";

function prepareFiltre(filtre) {
  const button = filtre.querySelector("button");
  button.onclick = function () {
    filtre.classList.add("filtre-open");

    const chevronFermant = filtre.querySelector(".chevron-ouvert-filtre");
    chevronFermant.onclick = function () {
      filtre.classList.remove("filtre-open");
      button.style.display = "block";
    };

    button.style.display = "none";
  };
}


const btnIng = document.querySelector(".filtre-ing");
const btnUst = document.querySelector(".filtre-ust");
const btnApp = document.querySelector(".filtre-app");

prepareFiltre(btnIng);
prepareFiltre(btnUst);
prepareFiltre(btnApp);

/* BOUTONS FILTRES RECHERCHE */


function trierListe(liste) {
  const items = liste.querySelectorAll(".nom-filtre");
  const itemsArr = Array.from(items);
  itemsArr.sort(function(a, b) {
    const aText = a.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const bText = b.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
  data = data.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  data = data.replace(/[.,!;:?]/g, "");
  data = data.toLowerCase();
  return data;
}
function listeFiltres(type) {
  let liste = [];
  /* Ajoute dans un tableau les données selon le type */
  recipes.forEach((recipe) => {
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
  /* Insert en éliminant les doublons dans le DOM */
  new Set(liste).forEach((data) => {
    const nom = effacerEspace(format(data));
    const elem = document.createElement("li");
    elem.id = `${type}-${nom}`;
    elem.dataset.type = type
    elem.classList.add("nom-filtre");
    elem.textContent = data;
    // elem.onclick = function (e) {
    //   ajouteFiltre(type, nom);
    // };
    // `<li class="nom-filtre" id="${type}-${nom}" data-type="${type}" data-nom="${nom}" onclick="ajouteFiltre('${type}', '${nom}')">${data}</li>`

    document
      .getElementById("liste-filtre-" + type)
      .insertAdjacentElement("beforeend", elem);
  });
}

listeFiltres("ingredients");
listeFiltres("appareils");
listeFiltres("ustensiles");
