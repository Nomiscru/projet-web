

function init() {

    //---RECUPERATION ET RENVOIE DU TEMPLATE 'HEADER'---
    fetch("index.html")
        .then(response => response.text())
        .then(html => {
            const documentHTML = new DOMParser().parseFromString(html, "text/html");

            const template = documentHTML.getElementById("headerTemplate");

            const clone = template.content.cloneNode(true);

            document.getElementById("header").appendChild(clone);
        });


    //renvoie des choix menu préférences
    const clairForm = document.getElementById("clairForm")//récup du sélecteur ayant l'id 'clair'
    const sombreForm = document.getElementById("sombreForm")

    const listeForm = document.getElementById("listeForm")
    const cartesForm = document.getElementById("cartesForm")

    const liste = document.getElementById("liste")
    const cartes = document.getElementById("cartes")

    let themeStatus = localStorage.getItem("theme")
    let affStatus = localStorage.getItem("affichage")
    let affStatusForm = localStorage.getItem("affichageForm")

    if (clairForm) {
        if (themeStatus == "clairForm") { //condition qui active/désactive un thème et désactive/active l'autre en fonction de l'état du choix
            clairForm.selected = true
            sombreForm.selected = false
        } else if (themeStatus == "sombreForm") {
            clairForm.selected = false
            sombreForm.selected = true
        }
    }
    if (listeForm) {
        if (affStatusForm == "listeForm") {
            listeForm.checked = true
            cartesForm.checked = false
        } else {
            listeForm.checked = false
            cartesForm.checked = true
        }
    }
    if (liste) {
        if (affStatus == "liste") {
            liste.checked = true
            cartes.checked = false
        } else {
            liste.checked = false
            cartes.checked = true
        }
    }

    const affichageHome = document.getElementById("affichageHome")
    if (affichageHome) {
        display()
    }

    themeSite()



}


//---GESTION DES PREFERENCES---    
//sauvegarde des préférences
const btnSave = document.getElementById("btnSave")
if (btnSave) {//verif si btnSave existe
    var save = document.getElementById("btnSave")//recup du btnSave
    save.addEventListener("click", () => {    //ecoute du bouton action lors d'un click
        var theme = document.getElementById("theme");
        localStorage.setItem("theme", theme.value)//save le theme
        themeSite() //charge theme choisi
        var affichageForm = document.querySelector('input[name="affichageForm"]:checked')//selection de la radio coché
        localStorage.setItem("affichageForm", affichageForm.value)//save l'affichege
    })
}

//chargement du theme
function themeSite() {
    const themeChoix = localStorage.getItem("theme");
    if (themeChoix === "sombreForm") {
        document.body.classList.add("sombre");
    } else {
        document.body.classList.remove("sombre");
    }
}

//sauvegarde du changement accueil
let affHome = document.querySelectorAll('input[name="affichage"]')
affHome.forEach(radio => {
    radio.addEventListener("change", () => {
        var affichage = document.querySelector('input[name="affichage"]:checked')  //selection de la radio coché
        display()//charge l'aaffichage choisi 
        localStorage.setItem("affichage", affichage.value)//save l'affichege
    })
})

//display
function display() {
    const affTab = document.getElementById("affTab")
    const affCadre = document.getElementById("affCadre")
    if (liste.checked == true) {
        affTab.style.display = "block" //affiche le block
        affCadre.style.display = "none" //retire le block
    }
    if (cartes.checked == true) {
        affCadre.style.display = "block"
        affTab.style.display = "none"
    }
}


//---EXPLOITATION DE PROMO.JSON---
//Création tableau
let tabNom = []
let tabPrenom = []
let tabVille = []

//Envoie des données
function envoieNom(tabNom) {//décaration de la fonction
    let nameEtu = document.querySelectorAll(".nom")//recup de tout les sélécteur ayant la classe 'nom'
    let i = 0
    for (element of tabNom) {   //pour chaque élément du tableau 'tabNom'
        nameEtu[1 + i].innerText = tabNom[i]//injection du texte présent dans l'indice du tableau vers le sélecteur précisé
        i++
    }
}
function envoiePrenom(tabPrenom) {
    let fristNameEtu = document.querySelectorAll(".prenom")
    let i = 0
    for (element of tabPrenom) {
        fristNameEtu[1 + i].innerText = tabPrenom[i]
        i++
    }
}
function envoieVille(tabVille) {
    let cityEtu = document.querySelectorAll(".ville")
    let i = 0
    for (element of tabVille) {
        cityEtu[1 + i].innerText = tabVille[i]
        i++
    }
}

