// importation de fonction 
import {reponse, projets, galleryWorks} from "./projets.js";

// génération Galerie modale delete
function deleteGallery(projets) {
    for (let i = 0; i < projets.length; i++){
        
        const figure = projets[i];
        const sectionGallery = document.querySelector("#galery-modale");
        const projetsElement = document.createElement("figure");
        projetsElement.setAttribute("category-id", figure.categoryId);
        projetsElement.dataset.id = figure.id;
        projetsElement.setAttribute("figure-id", figure.id)
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        imageElement.setAttribute("crossorigin", "anonymous");
        const iconeDelete = document.createElement("i");
        iconeDelete.setAttribute("figure-id", figure.id)
        iconeDelete.dataset.id = figure.id;
        iconeDelete.classList.add("fa-solid", "fa-trash-can");
        const titleElement = document.createElement("a");
        titleElement.innerText = "éditer";   
        projetsElement.appendChild(iconeDelete); 
        projetsElement.appendChild(imageElement);
        projetsElement.appendChild(titleElement);
        sectionGallery.appendChild(projetsElement);
        iconeDelete.addEventListener('click', function(){
            deleteWork(figure.id)
        })
    }
}
deleteGallery(projets);

// Ouverture de la modale delete
let modalDelete = document.querySelector("#modal-delete")

const openModalDelete = function (e) {
    e.preventDefault()
    modalDelete.classList.remove("invisible")
    modalDelete.addEventListener('click', closeModalDelete) 
    modalDelete.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
    modalDelete.querySelector('.js-close-xmark').addEventListener('click', closeModalDelete)
    modalDelete.querySelector('.js-modal-ajout').addEventListener('click', closeModalDelete)
}
// Fermeture de la modela Delete
const closeModalDelete =  function(e){
    modalDelete.classList.add("invisible")
    modalDelete.removeEventListener('click', closeModalDelete) 
    modalDelete.querySelector('.js-close-xmark').removeEventListener('click', closeModalDelete)
    modalDelete.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation) 
    modalDelete.querySelector('.js-modal-ajout').removeEventListener('click', closeModalDelete) 
}
// Déclaration de la constante permettant de stopper la propagation de certain éléments
const stopPropagation = function (e) {
    e.stopPropagation()
}

// Selection de la classe "js-modal-delete" + écoute de l'évènement click pemettant d'ouvrir la modale

document.querySelector(".js-modal-delete").addEventListener('click', openModalDelete)

// Ajout de l'évènement permettant de fermer les modales en appuyant sur la touche escape 

window.addEventListener('keydown', function(e){
    if(e.key === "Escape" || e.key === "Esc"){
        closeModalDelete(e)
    }
    if(e.key === "Escape" || e.key === "Esc"){
        closeModaleProjets(e)
    }  
})


// Function qui supprime les projets direcement dans le DOM 
function deleteWorkFromDom(projetsId){
    document.querySelectorAll("figure[figure-id").forEach(figure => 
        {if(figure.getAttribute("figure-id") == projetsId){
            figure.remove()
        }
    })   
}

// function DeleteWork qui permet de supprimer un projets lors du clique sur l'icone trash

function deleteWork(projetsId) {  
    fetch(`http://localhost:5678/api/works/` + projetsId, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${localStorage.token}`
        }  
    })
    .then(reponse => deleteWorkFromDom(projetsId))
    .catch(error => console.log(error)) 
}
// fonction deleteAllWork qui par une boucle for appelle la fonction deleteWork pour chaque projets existant

function deleteAllWork(){ 
    const projets = document.querySelectorAll("figure[figure-id]")
    for (let h = 0; h < projets.length; h++){
        const figure = projets[h]
        const projetsId = figure.dataset.id;
        deleteWork(projetsId);
    
    }  
}

// Selectionne le lien et appelle la function deleteAllWork lors d'un click sur le lien

const BtnDeleteAll = document.querySelector("#suprimer-tout");
BtnDeleteAll.addEventListener('click', function(e){
    e.preventDefault();
    deleteAllWork();
})

// Ouverture de la modale ajout projets

 
const modalAdd = document.querySelector("#modal-ajout")
const openModalProjets = function(e){
    e.preventDefault() 
    modalAdd.classList.remove("invisible")
    modalAdd.addEventListener('click', closeModaleProjets) 
    modalAdd.querySelector('.js-close-xmark2').addEventListener('click', closeModaleProjets)
    modalAdd.querySelector('.js-modal-stop2').addEventListener('click', stopPropagation)
    modalAdd.querySelector('.retour-modal-delete').addEventListener('click', closeModaleProjets)
}
// Fermeture de la modale ajout de projets
const closeModaleProjets = function(e) {
    e.preventDefault()
    modalAdd.classList.add("invisible")
    modalAdd.removeEventListener('click', closeModaleProjets)
    modalAdd.querySelector('.js-close-xmark2').removeEventListener('click', closeModaleProjets)
    modalAdd.querySelector('.js-modal-stop2').removeEventListener('click', stopPropagation)
    modalAdd.querySelector('.retour-modal-delete').removeEventListener('click', closeModaleProjets)
    modalAdd.querySelector("#error-message-ajout").classList.add("invisible")
    inputTitle.value = "";
    imagePreview.src = "";
    imageDefault.style.display = "block";
    conteneurPreview.style.display = "none"
}

document.querySelectorAll(".js-modal-ajout").forEach(a => {
    a.addEventListener('click', openModalProjets)
    })
document.querySelectorAll('.retour-modal-delete').forEach(a => {
    a.addEventListener('click', openModalDelete)    
})

// selection des différents éléments utile dans la modale Ajout de projet
const conteneurPreview = document.getElementById('image-afficher');
const inputImage = document.querySelector("#input-ajout");
    inputImage.value = "" ;
const imageDefault = document.querySelector("#conteneur-defaut");
const imagePreview = document.createElement('img');
imagePreview.className = "image-preview";
const inputTitle = document.getElementById("input-titre");
    inputTitle.addEventListener('click', function(e){
    const errorMessage = document.getElementById("error-message-ajout");
    errorMessage.classList.add('invisible')
    const errorMessageSize = document.getElementById("error-message-taille");
    errorMessageSize.classList.add('invisible')
    })

// Affichage de l'image choisi

inputImage.addEventListener("change", function(){
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        imagePreview.src = reader.result;
        imageDefault.style.display = "none";
        conteneurPreview.style.display = "flex"
        conteneurPreview.appendChild(imagePreview)
    })
    reader.readAsDataURL(this.files[0])
})

// écoute du formulaire 

document.querySelector(".form-projets").addEventListener("submit", function(event){
   event.preventDefault();
})


// ajout des id des catégories
const categorySelect = document.getElementById('input-categorie');
 function getCategory() {
    fetch(`http://localhost:5678/api/categories`).then(res => res.json()).then(data => {
        data.forEach(category => {
            let option = document.querySelector(".option-value")
            option.setAttribute("id", category.id)
            categorySelect.appendChild(option)
        })
    })
    .catch(err => console.log(err))
}
getCategory()

