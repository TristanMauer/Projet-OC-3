document.querySelector('.formulaire').addEventListener('submit', function(event) {
    event.preventDefault()
})
// ecoute de l'évènement de click
document.querySelector('#btn-login').addEventListener('click', function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email, 
            password: password})
    })
    .then(res => res.json())
    .then(data => {
        if(data.message) {
            const errorMessage= document.querySelector('#error-message')
            errorMessage.classList.remove('invisible')
        } else {
            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data.userId)
            window.location.href = '/FrontEnd';
        }
    })
    .catch(error => console.error(error));
})
