export default class Notification {
    constructor(type = 'info', message = '', delay =  3000) {
        this.type = type;
        this.message = message;
        this.delay = delay;
        this.show();
    }
    show() {
        this.appendNotification();
        // used to hanlde first time notification transition
        setTimeout(() => {
            const notification = document.querySelector('.notification');
            notification.classList.add('visible', this.type);
        }, 0);
        this.hide();
    }
    hide() {
        const notification = document.querySelector('.notification');
        setTimeout(() => {
            notification.classList.remove('visible');
            notification.classList.remove(this.type);
        }, this.delay)
    }
    appendNotification() {
        let notification = document.querySelector('.notification');
        if(!notification) {
            notification = document.createElement("div");
            document.querySelector('body').appendChild(notification);
        }
        notification.classList.add('notification', this.type);
        notification.innerHTML = this.message;
    }
}