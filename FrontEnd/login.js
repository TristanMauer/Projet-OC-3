// écoute du formulaire
document.querySelector('.formulaire').addEventListener('submit', function(event) {
    event.preventDefault()
})

// écoute du clique sur les deux inputs et retire les messages d'erreur 
email.addEventListener('click', function(e){
    const errorMessage= document.querySelector('#error-message')
            errorMessage.classList.add('invisible')
    const errorMessageChamps= document.querySelector('#error-message-champs')
            errorMessageChamps.classList.add('invisible')
})
password.addEventListener('click', function(e){
    const errorMessage= document.querySelector('#error-message-champs')
            errorMessage.classList.add('invisible')
    const errorMessageChamps= document.querySelector('#error-message-champs')
            errorMessageChamps.classList.add('invisible')
})

// ecoute de l'évènement de click sur le bouton login

document.querySelector('#btn-login').addEventListener('click', function() {;
    // condition qui lance la fonction fetch si les deux valeur sont remplis
    if(email.value.trim() !== '' && password.value.trim() !== ''){
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email.value, 
            password: password.value})
    })

    .then(res => res.json())
    .then(data => {
        if(data.token) {
             localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data.userId)
            window.location.href = '/FrontEnd'; 
    
        // si les valeurs ne sont pas correcte affiche un message d'erreur 
        } else {
           const errorMessage= document.querySelector('#error-message');
            errorMessage.classList.remove('invisible');
        }
    })
    // si les deux inputs ne sont pas rempli affiche un message d'erreur
    } else {
        const ErrorMessageChamps = document.querySelector('#error-message-champs');
        ErrorMessageChamps.classList.remove('invisible');
    }
})
