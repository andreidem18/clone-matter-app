import Auth from './Auth.js';
const BASE_URL = 'https://matter-app.herokuapp.com/api/v1';
export default class Request {
    static login(user) {
        return fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
    }
    static register(user) {
        return fetch(`${BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
    }
    static inviteUser(userInvited) {
        const user = Auth.user();
        return fetch(`${BASE_URL}/users/${user.id}/invite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userInvited)
        })
    }

    static updateUser(user) {
        return fetch(`${BASE_URL}/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
    }

    static receivedInvitations() {
        const user = Auth.user();
        return fetch(`${BASE_URL}/users/${user.id}/feedback-invitations`)   
    }

    static getSkills() {
        return fetch(`${BASE_URL}/skills`)
    }

    static feedbackReceived(){
        const user = Auth.user();
        return fetch(`${BASE_URL}/users/${user.id}/invitations`)
    }

    static evaluateSkill(invitationId, skillId, score) {
        return fetch(`${BASE_URL}/invitations/${invitationId}/skills/${skillId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({score})
        })
    }
    static user(id){
        return fetch(`${BASE_URL}/users/${id}`)
    }
}