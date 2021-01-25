import Request from './Request.js';
import Notification from './Notification.js';

export default class Auth {
    static succesRedirect = '/'
    static login(user) {
        this.disableLoginButton();
        Request.login(user)
            .then(response => {
                this.enableLoginButton();
                this.handleLoginResponse(response.status)
                return response.json();
            })
            .then(result => localStorage.setItem('user', JSON.stringify(result)));
    }
    static handleLoginResponse(statusCode) {
        if(statusCode === 200) {
            localStorage.setItem('authenticated', 'true');
            window.location.href = this.succesRedirect;
        } else if (statusCode === 401) {
            new Notification('danger', 'Tus credenciales son incorrectas');
        } else {
            new Notification('danger', 'Tuvimos un error');
        }
    }
    static async register(user) {
        const response = await Request.register(user);
        if(response.status === 201) {
            localStorage.setItem('authenticated', 'true');
            let tologin = { email: user.email, password: user.password };
            this.login(tologin);
            window.location.href = this.succesRedirect;
        }
        else if(response.status === 422) {
            new Notification('danger', 'El correo ya está registrado.');
        }
    }
    static disableLoginButton() {
        const loginButton = this.getLoginbutton();
        loginButton.disabled = true;
    }
    static enableLoginButton() {
        const loginButton = this.getLoginbutton();
        loginButton.disabled = false;
    }
    static getLoginbutton() {
        return document.getElementById('login-button');
    }
    static user() {
        return JSON.parse(localStorage.getItem('user'));
    }
}