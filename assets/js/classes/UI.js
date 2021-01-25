import Request from './Request.js';


export default class {
    static printReceivedInvitations(containerId, invitations, skills) {
        const container = document.getElementById(containerId);
        if(invitations.length == 0){
            container.innerHTML += `<div class="d-flex justify-content-center flex-column align-items-center empty">
                                        <i class="fas fa-blind"></i>
                                        <p>Parece que no tienes invitaciones para dar feedback</p>
                                        <p>Dile a tus amigos que estas usando <a href="/">Matter App</a></p>
                                    </div>`
        }
        invitations.forEach(invitation => {
            Request.user(invitation.user_id)
                .then(response => response.json())
                .then(data => {
                    container.innerHTML += `<div class="card card-matter mt-3">
                                        <div class="card-body d-flex justify-content-center">
                                            <form id="form-feedback${invitation.id}" onsubmit="event.preventDefault(), sendFeedback(${invitation.id})">
                                                <p>Dar feedback a ${data.name}</p>
                                                ${this.htmlAnswers(skills)}
                                                <button class="btn btn-primary">Send Feedback</button>
                                            </form>
                                        </div>
                                    </div>`;
                    this.doSlider();
                });
        });
    } 

    static htmlAnswers(skills) {
        let html = ``
        skills.forEach((skill, index) => {
            html += `<h6>${skill.name}</h6>
                        <div>
                            <div class="range card mb-3">
                                <div class="slider-value">
                                    <span>3</span>
                                </div>
                                <div class="field">
                                    <div class="value left">0</div>
                                    <input type="range" min="0" max="3" value="0" data-skill="${skill.id}">
                                    <div class="value right">3</div>
                                </div>
                            </div>
                        </div>`;
        })
        return html;
    }

    static doSlider(){
        const slideValue = document.getElementsByTagName("span");
            const inputsSlider = document.getElementsByTagName("input");
            for(let i = 0; i < inputsSlider.length; i++) {
                inputsSlider[i].oninput = (() => {
                    let value = inputsSlider[i].value;
                    slideValue[i].textContent = value;
                    slideValue[i].style.left = ((value)*100/3) + "%";
                    slideValue[i].classList.add("show");
                });
                inputsSlider[i].onblur = (() => {
                    slideValue[i].classList.remove("show");
                });
            };
    }

    static printFeedback(user){
        const container = document.getElementById('feedback-container');
        user.forEach(user => {
            if(user.evaluated_skills == 0){

            } else {
                container.innerHTML += `<div class="card card-matter mt-4"> 
                                        <div class="card-body">
                                            <b>Tus skills evaluadas por ${user.user_invited.name}</b>
                                            ${this.printScore(user.skills)}
                                        </div>
                                    </div>`
            }
        });
        if(container.children.length < 1){
            container.innerHTML += `<div class="d-flex justify-content-center flex-column align-items-center empty">
                                        <i class="fas fa-blind"></i>
                                        <p>Parece que nadie te ha dado feedback</p>
                                        <p>Dile a tus amigos que estas usando <a href="/">Matter App</a></p>
                                    </div>`
        }
    }
    static printScore(skills){
        let html = ''
        skills.forEach(skill => {
            let score = skill.pivot.score;
            html += `   <div class="skills">
                            <span class="name">${skill.name}</span>
                            <div class="percent">
                                <div class="progress" style="width: ${score*100/3}%;"></div>
                            </div>
                            <span class="value">${score}</span>
                        </div>`
        });
        return html
    }
}