//Remplissage tableau
const modaleLink = document.getElementById("detailMod");
const affTab = document.getElementById("affTab")
if (affTab || modaleLink) {
    fetch("promo.json")
        .then(response => response.json())//Analyse du JSON en entrée pour produire un objet JavaScript.
        .then(data => {
            tabNom = data.apprenants.map(promo => promo.nom)//Une Promise qui se résout en un objet JavaScript. Cet objet peut être tout ce qui peut être représenté par du JSON — un objet, un tableau, une chaîne de caractères, un nombre…
            tabPrenom = data.apprenants.map(promo => promo.prenom)
            tabVille = data.apprenants.map(promo => promo.ville)
            envoieNom(tabNom)//appel de la fontion 
            envoiePrenom(tabPrenom)
            envoieVille(tabVille)
            envoieModuleListe(tabNom, tabPrenom, tabVille)
            envoieModuleCarte(tabNom, tabPrenom, tabVille)
        })

}

//Envoie des donnnées cartes
function envoieNomPrenomCadre(cadNom, cadPrenom) {//décaration de la fonction
    let allNameEtu = document.querySelectorAll(".nomPrenom")//recup de tout les sélécteur ayant la classe 'nom
    let i = 0
    for (element of cadNom) {   //pour chaque élément du tableau 'tabNom'
        allNameEtu[i].innerText = cadNom[i] + " " + cadPrenom[i]//injection du texte présent dans l'indice du tableau vers le sélecteur précisé
        i++
    }
}

function envoieVilleCadre(tabVille) {
    let cityEtu = document.querySelectorAll(".villeCadre")
    let i = 0
    for (element of tabVille) {
        cityEtu[i].innerText = tabVille[i]
        i++
    }
}

//Remplissage des cartes
const affCadre = document.getElementById("affCadre")
if (affCadre) {
    fetch("promo.json")
        .then(response => response.json())//Analyse du JSON en entrée pour produire un objet JavaScript.
        .then(data => {
            cadNom = data.apprenants.map(promo => promo.nom)//Une Promise qui se résout en un objet JavaScript. Cet objet peut être tout ce qui peut être représenté par du JSON — un objet, un tableau, une chaîne de caractères, un nombre…
            cadPrenom = data.apprenants.map(promo => promo.prenom)
            tabVille = data.apprenants.map(promo => promo.ville)
            envoieNomPrenomCadre(cadNom, cadPrenom)//appel de la fontion 
            envoieVilleCadre(tabVille)
        })
}


//---MAP---
//Récup des coordonnées
async function load() {
    const response = await fetch("promo.json")
    const data = await response.json()//Analyse du JSON en entrée pour produire un objet JavaScript.

    const lat = data.apprenants.map(promo => promo.coordonnees.latitude)//Une Promise qui se résout en un objet JavaScript. Cet objet peut être tout ce qui peut être représenté par du JSON — un objet, un tableau, une chaîne de caractères, un nombre…
    const long = data.apprenants.map(promo => promo.coordonnees.longitude)
    let coordon = []
    let i = 0
    for (element of lat) {   //pour chaque élément du tableau 'tabNom'
        coordon[i] = lat[i] + "," + long[i]//injection du texte présent dans l'indice du tableau vers le sélecteur précisé
        i++
    }

    const carteNom = data.apprenants.map(promo => promo.nom)//Une Promise qui se résout en un objet JavaScript. Cet objet peut être tout ce qui peut être représenté par du JSON — un objet, un tableau, une chaîne de caractères, un nombre…
    const cartePrenom = data.apprenants.map(promo => promo.prenom)
    let nomPrenom = []
    let y = 0
    for (element of carteNom) {   //pour chaque élément du tableau 'tabNom'
        nomPrenom[y] = carteNom[y] + ", " + cartePrenom[y]//injection du texte présent dans l'indice du tableau vers le sélecteur précisé
        y++
    }

    return [coordon, nomPrenom]
}


