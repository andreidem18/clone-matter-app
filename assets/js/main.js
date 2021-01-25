import Auth from './classes/Auth.js'
import Request from './classes/Request.js'
import UI from './classes/UI.js'
import Notification from './classes/Notification.js'

// Login
const loginForm = document.getElementById('login-form');
if(loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const user = { email, password };
        Auth.login(user);
    });
}

// register
const registerForm = document.getElementById('register-form');
if(registerForm) {
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const user = { email, password };
        Auth.register(user);
    });
}

// Invitation
const invitationForm = document.getElementById('invitation-form');
if(invitationForm) {
    invitationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const user = { email };
        Request.inviteUser(user)
            .then(response => {
                if(response.status === 201) {
                    new Notification('success', 'La invitación fue enviada exitósamente.')
                } else {
                    new Notification('danger', 'No se puedo enviar la invitación.')
                }
            })

    });
}


// Profile
const profileForm = document.getElementById('profile-form');
if(profileForm) {
    profileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const user = Auth.user();
        user.name = name;
        Request.updateUser(user)
            .then(response => {
                if(response.status === 200) {
                    new Notification('success', 'El usuario se actualizó exitósamente.')
                } else {
                    new Notification('danger', 'Tuvimos problemas al actualizar el usuario.')
                }
            })

    });
}

// Sign Out
const signOut = document.getElementById('signOut');
if(signOut){
    signOut.addEventListener('click', () => {
        localStorage.setItem('user', '');
        localStorage.setItem('authenticated', 'false');
    })
}




//Greeting
const user = Auth.user();
const message = document.getElementById('greeting');
if(message){
    message.textContent = `¡Hola ${user.name}!`
}

Request.feedbackReceived()
    .then(response => response.json())
    .then(data => {
        UI.printFeedback(data);
        console.log(data);
    });


    