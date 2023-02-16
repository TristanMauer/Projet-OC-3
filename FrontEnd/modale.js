const reponse = await fetch('http://localhost:5678/api/works/');
const projets2 =  await reponse.json();

// génération Galerie modale delete
function genererGalerie(projets2) {
    for (let i = 0; i < projets2.length; i++){
        const figure = projets2[i];
        const sectionGallery = document.querySelector("#galerie-photos");
        const projetsElement = document.createElement("figure");
        projetsElement.setAttribute("category-id", figure.categoryId);
        projetsElement.classList.add("categoryId");
        projetsElement.setAttribute("id", figure.id)
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        const iconeDelete = document.createElement("i");
        iconeDelete.setAttribute("id", figure.id)
        iconeDelete.classList.add("fa-solid", "fa-trash-can");
        imageElement.setAttribute("crossorigin", "anonymous");
        const titleElement = document.createElement("a");
        titleElement.innerText = "éditer";   

            sectionGallery.appendChild(projetsElement);
            projetsElement.appendChild(iconeDelete); 
            projetsElement.appendChild(imageElement);
            projetsElement.appendChild(titleElement);
                 
            iconeDelete.addEventListener('click', (e) => {
                e.preventDefault()
                deleteWork(e)
            })
        }
 }
    genererGalerie(projets2);

// Partie Modale
let modal = null
let modal2 = null
const elementFocussables = "i, button, textarea, input, select, img"
let focusables = []


// Ouverture de la modale delete
const openModalDelete = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    focusables = Array.from(modal.querySelectorAll(elementFocussables))
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
const focusInmodal = function(e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
   if(e.shifkey === true){
    index--
   } else {
    index++
   }
    if(index >= focusables.length){
        index = 0
    }
    if(index<0){
        index = focusables.length-1
    }
    focusables[index].focus
}
document.querySelectorAll(".js-modal-delete").forEach(a => {
    a.addEventListener('click', openModalDelete)
    })
window.addEventListener('keydown', function(e){
    if(e.key === "Escape" || e.key === "Esc"){
        openModalDelete(e)
    }
    if(e.key === "Tab" && modal != null){
        focusInmodal(e)
    }
})
// Suppression des travaux
function deleteWork(e) {
    const imgId = e.target.id;
   fetch(`http://localhost:5678/api/works/${imgId}`, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${localStorage.token}`
        }
    }).then(res => {
        if (res.ok) {
            console.log("élément supprimé avec succès")
        }
    }).catch(error => console.log(error))
}

// Ouverture de la modale ajout projets
const openModalProjets = function (e) {
    e.preventDefault()
    modal2 = document.querySelector(e.target.getAttribute('href'))
    focusables = Array.from(modal2.querySelectorAll(elementFocussables))
    modal2.style.display = null 
    modal2.removeAttribute('aria-hidden')
    modal2.setAttribute('aria-modal', 'true') 
    modal2.addEventListener('click', closeModaleProjets) 
    modal2.querySelector('.js-close-xmark2').addEventListener('click', closeModaleProjets)
    modal2.querySelector('.js-modal-stop2').addEventListener('click', stopPropagation)
    modal2.querySelector('.retour-modal-delete').addEventListener('click', closeModaleProjets)
}
const closeModaleProjets = function(e) {
    if(modal2 === null) return
    e.preventDefault()
    modal2.style.display = "none" 
    modal2.setAttribute('aria-hidden', 'true')
    modal2.removeEventListener('click', closeModaleProjets)
    modal2.querySelector('.js-close-xmark2').removeEventListener('click', closeModaleProjets)
    modal2.querySelector('.js-modal-stop2').removeEventListener('click', stopPropagation)
    modal2.querySelector('.retour-modal-delete').removeEventListener('click', closeModaleProjets)
    modal2 = null
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
const inputFile = document.getElementById('input-ajout');
const imageDefaut = document.querySelector(".fa-image");
const imageAfficher = document.createElement('img');
imageAfficher.className = "image-preview"

inputFile.addEventListener('change', () => {
    const file = inputFile.files[0];
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
   console.log(event)
})

//écoute de l'évènement click bouton Valider
document.getElementById("btn-valider").addEventListener('click', function(e){
    const titre = document.getElementById("input-title").value;
    const categorie = document.getElementById("input-categorie").value;
    
    console.log(e)
})

  