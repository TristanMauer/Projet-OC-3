const reponse = await fetch('http://localhost:5678/api/works/');
const projets =  await reponse.json();
  
function genererProjets(projets) {
    for (let i = 0; i < projets.length; i++){
        const figure = projets[i];
        const sectionGallery = document.querySelector(".gallery");
        const projetsElement = document.createElement("figure");
        projetsElement.setAttribute("category-id", figure.categoryId);
        projetsElement.classList.add("categoryId");
        projetsElement.setAttribute("id", figure.id)
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        imageElement.setAttribute("crossorigin", "anonymous");
        const titleElement = document.createElement("figcaption");
        titleElement.innerText = figure.title;        
            
            sectionGallery.appendChild(projetsElement);
            projetsElement.appendChild(imageElement);
            projetsElement.appendChild(titleElement);
           
        }
 }
    genererProjets(projets);


    // gestion des boutons 
    const boutonTous = document.querySelector(".btn-tous");
    boutonTous.addEventListener("click", function(){
       document.querySelectorAll(".categoryId").forEach(
        figure => figure.classList.remove("invisible"));
        
    });
// bouton affichage Objets
const boutonObjets = document.querySelector(".btn-objets");
boutonObjets.addEventListener("click", function() {
    document.querySelectorAll(".categoryId").forEach(figure => {
    if (figure.getAttribute("category-id") != "1"){
    figure.classList.add("invisible");
}
else{
    figure.classList.remove("invisible");
        }
    
    } );
});
// bouton affichage Appartements
const boutonAppartements = document.querySelector(".btn-appartements");
boutonAppartements.addEventListener("click", function() {
    document.querySelectorAll(".categoryId").forEach(figure => {
        if(figure.getAttribute("category-id") != "2"){
        figure.classList.add("invisible");
        }
        else{
            figure.classList.remove("invisible");
        }
    } );
});
// bouton affichage Hôtels et restaurants 
const boutonHotels = document.querySelector(".btn-hotels");
boutonHotels.addEventListener("click", function(){
    document.querySelectorAll(".categoryId").forEach(figure => {
        if(figure.getAttribute("category-id") != "3"){
        figure.classList.add("invisible");}
        else{
            figure.classList.remove("invisible");
        }
        
    } );
});

// Partie connecter 
if(localStorage.token!= undefined){
    document.querySelector(".mode-edition").classList.remove("invisible");
    document.querySelector(".logout").classList.remove("invisible");
    document.querySelector(".modale-introduction").classList.remove("invisible");
    document.querySelector(".modale-image-profil").classList.remove("invisible");
    document.querySelector(".modale-projets").classList.remove("invisible");
    document.querySelector(".lien-login").classList.add("invisible");
    document.querySelector(".btn-tous").classList.add("invisible");
    document.querySelector(".btn-objets").classList.add("invisible");
    document.querySelector(".btn-appartements").classList.add("invisible");
    document.querySelector(".btn-hotels").classList.add("invisible");
}
const boutonLogout = document.querySelector(".logout");
boutonLogout.addEventListener("click", function() {
    localStorage.clear();
})






