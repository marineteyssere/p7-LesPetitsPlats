// Gère l'ouverture / fermeture des filtres et rajouter addeventlistener sur btn , faire pour les 3 boutons avec class unique /

const btnFiltres = document.querySelectorAll(".btn-filtre");

btnFiltres.forEach((btn) => btn.addEventListener("click", ouvreFiltre));
//btnFiltres.forEach((btn) => btn.addEventListener("click", fermetureFiltre));


function ouvreFiltre(event) {
    console.log(event.target)
    btnFiltres.forEach(btnFiltres => {
        btnFiltres.style.display = "block";
    });

    let filtres = document.querySelectorAll(".cherche-filtre");
    filtres.forEach(filtre => {
        filtre.style.display = "none";
    });
    document.getElementById("btn-"+type).style.display = "none";
    document.getElementById("cherche-"+type).style.display = "flex";
}
function fermetureFiltre(type) {
    document.getElementById(type).style.width = "fit-content";
    document.getElementById("btn-"+type).style.display = "block";
    document.getElementById("cherche-"+type).style.display = "none";
}