//Affiichage de la carte
const mapAff = document.getElementById("map")
if (mapAff) {
    load().then(resultat => {
        let loadCoord = (resultat[0])
        let loadName = (resultat[1])
        var map = L.map('map').setView([48.8566, 2.3522], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker(loadCoord[0].split(",").map(Number)).addTo(map)
            .bindPopup(loadName[0])
            .openPopup()

        L.marker(loadCoord[1].split(",").map(Number)).addTo(map)
            .bindPopup(loadName[1])
            .openPopup()

        L.marker(loadCoord[2].split(",").map(Number)).addTo(map)
            .bindPopup(loadName[2])
            .openPopup()

        L.marker(loadCoord[3].split(",").map(Number)).addTo(map)
            .bindPopup(loadName[3])
            .openPopup()

        L.marker(loadCoord[4].split(",").map(Number)).addTo(map)
            .bindPopup(loadName[4])
            .openPopup()

        L.marker(loadCoord[5].split(",").map(Number)).addTo(map)
            .bindPopup(loadName[5])
            .openPopup()
    })
}


//---MODALE---
//Remplissage de la modale
function choixDetailListe(event, tabNom, tabPrenom, tabVille) { //choix de l'étudaint apres l'action
    switch (event.target.id) {
        case "0": remplissage(tabNom, tabPrenom, tabVille, 0); break;
        case "1": remplissage(tabNom, tabPrenom, tabVille, 1); break;
        case "2": remplissage(tabNom, tabPrenom, tabVille, 2); break;
        case "3": remplissage(tabNom, tabPrenom, tabVille, 3); break;
        case "4": remplissage(tabNom, tabPrenom, tabVille, 4); break;
        case "5": remplissage(tabNom, tabPrenom, tabVille, 5)
    }
}

function choixDetailCadre(event, tabNom, tabPrenom, tabVille) {
    switch (event.target.id) {
        case "0": remplissage(tabNom, tabPrenom, tabVille, 0); break;
        case "1": remplissage(tabNom, tabPrenom, tabVille, 1); break;
        case "2": remplissage(tabNom, tabPrenom, tabVille, 2); break;
        case "3": remplissage(tabNom, tabPrenom, tabVille, 3); break;
        case "4": remplissage(tabNom, tabPrenom, tabVille, 4); break;
        case "5": remplissage(tabNom, tabPrenom, tabVille, 5)
    }
}

function remplissage(cadNom, cadPrenom, cadVille, x) {//récupère et remplit les champs en fonction de l'id
    var nom = document.querySelector(".nom")
    nom.innerText = cadNom[x]
    var prenom = document.querySelector(".prenom")
    prenom.innerText = cadPrenom[x]
    var ville = document.querySelector(".ville")
    ville.innerText = cadVille[x]
}


//Ouverture de la modale link
function envoieModuleListe(tabNom, tabPrenom, tabVille) {
    if (modaleLink) {
        document.querySelectorAll(".openMod").forEach(lien => {
            lien.addEventListener("click", (event) => {
                event.preventDefault();
                choixDetailListe(event, tabNom, tabPrenom, tabVille)
                modaleLink.showModal();
            });
        })
    }

    modaleLink.addEventListener("click", (event) => {
        if (event.target === modaleLink) {
            modaleLink.close();
        }
    });
}

//Ouverture de la modale link
const modaleBtn = document.getElementById("detailMod");
function envoieModuleCarte(tabNom, tabPrenom, tabVille) {
    if (modaleBtn) {
        document.querySelectorAll(".btnDetail").forEach(lien => {
            lien.addEventListener("click", (event) => {
                event.preventDefault();
                choixDetailCadre(event, tabNom, tabPrenom, tabVille)
                modaleBtn.showModal();
            });
        })
    }

    modaleBtn.addEventListener("click", (event) => {
        if (event.target === modaleBtn) {
            modaleBtn.close();
        }
    });

}


window.onload = init




