// Gère l'ouverture/ fermeture des filtres 
import recipes from "./recipes.js";

const btnIng = document.querySelectorAll(".btn-ing");
const btnUst = document.querySelectorAll(".btn-ust");
const btnApp = document.querySelectorAll(".btn-app");


const filtresIng = document.querySelectorAll(".cherche-filtre-ing");
const filtresUst = document.querySelectorAll(".cherche-filtre-ust");
const filtresApp = document.querySelectorAll(".cherche-filtre-app");


btnIng.forEach((btn) => btn.addEventListener("click", ouvreFiltreIng));
btnUst.forEach((btn) => btn.addEventListener("click", ouvreFiltreUst));
btnApp.forEach((btn) => btn.addEventListener("click", ouvreFiltreApp));


filtresIng.forEach((btn) => btn.addEventListener("click", fermetureFiltreIng));
filtresUst.forEach((btn) => btn.addEventListener("click", fermetureFiltreUst));
filtresApp.forEach((btn) => btn.addEventListener("click", fermetureFiltreApp));


function ouvreFiltreIng(event) {

    btnIng.forEach(btnIng => {
        btnIng.style.display = "block"});

    filtresIng.forEach(filtreIng => {
            filtreIng.style.display = "flex";})
        };


function fermetureFiltreIng(event) {
            
        filtresIng.forEach(filtreIng => {
            filtreIng.style.display = "none";})
};
        

function ouvreFiltreApp(event) {
   
     btnApp.forEach(btnApp => {
            btnApp.style.display = "block";
        });
    
        filtresApp.forEach(filtreApp => {
            filtreApp.style.display = "flex";
        })};

function fermetureFiltreApp(event) {
            
            filtresApp.forEach(filtreApp => {
                filtreApp.style.display = "none";})
    };


function ouvreFiltreUst(event) {
   
        btnUst.forEach(btnUst => {
                btnUst.style.display = "block";
            });
        filtresUst.forEach(filtreUst => {
                filtreUst.style.display = "flex";
            })};

function fermetureFiltreUst(event) {
            
                filtresUst.forEach(filtreUst => {
                    filtreUst.style.display = "none";})
        };
        
function effacerEspace(data) {
            data = data.split(" ").join("-");
            data = data.replace("'","-");
            return data;
}

function format(data) {
            data = data.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            data = data.replace(/[.,!;:?]/g,"");
            data = data.toLowerCase();
            return data;
}
function listeFiltres(type) {
            let liste = [];
            /* Ajoute dans un tableau les données selon le type */
            recipes.forEach(recipe => {
                switch(type) {
                    case "ingredients":
                        `${recipe.ingredients.map(data => 
                            liste.push(format(
                                `${data.ingredient}`
                            ))
                        ).join("")}`;
                        console.log("list", liste)
                        break;
                    case "appliance":
                        liste.push(format(
                            `${recipe.appliance}`
                        ));
                        break;
                    case "ustensils":
                        `${recipe.ustensils.map(data => 
                            liste.push(format(
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
                const nom = effacerEspace(format(data));
                document.getElementById("liste-filtre-"+type).insertAdjacentHTML("beforeend", `<li class="nom-filtre" id="${type}-${nom}" data-type="${type}" data-nom="${data}" onclick="ajouteFiltre('${type}', '${nom}')">${data}</li>`);
            });
}
  
listeFiltres("ingredients");