// écoute de l'évènement de click bouton Valider
const btnAddWork = document.querySelector('#btn-valider');

// écoute du clique du bouton et condition à l'envoie du formulaire
btnAddWork.addEventListener('click', async (e) => {
    // condition taille image
    if(inputImage.files.length > 4194304){
        document.querySelector("#error-message-taille").classList.remove("invisible");
        imageDefault.style.display = "block";
        conteneurPreview.style.display = "none"
        imagePreview.src = "";
        inputTitle.value = "";
    } 
    // condition sur l'ajout du projets
    if( inputImage.files.length > 0 && inputTitle.value.length > 0  && categorySelect.value.length > 0 ){
        addWork()
        imageDefault.style.display = "block";
        conteneurPreview.style.display = "none"
        imagePreview.src = "";
        inputImage.value="";
        inputTitle.value = "";
    }
    // gestion du cas où le formulaire n'est pas rempli correctement 
    else {
        document.querySelector("#error-message-ajout").classList.remove("invisible");
        imageDefault.style.display = "block";
        conteneurPreview.style.display = "none"
        inputImage.value="";
        imagePreview.src = "";
        inputTitle.value = "";
    }
    e.preventDefault()
});

// Fonction addWork permettant l'envoie du projets dans l'api 

async function addWork(figureId) {
    let formData = new  FormData();
    formData.append("image", inputImage.files[0])
    formData.append("title", inputTitle.value)
    formData.append("category", categorySelect.selectedOptions[0].id)
    formData.append("id", figureId)
    const response = await fetch(`http://localhost:5678/api/works`, {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": `Bearer ${localStorage.token}`
        }   
    })
    .then((res) => res.json())
    .then((data) => {  
        addWorkGallery(data.title, data.imageUrl, data.id, data.categoryId);
        addWorkModale( data.imageUrl, data.id, data.categoryId);
    })
}
// function qui créer le projets  ajouter
function addWorkGallery (title, img, id, categoryId){

    const sectionGallery = document.querySelector(".gallery");
        const projetsElement = document.createElement("figure");
        projetsElement.classList.add("categoryId")
        projetsElement.setAttribute("category-id", categoryId);
        projetsElement.setAttribute("figure-id", id);
        projetsElement.setAttribute("id",id);
        const imageElement = document.createElement("img");
        imageElement.src = img;
        imageElement.setAttribute("crossorigin", "anonymous");
        const titleElement = document.createElement("figcaption");
        titleElement.innerText = title;        
            
        sectionGallery.appendChild(projetsElement);
        projetsElement.appendChild(imageElement);
        projetsElement.appendChild(titleElement);
}

function addWorkModale ( img, id, categoryId){

    const sectionGallery = document.querySelector("#galery-modale");
    const projetsElement = document.createElement("figure");
    projetsElement.setAttribute("category-id",categoryId);
    projetsElement.dataset.id = id;
    projetsElement.setAttribute("figure-id", id)
    const imageElement = document.createElement("img");
    imageElement.src = img;
    imageElement.setAttribute("crossorigin", "anonymous");
    const iconeDelete = document.createElement("i");
    iconeDelete.setAttribute("figure-id", id)
    iconeDelete.dataset.id = id;
    iconeDelete.classList.add("fa-solid", "fa-trash-can");
    const titleElement = document.createElement("a");
    titleElement.innerText = "éditer"; 
    iconeDelete.addEventListener('click', function(){
        deleteWork(id)
    })
    projetsElement.appendChild(iconeDelete); 
    projetsElement.appendChild(imageElement);
    projetsElement.appendChild(titleElement);
    sectionGallery.appendChild(projetsElement);
}