document.querySelector('.formulaire').addEventListener('submit', function(event) {
    event.preventDefault()
})
email.addEventListener('click', function(e){
    const errorMessage= document.querySelector('#error-message')
            errorMessage.classList.add('invisible')
})
password.addEventListener('click', function(e){
    const errorMessage= document.querySelector('#error-message')
            errorMessage.classList.add('invisible')
})
// ecoute de l'évènement de click
document.querySelector('#btn-login').addEventListener('click', function() {;
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
                      
        } else {
           const errorMessage= document.querySelector('#error-message')
            errorMessage.classList.remove('invisible')
        }
    })
    .catch(error => console.error(error));
})
