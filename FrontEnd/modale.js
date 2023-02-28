import { genererProjets, projets, reponse } from "./projets.js";
// génération Galerie modale delete
function genererGalerieDelete(projets) {
    for (let i = 0; i < projets.length; i++){
        const figure = projets[i];
        const sectionGallery = document.querySelector("#galerie-photos");
        const projetsElement = document.createElement("figure");
        projetsElement.setAttribute("category-id", figure.categoryId);
        projetsElement.setAttribute("figure-id", figure.id)
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        imageElement.setAttribute("crossorigin", "anonymous");
        const iconeDelete = document.createElement("i");
        iconeDelete.setAttribute("figure-id", figure.id)
        iconeDelete.setAttribute("id", figure.id)
        iconeDelete.classList.add("fa-solid", "fa-trash-can");
        const titleElement = document.createElement("a");
        titleElement.innerText = "éditer";   
        projetsElement.appendChild(iconeDelete); 
        projetsElement.appendChild(imageElement);
        projetsElement.appendChild(titleElement);
        sectionGallery.appendChild(projetsElement);
    }
}
genererGalerieDelete(projets);

// Partie Modale
let modal = null
// Ouverture de la modale delete
const openModalDelete = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    modal.style.display = null 
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModalDelete) 
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
    modal.querySelector('.js-close-xmark').addEventListener('click', closeModalDelete)
    modal.querySelector('.js-modal-ajout').addEventListener('click', closeModalDelete)
}
// Fermeture de la modela Delete
const closeModalDelete =  function(e){
    if(modal === null) return
    e.preventDefault()
    modal.style.display = "none" 
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModalDelete) 
    modal.querySelector('.js-close-xmark').removeEventListener('click', closeModalDelete)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation) 
    modal.querySelector('.js-modal-ajout').removeEventListener('click', closeModalDelete) 
    modal = null
}
const stopPropagation = function (e) {
    e.stopPropagation()
}
document.querySelectorAll(".js-modal-delete").forEach(a => {
    a.addEventListener('click', openModalDelete)
})
    
window.addEventListener('keydown', function(e){
    if(e.key === "Escape" || e.key === "Esc"){
        closeModalDelete(e)
    }
    if(e.key === "Escape" || e.key === "Esc"){
        closeModaleProjets(e)
    }  
})
// Suppression des travaux 

const iconeDeletes = document.querySelectorAll(".fa-trash-can");
iconeDeletes.forEach(iconeDelete => iconeDelete.addEventListener('click', function(e){
    deleteWork(e) 
}))

function deleteFromDom(figureId){
    document.querySelectorAll("figure").forEach(figure => 
        {if(figure.getAttribute("figure-id") == figureId){
            figure.remove()
        }
    })   
}
function deleteWork(e) { 
    console.log(e)
    const figureId =  e.target.id;
    fetch(`http://localhost:5678/api/works/${figureId}`, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${localStorage.token}`
        }
        /* savoir si la reoonse du backend est correcte*/   
    })
    .then(res => deleteFromDom(figureId))
    .catch(error => console.log(error)) 
}
// Ouverture de la modale ajout projets

let modalAjout = null

const openModalProjets = function(e){
    e.preventDefault() 
    modalAjout = document.querySelector(e.target.getAttribute('href'))
    modalAjout.style.display = null 
    modalAjout.removeAttribute('aria-hidden')
    modalAjout.setAttribute('aria-modal', 'true') 
    modalAjout.addEventListener('click', closeModaleProjets) 
    modalAjout.querySelector('.js-close-xmark2').addEventListener('click', closeModaleProjets)
    modalAjout.querySelector('.js-modal-stop2').addEventListener('click', stopPropagation)
    modalAjout.querySelector('.retour-modal-delete').addEventListener('click', closeModaleProjets)
}
// Fermeture de la modale ajout de projets
const closeModaleProjets = function(e) {
    if(modalAjout === null) return
    e.preventDefault()
    modalAjout.style.display = "none" 
    modalAjout.setAttribute('aria-hidden', 'true')
    modalAjout.removeAttribute('aria-modal')
    modalAjout.removeEventListener('click', closeModaleProjets)
    modalAjout.querySelector('.js-close-xmark2').removeEventListener('click', closeModaleProjets)
    modalAjout.querySelector('.js-modal-stop2').removeEventListener('click', stopPropagation)
    modalAjout.querySelector('.retour-modal-delete').removeEventListener('click', closeModaleProjets)
    modalAjout.querySelector("#error-message-ajout").classList.add("invisible")
    inputTitre.value = "";
    imageAfficher.src = "";
    imageDefaut.style.display = "block";
     textTailleMax.style.display = "block";
     modalAjout = null
}
document.querySelectorAll(".js-modal-ajout").forEach(a => {
    a.addEventListener('click', openModalProjets)
    })
document.querySelectorAll('.retour-modal-delete').forEach(a => {
    a.addEventListener('click', openModalDelete)    
})

// Ajout d'un projet
const conteneurPreview = document.getElementById('conteneur-image');
const textTailleMax = document.getElementById('conteneur-input');
const inputImage = document.getElementById('input-ajout');
const imageDefaut = document.querySelector(".fa-image");
const imageAfficher = document.createElement('img');
    imageAfficher.className = "image-preview";
const inputTitre = document.getElementById("input-titre");
    inputTitre.addEventListener('click', function(e){
    const messageErreur = document.getElementById("error-message-ajout");
    messageErreur.classList.add('invisible')
})

// Affichage de l'image choisi
inputImage.addEventListener('change', () => {
    const file = inputImage.files[0];
    const affichage = new FileReader();
    affichage.onload = (e) => {
        imageAfficher.src = e.target.result;
        imageDefaut.style.display = "none";
        textTailleMax.style.display = "none";
        conteneurPreview.appendChild(imageAfficher)
    };
    affichage.readAsDataURL(file);
});

// écoute du formulaire 
document.querySelector(".form-projets").addEventListener("submit", function(event){
   event.preventDefault();
})

// ajout des id des catégories
const categorySelect = document.getElementById('input-categorie');
 function getCategories() {
    fetch(`http://localhost:5678/api/categories`).then(res => res.json()).then(data => {
        data.forEach(category => {
            let option = document.querySelector(".option-value")
            option.setAttribute("id", category.id)
            categorySelect.appendChild(option)
        })
    })
    .catch(err => console.log(err))
}

getCategories()

// écoute de l'évènement de click bouton Valider
const btnAjoutProjets = document.querySelector('#btn-valider');

btnAjoutProjets.addEventListener('click', (e) => {
    e.preventDefault()
    getInputsValue()
})
function getInputsValue() {
    let imageValue = inputImage.files[0];
    let titreValue = inputTitre.value;
    let categoryId = categorySelect.selectedOptions[0].id

    if (!imageValue || !titreValue || !categoryId) {
       document.querySelector("#error-message-ajout").classList.remove("invisible");
       imageDefaut.style.display = "block";
       textTailleMax.style.display = "block";
        imageAfficher.src = "";
        inputTitre.value = "";
    } else {
        addWork(imageValue, titreValue, categoryId)
        imageDefaut.style.display = "block";
        textTailleMax.style.display = "block";
        imageAfficher.src = "";
        inputTitre.value = "";
    }
}
function addWork(file, title, category) {
    let formData = new FormData();
    formData.append("image", file)
    formData.append("title", title)
    formData.append("category", category)
    fetch(`http://localhost:5678/api/works`, {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": `Bearer ${localStorage.token}`
        }
})
.catch(err => console.log(err))
}