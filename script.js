
window.onload = init
function init () {
    
//récupération puis renvoie du template "header"
fetch("index.html")
    .then(response => response.text())
    .then(html => {
        const documentHTML = new DOMParser()
            .parseFromString(html, "text/html");

        const template = documentHTML
            .getElementById("headerTemplate");

        const clone = template.content.cloneNode(true);

        document.getElementById("header")
            .appendChild(clone);
    });

//sauvegarde des préférences
let save = document.getElementById("btnSave")
save.addEventListener("click", () => {    
    localStorage.setItem("theme", theme.value)//save le theme
    
    let affichage = document.querySelector('input[name="affichage"]:checked');//selection de la radio coché
    localStorage.setItem("affichage", affichage.value);//save l'affichege
})

//renvoie des préférences
const clair = document.getElementById("clair")
const sombre = document.getElementById("sombre")

const liste = document.getElementById("liste")
const cartes = document.getElementById("cartes")

let themeStatus = localStorage.getItem("theme")
let affStatus = localStorage.getItem("affichage")

if (themeStatus == "clair") { 
    clair.selected = true
    sombre.selected = false
}else{
    clair.selected = false
    sombre.selected = true
}

if (affStatus == "liste") { 
    liste.checked = true
    cartes.checked = false
}else{
    liste.checked = false
    cartes.checked = true
}

}