// Gère l'ouverture/ fermeture des filtres 

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



  