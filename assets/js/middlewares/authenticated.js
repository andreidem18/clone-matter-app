const authenticated = localStorage.getItem('authenticated');
if(!authenticated) {
    window.location.href = '/auth/login.html';
}