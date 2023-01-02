// Gère l'ouverture ingrédient / fermeture des filtres et rajouter addeventlistener sur btn , faire pour les 3 boutons avec class unique /

const btnIng = document.querySelectorAll(".btn-ing");
const filtresIng = document.querySelectorAll(".cherche-filtre-ing");
const btnClose = document.querySelectorAll(".chevron-filtre")

btnIng.forEach((btn) => btn.addEventListener("click", ouvreFiltreIng));
/*btnClose.forEach((btn) => btn.addEventListener("click", fermetureFiltre));*/


function ouvreFiltreIng(event) {

    btnIng.forEach(btnIng => {
        btnIng.style.display = "block"});

    filtresIng.forEach(filtreIng => {
            filtreIng.style.display = "flex";
    })};

   /* let filtres = document.querySelectorAll(".cherche-filtre");
    filtres.forEach(filtre => {
        filtre.style.display = "none";
    });
    document.getElementById("btn-"+type).style.display = "none";
    document.getElementById("cherche-"+type).style.display = "flex";

function fermetureFiltre(event) {
    filtresIng.forEach(filtreIng => {
            filtreIng.style.display = "none";
    })};*/

// Gère l'ouverture appareil/ fermeture des filtres et rajouter addeventlistener sur btn , faire pour les 3 boutons avec class unique /

const btnApp = document.querySelectorAll(".btn-app");
const filtresApp = document.querySelectorAll(".cherche-filtre-app");

btnApp.forEach((btn) => btn.addEventListener("click", ouvreFiltreApp));
//btnFiltres.forEach((btn) => btn.addEventListener("click", fermetureFiltre));


function ouvreFiltreApp(event) {
   
    btnApp.forEach(btnApp => {
        btnApp.style.display = "block";
    });

    filtresApp.forEach(filtreApp => {
        filtreApp.style.display = "flex";
    })};


// Gère l'ouverture ustensil / fermeture des filtres et rajouter addeventlistener sur btn , faire pour les 3 boutons avec class unique /

const btnUst = document.querySelectorAll(".btn-ust");
const filtresUst = document.querySelectorAll(".cherche-filtre-ust");

btnUst.forEach((btn) => btn.addEventListener("click", ouvreFiltreUst));
//btnFiltres.forEach((btn) => btn.addEventListener("click", fermetureFiltre));


function ouvreFiltreUst(event) {
   
    btnUst.forEach(btnUst => {
        btnUst.style.display = "block";
    });
    filtresUst.forEach(filtreUst => {
        filtreUst.style.display = "flex";
    })};